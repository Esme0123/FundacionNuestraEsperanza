import React from 'react';
import Image from 'next/image';

const HowToHelp = () => {
  return (
    <section className="relative py-20 bg-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="/IMG/ayudar.png"
          alt="Niños sonriendo"
          layout="fill"
          objectFit="cover"
          quality={85}
        />
        {/* Capa de superposición oscura para legibilidad del texto 
        <div className="absolute inset-0 bg-black opacity-50"></div>*/}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-bold text-white mb-12 text-center font-title">CÓMO AYUDAR</h2>
        <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center">
            <h3 className="text-3xl font-bold text-black mb-4 font-title">VOLUNTARIADO</h3>
            <p className="text-black font-sans mb-6">
              I am text block. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
            <a href="#" className="bg-turquesa-secundario text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition duration-300 font-button">
              SER VOLUNTARIO
            </a>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-xl text-center">
            <h3 className="text-3xl font-bold text-black mb-4 font-title">DONACIONES</h3>
            <p className="text-black font-sans mb-6">
              I am text block. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
            <a href="#" className="bg-rosa-principal text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition duration-300 font-button">
              DONAR
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToHelp;