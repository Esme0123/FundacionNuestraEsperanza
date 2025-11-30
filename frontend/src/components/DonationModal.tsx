"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext'; // Importamos el hook de autenticación

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState<number | string>(50); // Monto por defecto
  const [isLoading, setIsLoading] = useState(false); // Para el spinner del botón
  const [error, setError] = useState<string | null>(null); // Para mostrar errores
  
  const { user, token } = useAuth(); // Obtenemos el usuario y su token si está logueado
  const donationAmounts = [50, 100, 200]; // Montos predefinidos

  // Función que se llama al presionar "CONTINUAR DONACIÓN"
  const handleDonationSubmit = async () => {
    setIsLoading(true);
    setError(null);

    // Valida que el monto sea un número válido y positivo
    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('Por favor, introduce un monto válido.');
      setIsLoading(false);
      return;
    }

    // TODO: Reemplazar con la URL de producción cuando esté lista
    // Por defecto en desarrollo usar localhost para evitar errores DNS
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

    try {
      // 1. Llamar a tu API de Laravel para iniciar el pago
      // Si la API usa Sanctum y sesiones, pedir primero la cookie CSRF
      await fetch(`${API_URL}/sanctum/csrf-cookie`, {
        method: 'GET',
        credentials: 'include',
      });

      const response = await fetch(`${API_URL}/api/donations/initiate`, {
        method: 'POST',
        credentials: token ? 'omit' : 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // Enviar el token en la cabecera si el usuario está logueado
          ...(token && { 'Authorization': `Bearer ${token}` }), 
        },
        body: JSON.stringify({
          amount: numericAmount,
          // Enviar el ID del usuario (si existe) para asociar la donación
          user_id: user ? user.id : null, 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Si el backend da un error (ej. 422, 500), lo mostramos
        throw new Error(data.message || 'Error al iniciar el proceso de pago.');
      }

      // 2. Si todo sale bien, el backend debe devolver la URL de Libélula
      if (data.paymentUrl) {
        // 3. Redirigimos al usuario a la pasarela de pagos
        window.location.href = data.paymentUrl;
      } else {
        throw new Error('Respuesta inesperada del servidor (no se recibió URL de pago).');
      }

    } catch (err: unknown) {
      console.error('Error en la donación:', err);
      setError(err instanceof Error ? err.message : 'No se pudo conectar al servidor. Inténtalo más tarde.');
      setIsLoading(false); 
    }
  };

  // Resetea el estado cuando el modal se cierra
  const handleClose = () => {
    onClose();
    // Espera a que la animación de salida termine para resetear
    setTimeout(() => {
      setAmount(50);
      setError(null);
      setIsLoading(false);
    }, 300); // 300ms es la duración de la animación de salida
  };
  
  const handleAmountClick = (val: number) => {
    setAmount(val);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          onClick={handleClose} // Usar handleClose para cerrar
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 text-center relative"
            onClick={(e) => e.stopPropagation()} // Evita que el clic en el modal lo cierre
          >
            <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-2xl">&times;</button>
            
            <h2 className="text-3xl font-bold text-azul-marino mb-6 font-title">Elige tu Aporte</h2>
            
            <div className="flex justify-center space-x-4 mb-6">
              {donationAmounts.map((val) => (
                <button
                  key={val}
                  onClick={() => handleAmountClick(val)}
                  className={`px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 transform ${amount == val ? 'bg-rosa-principal text-white scale-110' : 'bg-gray-200 text-black hover:bg-rosa-claro'}`}
                >
                  Bs {val}
                </button>
              ))}
            </div>
            
            <input
              type="number"
              placeholder="Otro monto (Bs)"
              value={amount == 50 || amount == 100 || amount == 200 ? '' : amount}
              onChange={handleCustomAmountChange}
              className="w-full p-3 text-center rounded-full border-2 border-gray-300 focus:border-rosa-principal focus:ring-rosa-principal mb-6 font-sans"
            />
             
            <button 
              onClick={handleDonationSubmit}
              disabled={isLoading}
              className="w-full inline-block bg-verde-lima text-white py-4 rounded-full font-bold text-xl hover:bg-verde-lima-claro transition duration-300 font-button disabled:bg-gray-400"
            >
              {isLoading ? 'Procesando...' : 'CONTINUAR DONACIÓN'}
            </button>

            {error && (
              <p className="text-sm text-center text-red-600 mt-4 font-sans">{error}</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DonationModal;