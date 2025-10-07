import React from 'react';
import Image from 'next/image';

const Alliances = () => {
  const logos = ['canvas.png', 'generosy.png', 'interstate.png', 'invest.png', 'meadow.png'];/*reemplazar con logos*/

  return (
    <section className="bg-beige-claro py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-black mb-12 text-center font-title">NUESTROS ALIADOS</h2>
        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8">
          {logos.map((logo, index) => (
            <div key={index} className="relative h-16 w-40 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300">
              <Image
                src={`/IMG/${logo}`} 
                alt={`Logo aliado ${index + 1}`}
                layout="fill"
                objectFit="contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Alliances;