"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState<number | string>(50);
  const donationAmounts = [50, 100, 200];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          onClick={onClose} 
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 text-center relative"
            onClick={(e) => e.stopPropagation()} 
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-2xl">&times;</button>
            
            <h2 className="text-3xl font-bold text-azul-marino mb-6 font-title">Elige tu Aporte</h2>
            
            <div className="flex justify-center space-x-4 mb-6">
              {donationAmounts.map((val) => (
                <button
                  key={val}
                  onClick={() => setAmount(val)}
                  className={`px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 transform ${amount === val ? 'bg-rosa-principal text-white scale-110' : 'bg-gray-200 text-black hover:bg-rosa-claro'}`}
                >
                  Bs {val}
                </button>
              ))}
            </div>
            
            <input
              type="number"
              placeholder="Otro monto"
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 text-center rounded-full border-2 border-gray-300 focus:border-rosa-principal focus:ring-rosa-principal mb-6"
            />
             
            <a href="#" className="w-full inline-block bg-verde-lima text-white py-4 rounded-full font-bold text-xl hover:bg-verde-lima-claro transition duration-300 font-button">
              CONTINUAR DONACIÓN
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DonationModal;