<?php

namespace App\Http\Controllers;

use App\Models\DonationTier;
use App\Models\Qr;
use App\Services\BnbDonationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PublicDonationController extends Controller
{
    protected $bnbService;

    public function __construct(BnbDonationService $bnbService)
    {
        $this->bnbService = $bnbService;
    }

    /**
     * Get active donation options (tiers).
     */
    public function getOptions()
    {
        $tiers = DonationTier::where('is_active', true)
            ->orderBy('order')
            ->get();
            
        return response()->json($tiers);
    }

    /**
     * Request a QR code for donation.
     */
    public function requestQr(Request $request)
    {
        $request->validate([
            'tier_id' => 'nullable|exists:donation_tiers,id',
            'custom_amount' => 'nullable|numeric|min:1',
        ]);

        $amount = 0;
        $gloss = "Donacion Web";

        if ($request->tier_id) {
            $tier = DonationTier::find($request->tier_id);
            $amount = $tier->amount;
            $gloss = "Donacion: " . $tier->label;
        } elseif ($request->custom_amount) {
            $amount = $request->custom_amount;
            $gloss = "Donacion Libre";
        } else {
            return response()->json(['message' => 'Amount or Tier required'], 400);
        }

        try {
            // Logic: If amount > 0, use Fixed QR. If amount is 0 (shouldn't happen with validation min:1), use Variable.
            // But user spec says: "If custom_amount > 0, use that."
            // Also spec says: "Method generateVariableQR... First, try calling generateFixedQR passing amount = 0."
            // But here we are in requestQr where we usually have a specific amount from the user.
            // If the user selects "Other Amount" and types 100, we send 100.
            // If the user wants to decide LATER (variable), we might support that, but the UI flow suggests they pick an amount.
            // Let's assume for now we always have an amount unless we add a specific "Open Amount" button.
            
            $response = $this->bnbService->generateFixedQR($amount, $gloss);

            if (!$response) {
                return response()->json(['message' => 'Error communicating with Payment Gateway'], 503);
            }

            // Save QR record
            $qr = Qr::create([
                'amount' => $amount,
                'status' => 'generated',
                'bnb_blob' => json_encode($response),
                'expiration_date' => now()->addDays(1),
                'url' => $response['qr'] ?? null, // Base64 image
                'code' => $response['qrId'] ?? null,
            ]);

            return response()->json([
                'qr_image' => $response['qr'] ?? null,
                'qr_id' => $response['qrId'] ?? null,
                'expiration' => now()->addDays(1)->toIso8601String(),
            ]);

        } catch (\Exception $e) {
            Log::error('Public QR Request Error', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Internal Server Error'], 500);
        }
    }

    /**
     * Check status of a QR.
     */
    public function checkStatus($qrId)
    {
        // In a real scenario, we might query BNB API here if we don't have webhooks.
        // Spec says: "Polling: Consultar al backend... Endpoint: /main/getQRStatusAsync"
        // So we should proxy the status check or check our DB if we have a background job updating it.
        // For now, let's implement a simple proxy to BNB or just return DB status.
        // The spec says "Polling /api/public/check-status/{qr_id}".
        
        // Let's try to query BNB to get the latest status.
        // We need to add checkStatus to BnbDonationService.
        
        // For this iteration, I'll just return the DB status, assuming we might implement the service method later 
        // or if the user wants strictly the BNB proxy now.
        // The spec says "Polling: Consultar al backend cada 5 segundos".
        // Let's add checkStatus to the Service as per spec "Método checkStatus(qrId)".
        
        // I'll assume I need to add it to the service. I'll do that in a separate step or update the service file.
        // For now, let's return a placeholder or DB status.
        
        $qr = Qr::where('code', $qrId)->first();
        if (!$qr) {
            return response()->json(['message' => 'QR not found'], 404);
        }
        
        return response()->json(['status' => $qr->status]);
    }
}
