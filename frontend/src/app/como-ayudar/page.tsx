"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonationModal from "@/components/DonationModal";
import Alliances from "@/components/Alliances";
import HowToHelp from '@/components/HowToHelp'; // Importado por si decides usarlo aquí también

const HelpPage = () => {
  // 1. Estado para controlar el Modal
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  return (
    <>
      <main className="bg-white">
        {/* 2. Pasamos la función al Navbar */}
        <Navbar onOpenDonationModal={() => setIsDonationModalOpen(true)} />

        {/* Hero Section (Imagen Principal) */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative h-[50vh] md:h-[60vh] flex items-center justify-center text-white"
        >
          <div className="absolute inset-0 z-0">
             {/* Asegúrate de que esta imagen exista o usa una genérica */}
             <Image 
                src="/IMG/help-hero-bg.jpg" 
                alt="Fondo Cómo Ayudar" 
                fill 
                className="object-cover object-center"
                priority // Carga rápida para el LCP
             />
             <div className="absolute inset-0 bg-black/50 z-10"></div>
          </div>
          
          <motion.div
            className="relative z-20 text-center px-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.3 } }
            }}
          >
            <motion.h1
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              className="text-4xl md:text-6xl font-bold font-title mb-4"
            >
              TU AYUDA HACE LA DIFERENCIA
            </motion.h1>
            <motion.p
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              className="text-xl md:text-2xl font-sans max-w-2xl mx-auto"
            >
              Hay muchas formas de ser parte del cambio. Encuentra la tuya.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Sección de Cuentas Bancarias (Contenido Estático) */}
        <section className="py-16 container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold text-azul-marino mb-6 font-title">Donaciones Directas</h2>
                    <p className="text-gray-600 mb-6 font-sans">
                        Puedes realizar un depósito bancario directo a nuestras cuentas oficiales. 
                        Cada centavo se destina a alimentación, medicinas y mantenimiento del albergue.
                    </p>
                    
                    <div className="bg-beige-claro p-6 rounded-lg border-l-4 border-rosa-principal shadow-md">
                        <h3 className="font-bold text-lg mb-2 text-azul-marino">Banco Nacional de Bolivia (BNB)</h3>
                        <p className="text-gray-700">Cuenta en Bolivianos:</p>
                        <p className="text-2xl font-bold text-rosa-principal mb-2">150-0234567</p>
                        <p className="text-sm text-gray-500">Nit: 1234567015</p>
                        <p className="text-sm text-gray-500">Razón Social: Fundación Nuestra Esperanza</p>
                    </div>

                    <div className="mt-8">
                        <button 
                            onClick={() => setIsDonationModalOpen(true)}
                            className="bg-turquesa-secundario text-white px-8 py-3 rounded-full font-bold hover:bg-azul-marino transition duration-300 font-button shadow-lg hover:shadow-xl"
                        >
                            DONAR CON QR ONLINE
                        </button>
                    </div>
                </div>
                <div className="relative h-80 w-full rounded-xl overflow-hidden shadow-2xl">
                    <Image 
                        src="/IMG/voluntariado.jpg" // Asegúrate de tener esta imagen
                        alt="Donación" 
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </section>

        <HowToHelp onOpenDonationModal={() => setIsDonationModalOpen(true)} />

        {/* Redes Sociales */}
        <section className="bg-rosa-principal py-16 text-white text-center">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-6 font-title"
            >
              DIFUNDE LA VOZ
            </motion.h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto font-sans">
              Síguenos en nuestras redes sociales y comparte nuestras historias. 
              Ayúdanos a llegar a más corazones generosos.
            </p>
            
            <div className="flex justify-center gap-8">
                <a href="https://www.facebook.com/NuestraEsperanzaBo/?locale=es_LA" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                    <Image src="/IMG/ic_facebook.png" alt='Facebook' width={50} height={50} className="bg-white rounded-full p-1" />
                </a>
                <a href="https://www.tiktok.com/@fund.nuestra.esperanza" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                    <Image src="/IMG/ic_tiktok.png" alt='TikTok' width={50} height={50} className="bg-white rounded-full p-1" />
                </a>
                <a href="https://www.instagram.com/fundacionnuestraesperanza" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                    <Image src="/IMG/ic_instagram.png" alt='Instagram' width={50} height={50} className="bg-white rounded-full p-1" />
                </a>
            </div>
          </div>
        </section>

        <Alliances />
        <Footer />

        {/* 3. El Modal de Donación (Invisible hasta que se abre) */}
        <DonationModal 
            isOpen={isDonationModalOpen} 
            onClose={() => setIsDonationModalOpen(false)} 
        />
      </main>
    </>
  );
};

export default HelpPage;