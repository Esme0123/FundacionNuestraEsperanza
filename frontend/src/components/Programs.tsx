"use client";
import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Programs = () => {
  const programs = [
    {
      image: "/IMG/alojamiento.jpg",
      title: "Alojamiento",
      description: "Nuestra fundación cuenta con una casita albergue denominada UTAJA que significa Mi Casa. La misma tiene una capacidad de 12 camas y está situada en la calle Francisco de Miranda 1856 (Miraflores) La Paz, Bolivia. ",
      color: "bg-celeste-fondo"
    },
    {
      image: "/IMG/almuerzo.png",
      title: "Almuerzos",
      description: "La Fundación otorga alimentación gratuita para el niño y su acompañante durante su estadia en nuestro albergue. Durante casi 7 años se otorgaron 10,200 almuerzo para los pápas de niños hospitalizados.",
      color: "bg-verde-lima"
    },
    {
      image: "/IMG/colaboracion.jpg",
      title: "Colaboración",
      description: "Tambien nos enorgullece ofrecer programas diseñados para respaldar integralmente a las familias afectadas por el cáncer infantil, ofeciendo talleres educativos, apoyo psicológico, y trabajos sociales.",
      color: "bg-amarillo-detalle"
    },
    {
      image:"/IMG/Programs/apoyoSicologico.jpg",
      title: "Apoyo Psicológico",
      description: "Creamos ambientes de juego y esparcimiento para que los niños puedan seguir disfrutando de su infancia a pesar de la enfermedad.",
      color: "bg-verde-lima"
    },
  ];
  // 2. CONFIGURACIÓN DEL SLIDER AÑADIDA
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, // En pantallas 'md' y 'lg' (reemplaza md:grid-cols-2)
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768, // En pantallas 'sm' (reemplaza grid-cols-1)
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };
  // const containerVariants: Variants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: { staggerChildren: 0.2, delayChildren: 0.2 }
  //   }
  // };

  const cardVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  return (
    <section id="programas" className="bg-celeste-claro py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-2 text-center font-title">PROGRAMAS</h2>
        <div className="flex justify-center">
          <div className="bg-rosa-principal w-20 h-2 mb-5"></div>
        </div>
        <h3 className="text-xl md:text-2xl font-sans text-gray-700 text-center mb-12">Qué hacemos</h3>

        <Slider {...sliderSettings}>
          {programs.map((program) => (
            <div key={program.title} className="p-4"> 
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                whileHover={{ y: -15, scale: 1.05, rotateX: 5, rotateY: -5, boxShadow: "0px 25px 40px rgba(0,0,0,0.15)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full" 
                style={{ perspective: '1000px' }}
              >
                <div className={`w-full h-3 ${program.color}`}></div>
                <div className="relative w-full h-0 pb-[66.66%] overflow-hidden">
                  <Image src={program.image} alt={`Imagen de ${program.title}`} layout="fill" objectFit="cover" className="absolute inset-0" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="text-2xl font-bold text-black mb-4 font-title">{program.title}</h4>
                  <p className="text-black font-sans mb-6 flex-grow">{program.description}</p>
                  <a href="/programas" className="bg-rosa-principal text-white px-6 py-3 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300 font-button self-start">
                    CONOCER MÁS
                  </a>
                </div>
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Programs;