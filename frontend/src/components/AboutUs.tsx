import React from 'react';
import Image from 'next/image';
const AboutUs = () => {
  return (
    <section className="container mx-auto px-6 py-16 bg-white">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold text-black mb-4 font-title">Quiénes Somos</h2>
          <h4 className='text-2xl font-sans text-black'>Misión, Visión y Propósito</h4>
          <p className="text-black mb-6 font-sans">
            Somos una organización sin fines de lucro dedicada a brindar apoyo integral a niños con cáncer y sus familias. Nuestra misión es ofrecer esperanza y mejorar su calidad de vida a través de programas médicos, educativos y emocionales.
          </p>
          <a href="#" className="bg-turquesa-secundario text-white px-6 py-3 rounded-full font-bold hover:bg-opacity-90 transition duration-300 font-button">
            Conocer más
          </a>
        </div>
        <div>
          <Image
            src="/IMG/Equipo.jpg" 
            alt="Equipo"
            layout="fill"
            objectFit="cover" 
            quality={90} 
            className="-z-10" 
          /> 
        </div>
      </div>
    </section>
  );
};

export default AboutUs;