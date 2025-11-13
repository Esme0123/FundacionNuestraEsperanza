"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Nombre 1",
      quote: "Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis.",
      image: "/IMG/cabello.png",
      age: "Edad"
    },
    {
      name: "Nombre 2",
      quote: "Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis.",
      image: "/IMG/cabello.png",
      age: "Edad"
    },
    {
      name: "Nombre 3",
      quote: "Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis.",
      image: "/IMG/cabello.png",
      age: "Edad"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="testimonios" className="bg-rosa-claro py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 text-center font-title">TESTIMONIOS</h2>
        <div className="flex justify-center">
            <div className="bg-rosa-principal w-20 h-2 mb-10"></div>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden group"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10, boxShadow: "0px 20px 30px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-full h-64">
                <Image src={testimonial.image} alt={testimonial.name} layout="fill" objectFit="cover" />
              </div>
              <div className="p-6 text-center">
                <h4 className="text-xl font-bold text-black mb-2 font-title">{testimonial.name}</h4>
                <p className="text-black font-sans text-sm italic">&quot;{testimonial.quote}&quot;</p>
                <p className="text-sm text-gray-500 font-sans mt-2">{testimonial.age}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-12">
          <a href="/testimonials" className="bg-rosa-principal text-white px-8 py-3 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300 font-button">
            VER MÁS
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;