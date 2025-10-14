"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const HowToHelp = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  return (
    <section ref={targetRef} id="como-ayudar" className="relative py-20 bg-white min-h-[80vh] overflow-hidden flex items-center">
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image src="/IMG/ayudar.png" alt="Niños sonriendo" layout="fill" objectFit="cover" quality={85} />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-white mb-4 text-center font-title"
        >
          CÓMO AYUDAR
        </motion.h2>
        <div className="flex justify-center">
          <div className="bg-rosa-principal w-20 h-2 mb-5"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 lg:gap-32 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: -30 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="p-8 rounded-lg shadow-xl text-center bg-black bg-opacity-30 backdrop-blur-sm"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-title p-3">VOLUNTARIADO</h3>
            <p className="text-gray-300 font-sans mb-6 pb-5">
              Tu tiempo y talento son un regalo invaluable. Ayúdanos a organizar eventos, brindar apoyo y llevar alegría a nuestros niños.
            </p>
            <a href="#" className="bg-rosa-principal text-white px-6 py-4 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300 font-button">
              SER VOLUNTARIO
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: -30 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="p-8 rounded-lg shadow-xl text-center bg-black bg-opacity-30 backdrop-blur-sm"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-title p-3">DONACIONES</h3>
            <p className="text-gray-300 font-sans mb-6">
              Cada contribución es un pilar fundamental que sostiene nuestro albergue, alimenta a nuestras familias y financia la esperanza.
            </p>
            <a href="#" className="bg-rosa-principal text-white px-8 py-4 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300 font-button">
              DONAR
            </a>
          </motion.div>
        </div>
        <div className="mt-12 text-center">
          <a href="/como-ayudar" className="bg-turquesa-secundario px-7 py-5 rounded-full font-bold hover:bg-blue-200 text-azul-marino transition duration-300 font-button">
            CONOCER MÁS
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowToHelp;