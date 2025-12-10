<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

class BnbDonationService
{
    protected $baseUrlAuth;
    protected $baseUrlSimple;
    protected $baseUrlVariable;
    protected $accountId;
    protected $authId;
    protected $serviceCode;

    public function __construct()
    {
        // Base URIs from Spec
        $this->baseUrlAuth = 'http://test.bnb.com.bo/ClientAuthentication.API/api/v1';
        $this->baseUrlSimple = 'https://qrsimpleapiv2.azurewebsites.net/api/v1';
        $this->baseUrlVariable = 'http://test.bnb.com.bo/DirectDebit/api';

        // Credentials from .env
        $this->accountId = env('BNB_ACCOUNT_ID');
        $this->authId = env('BNB_AUTH_ID');
        $this->serviceCode = env('BNB_SERVICE_CODE');
    }

    /**
     * Authenticate with BNB to get the Bearer Token.
     * Caches the token for 50 minutes (assuming 1 hour expiry).
     */
    public function authenticate()
    {
        return Cache::remember('bnb_token', 3000, function () {
            $url = "{$this->baseUrlAuth}/auth/token";
            
            try {
                $response = Http::post($url, [
                    'accountId' => $this->accountId,
                    'authorizationId' => $this->authId,
                ]);

                if ($response->successful() && $response->json('success')) {
                    return $response->json('message'); // The token is in the 'message' field
                }

                Log::error('BNB Auth Failed', ['body' => $response->body(), 'status' => $response->status()]);
                return null;
            } catch (\Exception $e) {
                Log::error('BNB Auth Exception', ['message' => $e->getMessage()]);
                return null;
            }
        });
    }

    /**
     * Generate a unique gloss for the transaction.
     * Format: FNE-D-{timestamp}-{random}
     */
    private function generateUniqueGloss()
    {
        return 'FNE-D-' . now()->timestamp . '-' . rand(1000, 9999);
    }

    /**
     * Calculate expiration date based on minutes.
     * Returns date string Y-m-d (as per original code, though spec usually allows time).
     * For now keeping Y-m-d + 1 day as per original implementation preference.
     */
    private function calculateExpirationDate()
    {
        return now()->addDays(1)->format('Y-m-d');
    }

