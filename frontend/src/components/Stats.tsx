import React from 'react';
import Image from 'next/image';

const Stats = () => {
  const stats = [
    { number: '100+', text: 'Niños que recibieron ayuda' },
    { number: '100+', text: 'Niños con cáncer' },
    { number: '50+', text: 'Voluntarios' },
  ];

  return (
    <section className="relative py-20">
      <div className="absolute inset-0 z-0">
        <Image
          src="/IMG/cantidad.png" 
          alt="Niños de la fundación"
          layout="fill"
          objectFit="cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-black opacity-0"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-white text-center">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index}>
              <p className="text-5xl font-bold font-title">{stat.number}</p>
              <p className="mt-2 text-lg font-sans">{stat.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;