import React from 'react';
import Image from 'next/image';
const AboutUs = () => {
  return (
    <section className="mx-auto px-2 py-16 ">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-5xl font-bold text-black mb-4 font-title">QUIÉNES SOMOS</h2>
          <div className="bg-rosa-principal w-20 h-2 mb-5"></div>
          <h4 className='text-2xl font-sans text-black'>Misión, Visión y Propósito</h4>
          <p className="text-black mb-6 font-sans pt-5 pb-5">
            Somos una organización sin fines de lucro dedicada a brindar apoyo integral a niños con cáncer y sus familias. Nuestra misión es ofrecer esperanza y mejorar su calidad de vida a través de programas médicos, educativos y emocionales.
          </p>
          <a href="#" className="bg-turquesa-secundario px-7 py-5 rounded-full font-bold hover:bg-blue-200 text-azul-marino transition duration-300 font-button">
            CONOCER MÁS
          </a>
        </div>
        <div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutUs;