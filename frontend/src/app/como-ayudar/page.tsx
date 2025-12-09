"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonationModal from "@/components/DonationModal";
import DonationForm from "@/components/DonationForm";
import Alliances from "@/components/Alliances";
import HowToHelp from '@/components/HowToHelp';

const HelpPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <main className="bg-white">
        <Navbar />

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative h-[50vh] md:h-[60vh] flex items-center justify-center text-white"
        >
          <Image src="/IMG/help-hero-bg.jpg" alt="Fondo Cómo Ayudar" layout="fill" objectFit="cover" className="z-10 object-center" />
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
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
                visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="text-4xl md:text-6xl font-bold font-title"
            >
              Cómo Ayudar
            </motion.h1>
            <motion.p
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="mt-2 text-lg md:text-xl font-sans"
            >
              Tu apoyo es nuestra fortaleza
            </motion.p>
          </motion.div>
        </motion.section>

        <HowToHelp />

        <section className="bg-beige-claro py-16 md:py-20">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold text-black mb-12 text-center font-title"
            >
              Más Formas de Involucrarte
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Alianzas', description: 'Tu empresa puede ser un aliado estratégico.', image: '/IMG/help.jpeg' },
                { title: 'En Especie', description: 'Aceptamos con gratitud alimentos no perecederos, artículos de higiene y artículos de limpieza.', image: '/IMG/Events/rifaSolidaria.jpg' },
                { title: 'Eventos', description: 'Participa y apoya nuestros eventos de recaudación.', image: '/IMG/Events/carreraPedestre.jpg' }
                // { title: 'Corte Solidario: ¡Haz la Diferencia!', description: 'Únete a nuestros eventos y dona tu cabello para transformar vidas. Cada mecha cuenta. ¡Participa y apoya a quienes más lo necesitan!', image: '/IMG/Events/carreraPedestre.jpg' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ y: -10, boxShadow: "0px 20px 30px rgba(0,0,0,0.1)" }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
                >
                  <div className="relative w-full h-56">
                    <Image src={item.image} alt={item.title} layout="fill" objectFit="cover" />
                  </div>
                  <div className="p-6 text-center flex-grow flex flex-col justify-between">
                    <h3 className="text-2xl font-bold font-title mb-3">{item.title}</h3>
                    <p className="font-sans text-gray-700">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-20 md:py-24 text-white text-center">
          <Image src="/IMG/hero_help.jpg" alt="Fondo para difundir la voz" layout="fill" objectFit="cover" className="-z-10" />
          <div className="absolute inset-0 bg-rosa-principal bg-opacity-80"></div>
          <div className="relative container mx-auto px-6 max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl md:text-4xl font-bold mb-4 font-title"
            >
              Tu Voz Tiene Poder
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-sans text-base md:text-lg mb-8"
            >
              Una simple acción puede generar una ola de esperanza. Comparte nuestra misión y ayúdanos a llegar a más corazones.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center space-x-6"
            >
              <a href="https://www.facebook.com/NuestraEsperanzaBo/?locale=es_LA" className="text-4xl hover:scale-125 transition-transform">
                <Image
                  src="/IMG/ic_facebook.png" alt='Facebook' width={50} height={50}
                /></a>
              <a href="https://www.tiktok.com/@fund.nuestra.esperanza?_t=ZM-90VE1jzCdp5&_r=1 " className='text-4xl hover:scale-125 transition-transform'>
                <Image
                  src="/IMG/ic_tiktok.png" alt='TikTok' width={50} height={50}
                /></a>
              <a href="https://www.instagram.com/fundacionnuestraesperanza/?hl=es-la" className='text-4xl hover:scale-125 transition-transform'>
                <Image
                  src="/IMG/ic_instagram.png" alt='Instagram' width={50} height={50}
                /></a>
            </motion.div>
          </div>
        </section>

        {/* SECTION: BNB Donation Form for Demo */}
        <section className="bg-gray-50 py-16 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-azul-marino mb-8 font-title">
              Haz una Donación con QR (BNB)
            </h2>
            <div className="flex justify-center">
              <DonationForm />
            </div>
          </div>
        </section>

        <Alliances />
        <Footer />
      </main>

      <DonationModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default HelpPage;