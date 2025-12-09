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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState<string | null>(null); // Se mantiene por si lo usas luego
    const [status, setStatus] = useState<string | null>(null);

    // 1. Definimos la URL aquí para que esté disponible en todo el componente
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

    // 2. Cargar opciones al iniciar (useEffect corregido)
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const res = await fetch(`${API_URL}/api/public/donation-options`);
                if (res.ok) {
                    const data = await res.json();
                    setTiers(data);
                }
            } catch (err) {
                console.error("Failed to fetch donation tiers", err);
            }
        };
        fetchOptions();
    }, [API_URL]);

    // 3. Función handleDonate (MOVIDA AFUERA DEL USEEFFECT para que funcione)
    const handleDonate = async () => {
        setLoading(true);
        setError(null);
        setQrData(null);

        // Determinar el monto (si seleccionó un botón o escribió un monto)
        let amountToSend = customAmount;
        if (selectedTier !== null) {
            const tier = tiers.find(t => t.id === selectedTier);
            if (tier) amountToSend = tier.amount;
        }

        if (!amountToSend) {
            alert("Por favor selecciona un monto");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${API_URL}/api/public/request-qr`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: amountToSend,
                    currency_id: 2, 
                    email: "donante.anonimo@ejemplo.com" // Puedes agregar un input para esto luego si quieres
                })
            });

            if (res.ok) {
                const data = await res.json();
                setQrData(data); // Guardamos la imagen del QR
                setStatus('pending');
            } else {
                console.error("Error solicitando QR");
                alert("Error al generar el QR. Intenta nuevamente.");
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión");
        } finally {
            setLoading(false);
        }
    };

    // 4. Polling para verificar si ya pagó (Lógica de estado)
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (qrData && status === 'pending') {
            interval = setInterval(async () => {
                try {
                    const res = await fetch(`${API_URL}/api/public/check-status/${qrData.qr_id}`);
                    if (res.ok) {
                        const data = await res.json();
                        if (data.status === 'paid' || data.status === 'succeeded') {
                            setStatus('success');
                            clearInterval(interval);
                            alert("¡Gracias por tu donación!");
                        }
                    }
                } catch (error) {
                    console.error("Error verificando estado", error);
                }
            }, 5000); // Revisa cada 5 segundos
        }

        return () => clearInterval(interval);
    }, [qrData, status, API_URL]);


    return (
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-auto">
            <h3 className="text-2xl font-bold text-azul-marino mb-6 text-center font-title">
                Selecciona tu aporte
            </h3>

            {/* Grid de botones de montos */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                {tiers.map((tier) => (
                    <button
                        key={tier.id}
                        onClick={() => {
                            setSelectedTier(tier.id);
                            setCustomAmount(''); // Limpia el monto manual si selecciona botón
                        }}
                        className={`py-3 px-2 rounded-lg border-2 font-bold transition-all ${
                            selectedTier === tier.id
                                ? 'border-rosa-principal bg-rosa-principal text-white'
                                : 'border-gray-200 text-gray-600 hover:border-rosa-principal'
                        }`}
                    >
                        Bs {tier.amount}
                    </button>
                ))}
            </div>

            {/* Input de monto personalizado */}
            <div className="mb-6 relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">Bs</span>
                <input
                    type="number"
                    placeholder="Otro monto"
                    value={customAmount}
                    onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedTier(null); // Desmarca los botones si escribe manual
                    }}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-turquesa-secundario transition"
                />
            </div>

            {/* Botón de Donar */}
            {!qrData && (
                <button
                    onClick={handleDonate}
                    disabled={loading}
                    className="w-full py-3 bg-azul-marino text-white font-bold rounded-full hover:bg-opacity-90 transition disabled:bg-gray-400 font-button"
                >
                    {loading ? 'Generando QR...' : 'Donar Ahora'}
                </button>
            )}

            {/* Visualización del QR */}
            {qrData && (
                <div className="mt-6 text-center animate-fade-in">
                    <p className="text-sm text-gray-600 mb-2 font-sans">Escanea el QR desde tu app bancaria:</p>
                    <div className="flex justify-center mb-4">
                        {/* Usamos img normal para evitar problemas de configuración de dominios externos en build */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={`data:image/png;base64,${qrData.qr_image}`}
                            alt="QR de Pago"
                            className="border-4 border-white shadow-lg rounded-lg"
                            style={{ maxWidth: '250px' }}
                        />
                    </div>
                    
                    {status === 'success' ? (
                        <div className="bg-green-100 text-green-700 p-4 rounded-lg">
                            <p className="font-bold">¡Donación Recibida!</p>
                            <p className="text-sm">Gracias por tu ayuda.</p>
                        </div>
                    ) : (
                        <>
                            <p className="text-xs text-gray-500 font-sans">Esperando confirmación de pago...</p>
                            <div className="mt-2 flex justify-center">
                                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-rosa-principal"></div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default DonationForm;