"use client";
import React, { useState } from 'react'; 
import Image from 'next/image';
import Slider from 'react-slick';
import { motion } from 'framer-motion';

// Estilos para el carrusel
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Componentes
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; 
import Quotes from '@/components/Quotes';
import Suscribe from '@/components/Suscribe'; 
import AboutUs from '@/components/AboutUs';
import DonationModal from '@/components/DonationModal'; 


const directorio = [
  { name: 'Mónica Mendez Saucedo', role: 'Presidente', image: '/IMG/equipo/directorio/MONICA-PRESIDENTE.jpeg' },
  { name: 'Mary Gloria Rengel Velasco', role: 'Vicepresidente', image: '/IMG/equipo/directorio/MARY-VICE PRESIDENTE.jpeg' },
  { name: 'Nora Virginia Michel de Arteaga', role: 'Tesorera', image: '/IMG/equipo/directorio/NORAH-TESORERA.jpeg' },
  { name: 'María Teresa Quevedo Espinoza', role: 'Secretaria', image: '/IMG/equipo/directorio/MARIATERESA-SECRETARIA.jpeg' }
];

const voluntarias = [
  { name: 'Marlene Dalence', image: '/IMG/equipo/voluntarias/marlene.jpg' },
  { name: 'Dolly Nanda', image: '/IMG/equipo/voluntarias/dolly.jpg' },
  { name: 'Rosmery', image: '/IMG/equipo/voluntarias/rosmery.jpg' },
  { name: 'Carola', image: '/IMG/equipo/voluntarias/carola.jpg' },
  { name: 'Diva', image: '/IMG/equipo/voluntarias/diva.jpg' },
  { name: 'Gaby', image: '/IMG/equipo/voluntarias/gaby.jpg' },
  { name: 'Ma. Rene', image: '/IMG/equipo/voluntarias/maRene.jpg' },
  { name: 'Mercedes', image: '/IMG/equipo/voluntarias/mercedes.jpg' },
  { name: 'Rosario', image: '/IMG/equipo/voluntarias/rosario.jpg' },
  { name: 'Sandra', image: '/IMG/equipo/voluntarias/sandra.jpg' },
  { name: 'Susana', image: '/IMG/equipo/voluntarias/susana.jpg' },
  { name: 'Verónica', image: '/IMG/equipo/voluntarias/veronica.jpg' },
  { name: 'Ximena', image: '/IMG/equipo/voluntarias/ximena.jpg' },
  { name: 'Yola', image: '/IMG/equipo/voluntarias/yola.jpg' },
];

export default function AboutPage() {
  // 3. Estado del Modal
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  
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
      {/* 4. Pasar función al Navbar */}
      <Navbar onOpenDonationModal={() => setIsDonationModalOpen(true)} />

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
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ scale: 1.05, y: -10, boxShadow: "0px 15px 25px rgba(0,0,0,0.1)" }}
                  className="flex flex-col items-center"
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
      
      {/* 5. Pasar función al Footer */}
      <Footer onOpenDonationModal={() => setIsDonationModalOpen(true)} />
      
      {/* 6. Renderizar Modal */}
      <DonationModal 
        isOpen={isDonationModalOpen} 
        onClose={() => setIsDonationModalOpen(false)} 
      />
    </main>
  );
}