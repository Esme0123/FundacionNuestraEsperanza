"use client";
import React from 'react';
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const News = () => {
  const youtubeVideoUrl = 'https://www.youtube.com/watch?v=IpCPTWZszJc';

  return (
    <section id="noticias" className="bg-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-black mb-2 font-title">NOTICIAS</h2>
            <div className="flex justify-left">
              <div className="bg-rosa-principal w-20 h-2 mb-5"></div>
            </div>
            <h4 className="text-2xl font-sans text-gray-700 mb-6">Recientes / Galería</h4>
            <p className="text-black font-sans mb-4">
              Son más de 8 años de haber vivido alegrias, por nuestros sobrevivientes y tristeza por la partida de nuestros pequeños, en ambos casos dejan huellas imborrables en cada uno de los corazones y mente de los voluntarios y todas las personas que tuvieron y tienen contacto con nuestros niños.</p>
            <p className="text-black font-sans mb-8">
              La Casita un Hogar lejos de casa está abierta, gracias a todas las personas que nos apoyan con un granito de arena a solventar los gastos del Albergue y del Comedor.
            </p>
            <a href="#" className="bg-rosa-principal text-white px-6 py-3 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300 font-button">
              CONOCER MÁS
            </a>
          </div>
          <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg bg-black">
            <ReactPlayer
              url={youtubeVideoUrl}
              width="100%"
              height="100%"
              controls={true}
              className="absolute top-0 left-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;