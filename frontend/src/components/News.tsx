"use client";
import React from 'react';
import YouTube from 'react-youtube';
import { motion } from 'framer-motion';

const News = () => {
  const videoId = "JDXusqw60Gg";
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };
  return (
    <section id="noticias" className="bg-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="order-2 md:order-1"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-2 font-title">NOTICIAS</h2>
            <div className="flex justify-left">
              <div className="bg-rosa-principal w-20 h-2 mb-5"></div>
            </div>
            <h4 className="text-xl md:text-2xl font-sans text-gray-700 mb-6">Recientes / Galería</h4>
            <p className="text-black font-sans mb-4">
              Son más de 8 años de haber vivido alegrias, por nuestros sobrevivientes y tristeza por la partida de nuestros pequeños, en ambos casos dejan huellas imborrables en cada uno de los corazones y mente de los voluntarios y todas las personas que tuvieron y tienen contacto con nuestros niños.</p>
            <p className="text-black font-sans mb-8">
              La Casita un Hogar lejos de casa está abierta, gracias a todas las personas que nos apoyan con un granito de arena a solventar los gastos del Albergue y del Comedor.
            </p>
            <a href="/news" className="bg-rosa-principal text-white px-6 py-3 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300 font-button">
              CONOCER MÁS
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg bg-black order-1 md:order-2"
          >
            <YouTube videoId={videoId} opts={opts} className="absolute top-0 left-0 w-full h-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default News;