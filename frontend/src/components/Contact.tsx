"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';

const Contact = () => {
  const formVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const fieldVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };
  return (
    <section id="contacto" className="bg-verde-lima-claro py-16">
      <div className="container mx-auto px-6 text-center ">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.8 }} className="text-3xl md:text-4xl font-bold text-black mb-4 font-title ">CONTACTO</motion.h2>
        <div className="flex justify-center">
          <div className="bg-rosa-principal w-20 h-2 mb-5"></div>
        </div>
        <p className="text-black font-sans max-w-2xl mx-auto mb-8">
          ¿Tienes alguna pregunta o quieres saber más sobre cómo puedes ayudar? ¡Nos encantaría saber de ti!
        </p>
        <motion.form
          variants={formVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="max-w-xl mx-auto border-black border-2 bg-white p-6 md:p-8"
        >
          <motion.div variants={fieldVariants} className="mb-4 text-left">
            <label htmlFor="nombre" className='font-sans font-bold'>Nombre</label>
            <input id="nombre" type="text" placeholder="Tu Nombre" className="w-full p-3 rounded-md border border-gray-300 bg-gray-200 mt-2" />
          </motion.div>
          <motion.div variants={fieldVariants} className="mb-4 text-left">
            <label htmlFor="apellido" className='font-sans font-bold'>Apellido</label>
            <input id="apellido" type='text' placeholder='Tu Apellido' className='w-full p-3 rounded-md border border-gray-300 bg-gray-200 mt-2' />
          </motion.div>
          <motion.div variants={fieldVariants} className="mb-4 text-left">
            <label htmlFor="email" className='font-sans font-bold'>Correo Electrónico</label>
            <input id="email" type="email" placeholder="Tu Correo Electrónico" className="w-full p-3 rounded-md border border-gray-300 bg-gray-200 mt-2" />
          </motion.div>
          <motion.div variants={fieldVariants} className="mb-4 text-left">
            <label htmlFor="mensaje" className='font-sans font-bold'>Mensaje</label>
            <textarea id="mensaje" placeholder="Tu Mensaje" rows={5} className="w-full p-3 rounded-md border border-gray-300 bg-gray-200 mt-2"></textarea>
          </motion.div>
          <motion.button variants={fieldVariants} className="bg-turquesa-secundario hover:bg-blue-200 text-azul-marino px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition duration-300 font-button">
            ENVIAR MENSAJE
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;