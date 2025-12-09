import axios from 'axios';
axios.defaults.withCredentials = true; // Ensure cookies are sent for Sanctum auth

// Get API URL from env or default
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export interface DonationTier {
    id: number;
    amount: string;
    label: string;
    currency_id: number;
}

export interface QrResponse {
    qr_image: string;
    qr_id: string;
    expiration: string;
    mock?: boolean;
}

export const donationService = {
    /**
     * Get available donation options
     */
    getOptions: async (): Promise<DonationTier[]> => {
        const response = await axios.get<DonationTier[]>(`${API_URL}/api/public/donation-options`);
        return response.data;
    },

    /**
     * Request a QR for donation
     */
    requestQr: async (
        tierId?: number, 
        customAmount?: number, 
        isAnonymous: boolean = true, 
        donorDetails?: { name: string, ci: string, phone: string }
    ): Promise<QrResponse> => {
        const payload: any = {
            is_anonymous: isAnonymous
        };
        
        if (tierId) payload.tier_id = tierId;
        else if (customAmount) payload.custom_amount = customAmount;

        if (!isAnonymous && donorDetails) {
            payload.donor_name = donorDetails.name;
            payload.donor_ci = donorDetails.ci;
            payload.donor_phone = donorDetails.phone;
        }

        // Retrieve token from localStorage manually since we are outside React Context
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

        const response = await axios.post<QrResponse>(`${API_URL}/api/public/request-qr`, payload, config);
        return response.data;
    },

    /**
     * Check status of a QR
     */
    checkStatus: async (qrId: string): Promise<{ status: string }> => {
        const response = await axios.get<{ status: string }>(`${API_URL}/api/public/check-status/${qrId}`);
        return response.data;
    },

    /**
     * Simulate a payment (Demo Mode Only)
     * Calls the webhook directly to force 'paid' status
     */
    simulatePayment: async (qrId: string, donorName: string = 'Simulated Donor') => {
        // Construct dummy webhook payload
        const payload = {
            QRId: qrId,
            VoucherId: 'sim_' + Math.floor(Math.random() * 100000),
            originName: donorName,
            TransactionDateTime: new Date().toISOString(),
            Gloss: 'Simulated Payment'
        };

        const response = await axios.post(`${API_URL}/api/webhooks/bnb`, payload);
        return response.data;
    }
};
