import React from 'react';
import Image from 'next/image';

const Programs = () => {
  const programs = [
    {
      image:"/IMG/alojamiento.jpg",
      title: "Alojamiento",
      description: "Nuestra fundación cuenta con una casita albergue denominada UTAJA que significa Mi Casa. La misma tiene una capacidad de 12 camas y está situada en la calle Francisco de Miranda 1856 (Miraflores) La Paz, Bolivia. ",
      color: "bg-celeste-fondo"
    },
    {
      image:"/IMG/almuerzo.png",
      title: "Almuerzos",
      description: "La Fundación otorga alimentación gratuita para el niño y su acompañante durante su estadia en nuestro albergue. Durante casi 7 años se otorgaron 10,200 almuerzo para los pápas de niños hospitalizados.",
      color: "bg-verde-lima"
    },
    {
      image:"/IMG/colaboracion.jpg",
      title: "Colaboración",
      description: "Tambien nos enorgullece ofrecer programas diseñados para respaldar integralmente a las familias afectadas por el cáncer infantil, ofeciendo talleres educativos, apoyo psicológico, y trabajos sociales.",
      color: "bg-amarillo-detalle"
    }
  ];

  return (
    <section id="programas" className="bg-celeste-claro py-16"> 
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-black mb-2 text-center font-title">PROGRAMAS</h2>
        <div className="flex justify-center">
              <div className="bg-rosa-principal w-20 h-2 mb-5"></div>
            </div>
        <h3 className="text-2xl font-sans text-gray-700 text-center mb-12">Qué hacemos</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              <div className={`w-full h-3 ${program.color}`}></div>
              <div className={`relative w-full h-0 pb-[66.66%] overflow-hidden`}>
                <Image
                  src={program.image}
                  alt={`Imagen de ${program.title}`}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h4 className="text-2xl font-bold text-black mb-4 font-title">{program.title}</h4>
                <p className="text-black font-sans mb-6 flex-grow">{program.description}</p>
                <a href="#" className="bg-rosa-principal text-white px-6 py-3 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300 font-button self-start">
                  CONOCER MÁS
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;