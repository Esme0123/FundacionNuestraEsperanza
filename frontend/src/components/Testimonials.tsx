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

  return (
    <section id="testimonios" className="bg-rosa-claro py-16"> 
      <div className="container mx-auto px-6">
        <h2 data-aos="fade-up" className="text-4xl font-bold text-black mb-2 text-center font-title">TESTIMONIOS</h2>
        <div className="flex justify-center">
              <div className="bg-rosa-principal w-20 h-2 mb-5"></div>
            </div>
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ staggerChildren: 0.2 }}
        >
          {testimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.name}
              variants={{
                initial: { opacity: 0, y: 50 },
                animate: { opacity: 1, y: 0 }
              }}
              whileHover="hover"
              className="relative bg-white shadow-lg overflow-hidden"
            >
              <motion.div
                variants={{
                  initial: { filter: "blur(0px)", scale: 1 },
                  hover: { filter: "blur(4px)", scale: 0.95, opacity: 0.7 }
                }}
                transition={{ duration: 0.4 }}
                className="group-hover:opacity-50"
              >
                  <div className="relative w-full h-0 pb-[100%]"> 
                    <Image src={testimonial.image} alt={testimonial.name} layout="fill" objectFit="cover" className="absolute inset-0" />
                  </div>
                  <div className="p-6 text-center">
                    <h4 className="text-xl font-bold text-black mb-2 font-title">{testimonial.name}</h4>
                    <p className="text-black font-sans">{testimonial.quote}</p>
                    <p className="text-sm text-gray-500 font-sans mt-2">{testimonial.age}</p>
                  </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                variants={{ hover: { opacity: 1 } }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <div className="relative w-full h-0 pb-[100%]"> 
                  <Image src={testimonial.image} alt={testimonial.name} layout="fill" objectFit="cover" className="absolute inset-0" />
                </div>
                <div className="p-6 text-center bg-white">
                  <h4 className="text-xl font-bold text-black mb-2 font-title">{testimonial.name}</h4>
                  <p className="text-black font-sans">{testimonial.quote}</p>
                  <p className="text-sm text-gray-500 font-sans mt-2">{testimonial.age}</p>
                </div>
              </motion.div>
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