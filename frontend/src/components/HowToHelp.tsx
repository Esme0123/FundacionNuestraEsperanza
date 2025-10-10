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
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-bold text-white mb-12 text-center font-title">CÓMO AYUDAR</h2>
        <div className="grid md:grid-cols-2 gap-32 max-w-6xl mx-auto">
          <div className=" p-8 rounded-lg shadow-xl text-center ">
            <h3 className="text-3xl font-bold text-white mb-4 font-title p-3">VOLUNTARIADO</h3>
            <p className="text-gray-400 font-sans mb-6 pb-5">
              I am text block. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
            <a href="#" className="bg-rosa-principal text-white px-6 py-4 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300 font-button">
            SER VOLUNTARIO
          </a>
          </div>

          <div className=" p-8 rounded-lg shadow-xl text-center">
            <h3 className="text-3xl font-bold text-white mb-4 font-title p-3">DONACIONES</h3>
            <p className="text-gray-400 font-sans mb-6">
              I am text block. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
            <a href="#" className="bg-rosa-principal text-white px-8 py-4 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300 font-button">
            DONAR
            </a>
          </div>
        </div>
        <div className="mt-12 text-center">
          <a href="#" className="bg-turquesa-secundario px-7 py-5 rounded-full font-bold hover:bg-blue-200 text-azul-marino transition duration-300 font-button">
            CONOCER MÁS
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowToHelp;