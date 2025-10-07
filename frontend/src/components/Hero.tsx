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
      <div className="absolute inset-0 bg-celeste-claro opacity-40 -z-10"></div>
      <div className="relative z-10 container mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight font-title">
          Toda vida merece esperanza
        </h1>
        <p className="mt-4 text-lg font-sans">Apoyamos a niños con cáncer y sus familias de toda Bolivia en La Paz</p>
        <div className="mt-8 space-x-4">
          <a href="#" className="bg-turquesa-secundario px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition duration-300 font-button">
            Conocer más
          </a>
          <a href="#" className="bg-rosa-principal px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition duration-300 font-button">
            Donar ahora
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;