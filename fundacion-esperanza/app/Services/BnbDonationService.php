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
     * Generate a Fixed Amount QR.
     * Endpoint: /main/getQRWithImageAsync
     */
    public function generateFixedQR($amount, $gloss)
    {
        $token = $this->authenticate();

        if (!$token) {
            throw new \Exception("Failed to authenticate with BNB.");
        }

        $url = "{$this->baseUrlSimple}/main/getQRWithImageAsync";
        
        // Ensure amount is string formatted as needed if strict, but JSON usually handles numbers.
        // Spec says "amount": "20" (String) in example, so we cast to string.
        $payload = [
            'currency' => 'BOB',
            'gloss' => $gloss,
            'amount' => (string) $amount,
            'singleUse' => 'true', // String "true" in example
            'expirationDate' => now()->addDays(1)->format('Y-m-d'),
        ];

        try {
            $response = Http::withToken($token)->post($url, $payload);

            if ($response->successful()) {
                // The response is the byte array or base64 string directly? 
                // Spec says: "El servicio devuelve un array de bytes o string Base64".
                // We'll assume it returns a JSON with the image or the raw image.
                // Let's assume it returns the Base64 string directly or in a field.
                // Based on "Respuesta Clave" in spec: { "qr": "Base64...", "qrId": "..." }
                // Wait, the spec has two sections. Section 2 says "devuelve el mismo en un array de bytes".
                // Section 3.B says "Respuesta Clave: qr (Base64), qrId".
                // We will return the JSON response to be safe and parse in controller.
                return $response->json();
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
