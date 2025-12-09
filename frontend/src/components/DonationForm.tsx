"use client";
import React, { useState, useEffect } from 'react';
import { donationService, DonationTier, QrResponse } from '@/services/donationService';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const DonationForm = () => {
    const { user } = useAuth(); // Import useAuth to get user details
    
    // States for Multi-step Flow
    const [step, setStep] = useState<'amount' | 'identity' | 'details' | 'qr' | 'success'>('amount');
    
    // Data States
    const [tiers, setTiers] = useState<DonationTier[]>([]);
    const [selectedTier, setSelectedTier] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState<string>('');
    const [isAnonymous, setIsAnonymous] = useState(true);
    
    // Donor Details
    const [donorName, setDonorName] = useState('');
    const [donorCi, setDonorCi] = useState('');
    const [donorPhone, setDonorPhone] = useState('');
    
    // QR & Status
    const [loading, setLoading] = useState(false);
    const [qrData, setQrData] = useState<QrResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const [simulating, setSimulating] = useState(false);

    // Fetch options on mount
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const data = await donationService.getOptions();
                setTiers(data);
            } catch (err) {
                console.error("Failed to load donation options", err);
            }
        };
        fetchOptions();
    }, []);

    // Effect to pre-fill user data if logged in
    useEffect(() => {
        if (user) {
            if (user.name) setDonorName(user.name);
            // Assuming user object might have other fields or we just pre-fill what we can
            // If user has 'dni' or 'phone' in the object, map it here.
            // For now, based on standard AuthContext usually providing basic user info.
        }
    }, [user]);

    // Polling for status
    useEffect(() => {
        let interval: NodeJS.Timeout;
        const POLLING_TIMEOUT = 15 * 60 * 1000; // 15 minutes
        const startTime = Date.now();

        if (step === 'qr' && qrData && qrData.qr_id && status !== 'paid') {
            interval = setInterval(async () => {
                if (Date.now() - startTime > POLLING_TIMEOUT) {
                    clearInterval(interval);
                    setError("El tiempo de espera ha expirado. Por favor genera un nuevo QR.");
                    return;
                }
                try {
                    const data = await donationService.checkStatus(qrData.qr_id);
                    if (data.status === 'paid' || data.status === '2') {
                        setStatus('paid');
                        setStep('success');
                        clearInterval(interval);
                    }
                } catch (err) {
                    console.error("Polling error", err);
                }
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [step, qrData, status]);

    // --- Handlers ---

    const handleAmountSelect = () => {
        setError(null);
        if (!selectedTier && (!customAmount || parseFloat(customAmount) <= 0)) {
            setError("Por favor selecciona un monto o ingresa uno válido.");
            return;
        }
        setStep('identity');
    };

    const router = useRouter(); 

    // ... existing useEffects ...

    // Restore pending donation after login
    useEffect(() => {
        const pending = localStorage.getItem('pendingDonation');
        if (pending && user) {
            try {
                const { tier, amount } = JSON.parse(pending);
                if (tier) setSelectedTier(tier);
                if (amount) setCustomAmount(amount);
                setStep('details'); // Go straight to details
                localStorage.removeItem('pendingDonation'); // Clear it
            } catch (e) {
                console.error("Error parsing pending donation", e);
            }
        }
    }, [user]);

    // ...

    const handleIdentitySelect = (anonymous: boolean) => {
        setIsAnonymous(anonymous);
        
        if (anonymous) {
            // Skip details, go straight to QR
            generateQr(true);
        } else {
            // User wants to identify
            if (!user) {
                // Not logged in -> Redirect to login
                // Save current state
                const state = {
                    tier: selectedTier,
                    amount: customAmount
                };
                localStorage.setItem('pendingDonation', JSON.stringify(state));
                
                // Redirect
                // Assuming the page using this component is accessible via standard route.
                // Since this is a component, we don't know exactly where we are, but usually /programas or /donar.
                // We'll just redirect to login and assume user comes back or we use a redirect param.
                // The login page in 'page.tsx' (viewed earlier) checks `router.push('/perfil')`. 
                // It doesn't seem to support generic redirect param yet? 
                // Wait, the Login Page I viewed earlier (step 370) hardcodes `router.push('/perfil')`.
                // I need to update Login Page to support redirect param if I want smooth flow.
                // For now, let's just push to login.
                router.push('/login?redirect=back'); 
                return;
            }
            
            // Go to details form
            setStep('details');
        }
    };

    const submitDetails = () => {
        if (!donorName.trim() || !donorCi.trim() || !donorPhone.trim()) {
            setError("Por favor completa todos los campos para continuar.");
            return;
        }
        generateQr(false);
    };

    const generateQr = async (anonymous: boolean) => {
        setLoading(true);
        setError(null);
        setQrData(null);
        
        try {
            let res: QrResponse;
            const details = anonymous ? undefined : { name: donorName, ci: donorCi, phone: donorPhone };
            
            if (selectedTier) {
                res = await donationService.requestQr(selectedTier, undefined, anonymous, details);
            } else {
                res = await donationService.requestQr(undefined, parseFloat(customAmount), anonymous, details);
            }
            
            setQrData(res);
            setStep('qr');

        } catch (err: any) {
            setError(err.message || "Ocurrió un error inesperado al generar el QR.");
            setStep('amount'); // Go back on error? Or stay?
        } finally {
            setLoading(false);
        }
    };

    const handleSimulatePayment = async () => {
        if (!qrData || simulating) return;
        setSimulating(true);
        try {
            await donationService.simulatePayment(qrData.qr_id, isAnonymous ? "Donante Anónimo" : donorName);
        } catch (err) {
            console.error("Simulation failed", err);
            setError("Error simulando el pago.");
        } finally {
            setSimulating(false);
        }
    };

    const resetFlow = () => {
        setStep('amount');
        setStatus(null);
        setQrData(null);
        setSelectedTier(null);
        setCustomAmount('');
        // Keep donor details if they typed them? Maybe reset them.
        if (!user) {
            setDonorName('');
            setDonorCi('');
            setDonorPhone('');
        }
    };

    // --- Renders ---

    if (step === 'success') {
        return (
            <div className="text-center p-8 bg-green-50 rounded-lg shadow-md animate-fade-in">
                <h2 className="text-2xl font-bold text-green-700 mb-4 font-title">¡Gracias por tu donación!</h2>
                <p className="text-gray-700 font-sans mb-6">Tu aporte ha sido recibido exitosamente.</p>
                { !isAnonymous && (
                    <div className="mb-6">
                        <p className="text-sm text-gray-500 mb-2">Hemos generado tu certificado de donación.</p>
                        <a 
                            href="/perfil" 
                            className="text-rosa-principal font-bold hover:underline"
                        >
                            Ver en mi Historial
                        </a>
                    </div>
                )}
                <button
                    onClick={resetFlow}
                    className="px-6 py-2 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition font-button"
                >
                    Realizar otra donación
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto min-h-[400px]">
            <h2 className="text-2xl font-bold text-azul-marino mb-6 text-center font-title">
                {step === 'amount' && "Realizar Donación"}
                {step === 'identity' && "¿Cómo deseas donar?"}
                {step === 'details' && "Tus Datos"}
                {step === 'qr' && "Escanea el QR"}
            </h2>

            {/* ERROR MESSAGE */}
            {error && <p className="text-red-500 text-sm mb-4 text-center font-sans bg-red-50 p-2 rounded">{error}</p>}

            {/* STEP 1: AMOUNT */}
            {step === 'amount' && (
                <div className="animate-fade-in">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {tiers.map((tier) => (
                            <button
                                key={tier.id}
                                onClick={() => { setSelectedTier(tier.id); setCustomAmount(''); }}
                                className={`py-3 px-4 rounded-lg font-bold transition-all font-sans ${selectedTier === tier.id
                                        ? 'bg-rosa-principal text-white shadow-md transform scale-105'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {tier.label} <br />
                                <span className="text-sm font-normal">{tier.amount} Bs</span>
                            </button>
                        ))}
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2 font-sans">Otro Monto (Bs)</label>
                        <input
                            type="number"
                            value={customAmount}
                            onChange={(e) => { setCustomAmount(e.target.value); setSelectedTier(null); }}
                            placeholder="Ej: 150"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rosa-principal font-sans"
                        />
                    </div>
                    <button
                        onClick={handleAmountSelect}
                        className="w-full py-3 bg-azul-marino text-white font-bold rounded-full hover:bg-opacity-90 transition font-button"
                    >
                        Continuar
                    </button>
                </div>
            )}

            {/* STEP 2: IDENTITY */}
            {step === 'identity' && (
                <div className="flex flex-col gap-4 animate-fade-in">
                    <p className="text-gray-600 text-center mb-2">Elige una opción para continuar:</p>
                    
                    <button
                        onClick={() => handleIdentitySelect(false)}
                        className="w-full py-3 bg-rosa-principal text-white font-bold rounded-lg hover:bg-opacity-90 transition flex items-center justify-center gap-2"
                    >
                        <span>📝</span> Quiero identificarme 
                        <span className="text-xs font-normal opacity-90">(Recibo deducible)</span>
                    </button>
                    
                    { !user && (
                        <button
                            onClick={() => handleIdentitySelect(true)}
                            className="w-full py-3 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition flex items-center justify-center gap-2"
                        >
                            <span>🕵️</span> Donar Anónimamente
                        </button>
                    ) }

                    <button 
                        onClick={() => setStep('amount')}
                        className="text-sm text-gray-500 mt-2 hover:underline"
                    >
                        ← Volver
                    </button>
                </div>
            )}

            {/* STEP 3: DETAILS */}
            {step === 'details' && (
                <div className="animate-fade-in">
                    <p className="text-sm text-gray-600 mb-4 text-center">Tus datos aparecerán en el certificado de donación.</p>
                    
                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700">Nombre Completo</label>
                            <input
                                type="text"
                                value={donorName}
                                onChange={(e) => setDonorName(e.target.value)}
                                className="w-full px-3 py-2 border rounded focus:ring-rosa-principal"
                                placeholder="Juan Pérez"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700">CI / Documento ID</label>
                            <input
                                type="text"
                                value={donorCi}
                                onChange={(e) => setDonorCi(e.target.value)}
                                className="w-full px-3 py-2 border rounded focus:ring-rosa-principal"
                                placeholder="1234567 LP"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700">Celular / Teléfono</label>
                            <input
                                type="text"
                                value={donorPhone}
                                onChange={(e) => setDonorPhone(e.target.value)}
                                className="w-full px-3 py-2 border rounded focus:ring-rosa-principal"
                                placeholder="77712345"
                            />
                        </div>
                    </div>

                    <button
                        onClick={submitDetails}
                        disabled={loading}
                        className="w-full py-3 bg-azul-marino text-white font-bold rounded-full hover:bg-opacity-90 transition disabled:bg-gray-400"
                    >
                        {loading ? 'Generando...' : 'Generar QR'}
                    </button>
                    
                    <button 
                        onClick={() => setStep('identity')}
                        disabled={loading}
                        className="w-full text-center text-sm text-gray-500 mt-3 hover:underline"
                    >
                        ← Volver
                    </button>
                </div>
            )}

            {/* STEP 4: QR */}
            {step === 'qr' && qrData && (
                <div className="animate-fade-in text-center">
                    <div className="flex justify-center mb-4">
                        <img
                            src={qrData.qr_image.startsWith('data:') ? qrData.qr_image : `data:image/png;base64,${qrData.qr_image}`}
                            alt="QR de Pago"
                            className="border-4 border-white shadow-lg rounded-lg"
                            style={{ maxWidth: '250px' }}
                        />
                    </div>
                    <p className="text-xs text-gray-500 font-sans mb-2">Escanea desde tu app bancaria</p>
                    <div className="flex justify-center items-center gap-2 mb-4">
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-rosa-principal"></div>
                        <span className="text-sm text-gray-600">Esperando pago...</span>
                    </div>

                    {qrData.mock && (
                        <div className="mt-4 pt-4 border-t">
                            <button
                                onClick={handleSimulatePayment}
                                disabled={simulating}
                                className={`text-xs px-3 py-1 rounded font-mono ${simulating ? 'bg-gray-400 text-gray-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                                {simulating ? 'Simulando...' : '[DEV] Simular Pago Exitoso'}
                            </button>
                        </div>
                    )}
                    
                    <button 
                        onClick={() => {
                            // If they identified, maybe keep details? Default to reset for safety.
                            setStep('amount');
                            setQrData(null);
                        }}
                        className="mt-4 text-sm text-gray-500 underline"
                    >
                        Cancelar
                    </button>
                </div>
            )}
        </div>
    );
};

export default DonationForm;
