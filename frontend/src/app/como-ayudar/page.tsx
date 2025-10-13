"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonationModal from "@/components/DonationModal"; 

const HelpPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <main>
        <Navbar />

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative h-80 flex items-center justify-center text-white"
        >
          <Image src="/IMG/hero-help.jpg" alt="Fondo Cómo Ayudar" layout="fill" objectFit="cover" className="-z-10 object-top" />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl font-bold z-10 font-title"
          >
            Cómo Ayudar
          </motion.h1>
        </motion.section>

        <section className="relative py-20">
          <Image src="/IMG/ayudar.png" alt="Fondo de ayuda" layout="fill" objectFit="cover" className="-z-10" />
          <div className="absolute inset-0 bg-azul-marino opacity-80"></div>
          <div className="container mx-auto px-6 relative z-10 text-white">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-center mb-12 font-title"
            >
              Únete a Nuestra Causa
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
              {/* Card Voluntariado */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center"
              >
                <h3 className="text-3xl font-bold mb-4 font-title">VOLUNTARIADO</h3>
                <p className="mb-8 text-gray-300">Tu tiempo y talento son un regalo invaluable. Ayúdanos a organizar eventos, brindar apoyo y llevar alegría a nuestros niños.</p>
                <a href="#" className="bg-turquesa-secundario px-8 py-3 rounded-full font-bold hover:bg-blue-200 text-azul-marino transition duration-300 font-button">SER VOLUNTARIO</a>
              </motion.div>
              {/* Card Donaciones */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center"
              >
                <h3 className="text-3xl font-bold mb-4 font-title">DONACIONES</h3>
                <p className="mb-8 text-gray-300">Cada contribución es un pilar fundamental que sostiene nuestro albergue, alimenta a nuestras familias y financia la esperanza.</p>
                {/* ESTE BOTÓN ABRE EL MODAL */}
                <button onClick={() => setModalOpen(true)} className="bg-rosa-principal px-8 py-3 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300 font-button">DONAR AHORA</button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sección Adicional: Otras Formas de Ayudar (las 2 cards) */}
        <section className="bg-beige-claro py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-black mb-12 text-center font-title">Más Formas de Involucrarte</h2>
            <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
              {/* Card Difunde */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
                whileHover={{ y: -10, boxShadow: "0px 20px 30px rgba(0,0,0,0.1)" }}
                className="bg-white p-8 rounded-lg shadow-lg text-center"
              >
                <h3 className="text-2xl font-bold font-title mb-4">Difunde la Voz</h3>
                <p className="font-sans text-gray-700">Comparte nuestras historias en tus redes sociales. Tu voz puede inspirar a otros a unirse a nuestra causa.</p>
              </motion.div>
              {/* Card Donaciones en Especie */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ y: -10, boxShadow: "0px 20px 30px rgba(0,0,0,0.1)" }}
                className="bg-white p-8 rounded-lg shadow-lg text-center"
              >
                <h3 className="text-2xl font-bold font-title mb-4">Donaciones en Especie</h3>
                <p className="font-sans text-gray-700">Aceptamos alimentos no perecederos, juguetes y material escolar que alegran el día a día de nuestros niños.</p>
              </motion.div>
            </div>
          </div>
        </section>
        
        <Footer />
      </main>
      
      <DonationModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default HelpPage;