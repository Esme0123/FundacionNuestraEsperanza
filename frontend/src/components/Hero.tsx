"use client";
import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

const Hero = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };
  return (
    <section 
      className="relative text-center text-white flex items-center justify-center h-[70vh]">
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/IMG/Home.jpg" 
          alt="Fondo de la fundación"
          layout="fill"
          objectFit="cover" 
          quality={90} 
          priority 
        />
      </motion.div>
      <div className="absolute inset-0 bg-azul-marino opacity-35 z-0"></div>
      <div className="absolute inset-0 bg-azul-marino opacity-35 -z-10"></div>
      <motion.div
        className="relative container mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-extrabold leading-tight font-title">
          Toda vida merece esperanza
        </motion.h1>
        <motion.p variants={itemVariants} className="mt-4 text-lg font-sans max-w-2xl mx-auto">
          Apoyamos a niños con cáncer y sus familias de toda Bolivia en La Paz
        </motion.p>
        <motion.div variants={itemVariants} className="mt-8 space-x-4">
          <a href="#" className="bg-turquesa-secundario px-5 py-5 rounded-full font-bold hover:bg-blue-200 text-azul-marino transition duration-300 font-button">
            CONOCER MÁS
          </a>
          <a href="#" className="bg-rosa-principal px-5 py-5 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300 font-button">
            DONAR AHORA
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;