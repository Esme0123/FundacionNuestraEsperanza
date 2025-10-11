import React from 'react';
import Image from 'next/image';

const Alliances = () => {
   const logos = [
    { src: 'ic_latina.png', url: 'https://redalianzalatina.org/es/home-esp/' },
    { src: 'ic_childhood.png', url: 'https://ccieurope.eu/' }, 
    { src: 'ic_canica.jpeg', url: 'https://canica.org.mx/' },
    { src: 'ic_jude.png', url: 'https://www.stjude.org/es/' },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-black mb-3 text-center font-title">NUESTROS ALIADOS</h2>
        <div className="flex justify-center">
              <div className="bg-rosa-principal w-20 h-2 mb-5"></div>
            </div>
        <div className="flex flex-wrap justify-center items-center gap-x-32 gap-y-8">
          {logos.map((logo, index) => (
            <a 
              key={index} 
              href={logo.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative h-36 w-40 grayscale opacity-100 hover:grayscale-0 hover:opacity-100 transition duration-300"
            >
              <Image
                src={`/IMG/${logo.src}`} 
                alt={`Logo aliado ${index + 1}`}
                layout="fill"
                objectFit="contain"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Alliances;