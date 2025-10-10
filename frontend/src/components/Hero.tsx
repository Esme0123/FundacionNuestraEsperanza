import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section 
      className="relative text-center text-white flex items-center justify-center h-[70vh]">
      <Image
        src="/IMG/Home.jpg" 
        alt="Fondo de la fundación"
        layout="fill"
        objectFit="cover" 
        quality={90} 
        priority 
        className="-z-10" 
      />  
      <div className="absolute inset-0 bg-azul-marino opacity-35 -z-10"></div>
      <div className="relative z-10 container mx-auto">
        <div className="">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight font-title">
          Toda vida merece esperanza
        </h1>
        <p className="mt-4 text-4x1 font-sans ">Apoyamos a niños con cáncer y sus familias de toda Bolivia en La Paz</p>
        </div>
        <div className="mt-8 space-x-4">
          <a href="#" className="bg-turquesa-secundario px-7 py-5 rounded-full font-bold hover:bg-blue-200 text-azul-marino transition duration-300 font-button">
            CONOCER MÁS
          </a>
          <a href="#" className="bg-rosa-principal px-7 py-5 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300 font-button">
            DONAR AHORA
          </a>
        </div>

      </div>
    </section>
  );
};

export default Hero;