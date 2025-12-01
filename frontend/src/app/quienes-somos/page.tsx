"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { motion, useScroll, useTransform } from 'framer-motion';

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
  { name: 'Marlene Dalence', image: '/IMG/equipo/voluntarias/marlene.jpg' },
  { name: 'Sonia Quevedo', image: '/IMG/equipo/voluntarias/sonia.jpg' },
  { name: 'Angela Mariaca', image: '/IMG/equipo/voluntarias/angela-m.jpg' },
  { name: 'Gloria Aguilar', image: '/IMG/equipo/voluntarias/gloria.jpg' },
  { name: 'Mariana Cardona', image: '/IMG/equipo/voluntarias/mariana.jpg' },
  { name: 'Gina Malcon', image: '/IMG/equipo/voluntarias/gina.jpg' },
  { name: 'Soraya Quiroga', image: '/IMG/equipo/voluntarias/soraya.jpg' },
  { name: 'Ana Michel', image: '/IMG/equipo/voluntarias/ana.jpg' },
  { name: 'Karen', image: '/IMG/equipo/voluntarias/karen.jpg' },
  { name: 'Jessica', image: '/IMG/equipo/voluntarias/jessica.jpg' },
  { name: 'Susana Arze', image: '/IMG/equipo/voluntarias/susana.jpg' },
  { name: 'Maria René', image: '/IMG/equipo/voluntarias/maria.jpg' },
  { name: 'Ximena Melean', image: '/IMG/equipo/voluntarias/ximena.jpg' },
  { name: 'Camila Quintanilla', image: '/IMG/equipo/voluntarias/camila.jpg' },
  { name: 'Angela', image: '/IMG/equipo/voluntarias/angela.jpg' },
  { name: 'Ivonne', image: '/IMG/equipo/voluntarias/ivonne.jpg' },
  { name: 'Verónica López', image: '/IMG/equipo/voluntarias/veronica.jpg' },
  { name: 'Cecilia Quiroga', image: '/IMG/equipo/voluntarias/cecilia.jpg' }
];


const AboutPage = () => {
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
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };
    // Hooks para el efecto Parallax de "Nuestra Historia"
    const historySectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: historySectionRef,
      offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    //parallax misión visión
    const missionSectionRef = useRef(null);
    const { scrollYProgress: missionScroll } = useScroll({ target: missionSectionRef, offset: ["start end", "end start"] });
    const missionY = useTransform(missionScroll, [0, 1], ["-20%", "20%"]);

  return (
    <main>
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
      <section ref={historySectionRef} className="relative h-[60vh] text-white text-center flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 -z-10" style={{ y }}>
          <Image src="/IMG/historia.jpg" alt="Nuestra Historia" layout="fill" objectFit="cover" />
        </motion.div>
        <div className="absolute inset-0 bg-azul-marino opacity-70"></div>
        <div className="relative container mx-auto px-6 max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-4 font-title"
          >
            Nuestra Historia
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20, scaleX: 0 }}
            whileInView={{ opacity: 1, y: 0, scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-rosa-principal w-20 h-1.5 mx-auto mb-6"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-sans text-lg"
          >
           Desde 2017, la Casita Utaja brinda un hogar de esperanza para niños con cáncer y sus familias que llegan desde distintas regiones del país. Gracias al apoyo solidario de muchas personas, hemos crecido durante más de ocho años ofreciendo un espacio cálido, humano y lleno de amor.
En 2024, con el financiamiento de CCI y SIOP mediante el proyecto Home Away From Home, logramos adquirir nuestra propia casa, ampliando la capacidad del albergue y mejorando las condiciones para nuestras familias.
          </motion.p>
        </div>
      </section>

      {/* Misión y Visión */}
      <section ref={missionSectionRef} className="relative py-20 overflow-hidden">
          <motion.div className="absolute inset-0 -z-10" style={{ y }}>
            <Image src="/IMG/mision-vision.jpg" alt="Misión y Visión" layout="fill" objectFit="cover" />
          </motion.div>
          <div className="absolute inset-0 bg-rosa-claro opacity-70"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-black mb-2 font-title text-center"
          >
            Nuestra Misión y Visión
          </motion.h2>
          <div className="flex justify-center">
              <div className="bg-rosa-principal w-20 h-2 mb-5"></div>
            </div>
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">

            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-3xl font-bold text-azul-marino mb-4 font-title">Misión</h3>
              <p className="font-sans text-gray-700">Apoyar al niño, niña y adolescente con cáncer a través de programas de atención integral con fin de mejorar su calidad de vida.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-3xl font-bold text-azul-marino mb-4 font-title">Visión</h3>
              <p className="font-sans text-gray-700">Ser una organizacion sin fines de lucro con un alto nivel de sensibilidad y responsabilidad social, comprometida a luchar por mejorar la calidad de vida del niño, niña y adolescentes con cáncer y a sus familias. </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nuestro Equipo */}
      <section className="container mx-auto  py-20 text-center bg-beige-claro">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-black mb-2 font-title"
        >
          Nuestro Equipo
        </motion.h2>
        <div className="flex justify-center">
              <div className="bg-rosa-principal w-20 h-2 mb-5"></div>
            </div>
        {/* Directorio */}
        <motion.h3 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl font-bold text-azul-marino mb-8 font-title"
        >
          Directorio
        </motion.h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20">
          {directorio.map((member, index) => (
            <motion.div 
              key={member.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ scale: 1.05, y: -10, boxShadow: "0px 15px 25px rgba(0,0,0,0.1)" }}
              className="flex flex-col items-center"
            >
              <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-lg mb-4">
                <Image src={member.image} alt={member.name} layout="fill" objectFit="cover" />
              </div>
              <h4 className="font-bold text-lg font-title">{member.name}</h4>
              <p className="font-sans text-rosa-principal">{member.role}</p>
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
              key={volunteer.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -10, boxShadow: "0px 15px 25px rgba(0,0,0,0.1)" }}
              className="flex flex-col items-center"
            ></motion.div>
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-md mb-4">
                  <Image src={volunteer.image} alt={volunteer.name} layout="fill" objectFit="cover" />
                </div>
                <h4 className="font-bold text-md font-title">{volunteer.name}</h4>
              </div>
            </div>
          ))}
        </Slider>
      </section>
      
      <Quotes />
      <Suscribe /> 
      <Footer />
    </main>
  );
};

export default AboutPage;