"use client";
import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { motion } from 'framer-motion'; // Eliminados useRef, useScroll, useTransform que no se usaban

// Estilos para el carrusel
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Componentes
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; 
import Quotes from '@/components/Quotes';
import Suscribe from '@/components/Suscribe'; 
import AboutUs from '@/components/AboutUs';


const directorio = [
  { name: 'Mónica Mendez Saucedo', role: 'Presidente', image: '/IMG/equipo/directorio/MONICA-PRESIDENTE.jpeg' },
  { name: 'Mary Gloria Rengel Velasco', role: 'Vicepresidente', image: '/IMG/equipo/directorio/MARY-VICE PRESIDENTE.jpeg' },
  { name: 'Nora Virginia Michel de Arteaga', role: 'Tesorera', image: '/IMG/equipo/directorio/NORAH-TESORERA.jpeg' },
  { name: 'María Teresa Quevedo Espinoza', role: 'Secretaria', image: '/IMG/equipo/directorio/MARIATERESA-SECRETARIA.jpeg' }
];

const voluntarias = [
  { name: 'Marlene Dalence', image: 'https://ui-avatars.com/api/?name=Marlene+Dalence&background=random&size=200' },
  { name: 'Dolly Nanda', image: 'https://ui-avatars.com/api/?name=Dolly+Nanda&background=random&size=200' },
  { name: 'Rosmery', image: 'https://ui-avatars.com/api/?name=Rosmery&background=random&size=200' },
  { name: 'Carola', image: 'https://ui-avatars.com/api/?name=Carola&background=random&size=200' },
  { name: 'Diva', image: 'https://ui-avatars.com/api/?name=Diva&background=random&size=200' },
  { name: 'Gaby', image: 'https://ui-avatars.com/api/?name=Gaby&background=random&size=200' },
  { name: 'Ma. Rene', image: 'https://ui-avatars.com/api/?name=Ma+Rene&background=random&size=200' },
  { name: 'Mercedes', image: 'https://ui-avatars.com/api/?name=Mercedes&background=random&size=200' },
  { name: 'Rosario', image: 'https://ui-avatars.com/api/?name=Rosario&background=random&size=200' },
  { name: 'Sandra', image: 'https://ui-avatars.com/api/?name=Sandra&background=random&size=200' },
  { name: 'Susana', image: 'https://ui-avatars.com/api/?name=Susana&background=random&size=200' },
  { name: 'Verónica', image: 'https://ui-avatars.com/api/?name=Veronica&background=random&size=200' },
  { name: 'Ximena', image: 'https://ui-avatars.com/api/?name=Ximena&background=random&size=200' },
  { name: 'Yola', image: 'https://ui-avatars.com/api/?name=Yola&background=random&size=200' },
];

export default function AboutPage() {
  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <motion.section 
        className="relative h-80 flex items-center justify-center text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image src="/IMG/Equipo.jpg" alt="Fondo Quiénes Somos" layout="fill" objectFit="cover" className="-z-10 object-center" />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-6xl font-bold z-10 font-title"
        >
          Quiénes Somos
        </motion.h1>
      </motion.section>
      <AboutUs />

      {/* Directorio */}
      <section className="bg-beige-claro py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-azul-marino mb-12 font-title"
          >
            NUESTRO EQUIPO
          </motion.h2>

          <h3 className="text-3xl font-bold text-azul-marino mb-8 font-title">Directorio</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {directorio.map((member, index) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-lg p-6 shadow-lg flex flex-col items-center"
              >
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-rosa-principal mb-4">
                  <Image src={member.image} alt={member.name} layout="fill" objectFit="cover" />
                </div>
                <h4 className="text-xl font-bold text-azul-marino font-title">{member.name}</h4>
                <p className="text-turquesa-secundario font-bold font-sans">{member.role}</p>
              </motion.div>
            ))}
          </div>

          {/* Voluntarias */}
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-azul-marino mb-8 font-title"
          >
            Voluntarias
          </motion.h3>

          <Slider {...sliderSettings}>
            {voluntarias.map((volunteer) => (
              <div key={volunteer.name} className="px-2">
                {/* CORRECCIÓN AQUÍ: 
                   Fusioné el motion.div con el div de contenido.
                   Antes tenías un motion.div vacío que se cerraba solo.
                   Ahora envuelve correctamente la imagen y el texto.
                */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ scale: 1.05, y: -10, boxShadow: "0px 15px 25px rgba(0,0,0,0.1)" }}
                  className="flex flex-col items-center" // Mantuve tu clase de diseño
                >
                  <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-md mb-4 mx-auto">
                    <Image src={volunteer.image} alt={volunteer.name} layout="fill" objectFit="cover" />
                  </div>
                  <h4 className="font-bold text-md font-title text-center text-gray-700">
                    {volunteer.name}
                  </h4>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      <Quotes/>
      <Suscribe />
      <Footer />
    </main>
  );
}