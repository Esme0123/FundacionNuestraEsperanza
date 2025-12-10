<?php

namespace App\Http\Controllers;

use App\Models\Qr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class BnbWebhookController extends Controller
{
    public function handle(Request $request)
    {
        // Log the incoming webhook for debugging
        Log::info('BNB Webhook Received', $request->all());

        $qrId = $request->input('QRId');
        
        if (!$qrId) {
            return response()->json(['success' => false, 'message' => 'QRId missing'], 400);
        }

        return DB::transaction(function () use ($request, $qrId) {
            // Find the QR and lock it to prevent race conditions
            $qr = Qr::where('external_qr_id', $qrId)
                    ->orWhere('code', $qrId)
                    ->lockForUpdate()
                    ->first();

            if ($qr) {
                // Idempotency check: If already paid, return success immediately
                if ($qr->status === 'paid') {
                    return response()->json([
                        'success' => true, 
                        'message' => 'Already paid'
                    ]);
                }

                // Update status
                $qr->status = 'paid';
                $qr->voucher_id = $request->input('VoucherId');
                
                // Only overwrite donor_name if we don't have a specific one already
                if (empty($qr->donor_name) || $qr->donor_name === 'Anónimo') {
                    $qr->donor_name = $request->input('originName'); 
                }
                
                try {
                    $qr->payment_date = \Carbon\Carbon::parse($request->input('TransactionDateTime'));
                } catch (\Exception $e) {
                    Log::warning("Date parse fail", ['date' => $request->input('TransactionDateTime')]);
                    $qr->payment_date = now();
                }

                // Still keep the full blob for audit
                $blob = json_decode($qr->bnb_blob, true) ?? [];
                $blob['webhook_payload'] = $request->all();
                $qr->bnb_blob = json_encode($blob);
                
                $qr->save();

                // --- CREATE DONATION RECORD ---
                $donation = \App\Models\Donation::create([
                    'amount' => $qr->amount,
                    'currency_id' => 1, // Default BOB
                    'status' => 'succeeded',
                    'provider' => 'bnb',
                    'qr_id' => $qr->id,
                    'donor_id' => $qr->donor_id, // Link to the donor we identified
                    'is_anonymous' => empty($qr->donor_id),
                    'date' => $qr->payment_date,
                ]);

                Log::info("QR {$qrId} marked as paid. Donation #{$donation->id} created.");

                // --- TRIGGER CERTIFICATE GENERATION ---
                if ($donation->donor_id) {
                    \App\Jobs\GenerarCertificadoJob::dispatch($donation);
                }
            } else {
                Log::warning("QR {$qrId} not found via webhook.");
            }

            // Return strict success response as per docs
            return response()->json([
                'success' => true,
                'message' => 'Recibido'
            ]);
        });
    }
}