    /**
     * Generate a Fixed Amount QR.
     * Endpoint: /main/getQRWithImageAsync
     */
    public function generateFixedQR($amount, $customerGloss = null, $additionalData = null)
    {
        // 1. Prepare Data
        $gloss = $this->generateUniqueGloss();
        // If the user provided a gloss (like "Donacion Campana X"), we can append it or store it in additionalData.
        // For strict BNB requirement "Gloss", we use our unique ID to ensure tracking, 
        // or we append the customer text if short enough.
        $sendingGloss = $gloss . ($customerGloss ? " $customerGloss" : "");
        $sendingGloss = substr($sendingGloss, 0, 100); // Ensure limit

        $expirationDate = $this->calculateExpirationDate();

        // --- MOCK MODE CHECK ---
        if (env('BNB_MOCK_MODE', false)) {
            Log::info('BNB Mock Mode: Generating fake QR', ['amount' => $amount]);
            
            // Dummy Base64 QR Image (Generic QR Placeholder)
            $dummyQr = 'iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAHdElNRQfmDAkRMh4f6i/IAAABxklEQVR42u3dQYrkMBBA0f9/6d67b2BEEUTYf907RERGKvqYyR/5+P1+/4fx/X6/4w/8F/4L/4X/wn/hv/Bf+C/8F/4L/4X/wn/hv/Bf+C/8F/4L/4X/wn/hv/Bf+C/8F/4L/4X/wn/hv/Bf+C/8F/4L/4X/wn/hv/Bf+C/8F/4L/4X/wn/hv/Bf+C/8F/4L/4X/wn/hv/Bf+C/8F/4L/4X/wn/hv/Bf+C/8F/4L/4X/wn/hv/Bf+C/8F/4L/4X/wn/hv/Bf+C/8F/4L/4X/wn/hv/Bf+C/8F/4L/4X/wn/hv/Bf+C/8F/4L/4X/wn/hv/Bf+C/8F/4L/4X/wn/hv/Bf+C/8F/4L/4X/wn/hv/Bf+C/8F/4L/4X/wn/hv/Bf+C/8F/4L/4X/wn/hv/Bf+C/8F/4L/4X/wn/hv/Bf+C/8F/4L/4X/wn/hv/Bf+C/8F/4L/4X/wn/hv/Bf+C/8F/4L/4X/wn/hv/Bf+C/8F/4L/4X/wn/hv/Bf+C/8F/4L/4X/wn/hv/Bf+C/8F/4L/4X/wn/hv/Bf+C/8F/4X/wX/gv/Bf+C/8F/4L/4X/wn/hv/Bf+C/8F/4L/4X/wn/hv/Bf+C/8F/4L/4X/wn/hv/Bf+G88n88fAwD//wMAgJ+40gAAAABJRU5ErkJggg==';
            $mockId = 'mock_' . uniqid();

            // Return structure matching DB needs
            return [
                'success' => true,
                'qr' => $dummyQr,
                'qrId' => $mockId,
                'expirationDate' => $expirationDate,
                'gloss' => $gloss, // Return the generated gloss to controller
                'mock' => true
            ];
        }

        $token = $this->authenticate();

        if (!$token) {
            throw new \Exception("Failed to authenticate with BNB.");
        }

        $url = "{$this->baseUrlSimple}/main/getQRWithImageAsync";
        
        $payload = [
            'currency' => 'BOB',
            'gloss' => $sendingGloss,
            'amount' => (string) $amount,
            'singleUse' => 'true',
            'expirationDate' => $expirationDate,
            'destinationAccountId' => '1', 
            'additionalData' => $additionalData ?? $gloss, // Use gloss as backup tracking
        ];

        try {
            $response = Http::withToken($token)->post($url, $payload);

            if ($response->successful()) {
                $data = $response->json();
                // Inject our generated gloss into the response so Controller can save it
                $data['gloss'] = $gloss; 
                $data['success'] = true;
                return $data;
            }

            Log::error('BNB Fixed QR Failed', ['body' => $response->body()]);
            return null;
        } catch (\Exception $e) {
            Log::error('BNB Fixed QR Exception', ['message' => $e->getMessage()]);
            return null;
        }
    }

    /**
     * Generate a Variable Amount QR.
     * Endpoint: /Services/GetQRVariableAmount
     */
    public function generateVariableQR($reference)
    {
        $token = $this->authenticate();

        if (!$token) {
            throw new \Exception("Failed to authenticate with BNB.");
        }

        $url = "{$this->baseUrlVariable}/Services/GetQRVariableAmount";

        $payload = [
            'currencyCode' => 1,
            'amount' => 0, // Initial amount 0 for variable
            'reference' => $reference,
            'serviceCode' => $this->serviceCode,
            'dueDate' => now()->addDays(1)->format('Y-m-d'),
            'installmentsQuantity' => 1,
            'chargeType' => 1,
            'chargeDate' => (int) now()->format('d'),
        ];

        try {
            $response = Http::withToken($token)->post($url, $payload);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('BNB Variable QR Failed', ['body' => $response->body()]);
            return null;
        } catch (\Exception $e) {
            Log::error('BNB Variable QR Exception', ['message' => $e->getMessage()]);
            return null;
        }
    }

    /**
     * Check the status of a QR.
     * Endpoint: /main/getQRStatusAsync
     */
    public function checkStatus($qrId)
    {
        $token = $this->authenticate();

        if (!$token) {
            return null;
        }

        $url = "{$this->baseUrlSimple}/main/getQRStatusAsync";

        try {
            $response = Http::withToken($token)->post($url, ['qrId' => $qrId]);

            if ($response->successful()) {
                return $response->json();
            }
            
            Log::error('BNB Check Status Failed', ['body' => $response->body()]);
            return null;
        } catch (\Exception $e) {
            Log::error('BNB Check Status Exception', ['message' => $e->getMessage()]);
            return null;
        }
    }
}
