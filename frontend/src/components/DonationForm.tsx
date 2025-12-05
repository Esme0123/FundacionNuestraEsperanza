"use client";
import React, { useState, useEffect } from 'react';

interface DonationTier {
    id: number;
    amount: string;
    label: string;
    currency_id: number;
}

interface QrResponse {
    qr_image: string;
    qr_id: string;
    expiration: string;
}

const DonationForm = () => {
    const [tiers, setTiers] = useState<DonationTier[]>([]);
    const [selectedTier, setSelectedTier] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [qrData, setQrData] = useState<QrResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<string | null>(null);

    // Fetch options on mount
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
                const res = await fetch(`${API_URL}/api/public/donation-options`);
                if (res.ok) {
                    const data = await res.json();
                    setTiers(data);
                }
            } catch (err) {
                console.error("Failed to load donation options", err);
            }
        };
        fetchOptions();
    }, []);

    // Polling for status
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (qrData && qrData.qr_id) {
            interval = setInterval(async () => {
                try {
                    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
                    const res = await fetch(`${API_URL}/api/public/check-status/${qrData.qr_id}`);
                    if (res.ok) {
                        const data = await res.json();
                        // Assuming status 'paid' or '2' means success
                        if (data.status === 'paid' || data.status === '2') {
                            setStatus('paid');
                            clearInterval(interval);
                        }
                    }
                } catch (err) {
                    console.error("Polling error", err);
                }
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [qrData]);

    const handleDonate = async () => {
        setLoading(true);
        setError(null);
        setQrData(null);
        setStatus(null);

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
            const payload: any = {};

            if (selectedTier) {
                payload.tier_id = selectedTier;
            } else if (customAmount) {
                payload.custom_amount = parseFloat(customAmount);
            } else {
                setError("Por favor selecciona un monto o ingresa uno propio.");
                setLoading(false);
                return;
            }

            const res = await fetch(`${API_URL}/api/public/request-qr`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error("Error al generar el QR");
            }

            const data = await res.json();
            setQrData(data);

        } catch (err: any) {
            setError(err.message || "Ocurrió un error inesperado.");
        } finally {
            setLoading(false);
        }
    };

    if (status === 'paid') {
        return (
            <div className="text-center p-8 bg-green-50 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-green-700 mb-4">¡Gracias por tu donación!</h2>
                <p className="text-gray-700">Tu aporte ha sido recibido exitosamente.</p>
                <button
                    onClick={() => { setStatus(null); setQrData(null); setSelectedTier(null); setCustomAmount(''); }}
                    className="mt-6 px-6 py-2 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition"
                >
                    Realizar otra donación
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-azul-marino mb-6 text-center font-title">Realizar Donación</h2>

            {/* Tiers */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                {tiers.map((tier) => (
                    <button
                        key={tier.id}
                        onClick={() => { setSelectedTier(tier.id); setCustomAmount(''); }}
                        className={`py-3 px-4 rounded-lg font-bold transition-all ${selectedTier === tier.id
                                ? 'bg-rosa-principal text-white shadow-md transform scale-105'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {tier.label} <br />
                        <span className="text-sm font-normal">{tier.amount} Bs</span>
                    </button>
                ))}
            </div>

            {/* Custom Amount */}
            <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">Otro Monto (Bs)</label>
                <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setSelectedTier(null); }}
                    placeholder="Ej: 150"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rosa-principal"
                />
            </div>

            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

            {/* Donate Button */}
            {!qrData && (
                <button
                    onClick={handleDonate}
                    disabled={loading}
                    className="w-full py-3 bg-azul-marino text-white font-bold rounded-full hover:bg-opacity-90 transition disabled:bg-gray-400"
                >
                    {loading ? 'Generando QR...' : 'Donar Ahora'}
                </button>
            )}

            {/* QR Display */}
            {qrData && (
                <div className="mt-6 text-center animate-fade-in">
                    <p className="text-sm text-gray-600 mb-2">Escanea el QR desde tu app bancaria:</p>
                    <div className="flex justify-center mb-4">
                        {/* Assuming the base64 string doesn't have the prefix, we add it. If it does, we should check. */}
                        <img
                            src={`data:image/png;base64,${qrData.qr_image}`}
                            alt="QR de Pago"
                            className="border-4 border-white shadow-lg rounded-lg"
                            style={{ maxWidth: '250px' }}
                        />
                    </div>
                    <p className="text-xs text-gray-500">Esperando confirmación de pago...</p>
                    <div className="mt-2 flex justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-rosa-principal"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DonationForm;
