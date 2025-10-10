import React from 'react';
import Image from 'next/image';

const Programs = () => {
  const programs = [
    {
      img:"/IMG/alojamiento.jpg",
      title: "Alojamiento",
      description: "Nuestra fundación cuenta con una casita albergue denominada UTAJA que significa Mi Casa. La misma tiene una capacidad de 12 camas y está situada en la calle Francisco de Miranda 1856 (Miraflores) La Paz, Bolivia. "
    },
    {
      img:"/IMG/almuerzo.png",
      title: "Almuerzos",
      description: "La Fundación otorga alimentación gratuita para el niño y su acompañante durante su estadia en nuestro albergue. Durante casi 7 años se otorgaron 10,200 almuerzo para los pápas de niños hospitalizados."
    },
    {
      img:"/IMG/colaboracion.jpg",
      title: "Colaboración",
      description: "Tambien nos enorgullece ofrecer programas diseñados para respaldar integralmente a las familias afectadas por el cáncer infantil, ofeciendo talleres educativos, apoyo psicológico, y trabajos sociales."
    }
  ];

  return (
    <section className=" mx-auto px-6 py-16 bg-celeste-claro">
      <h2 className="text-5xl font-bold text-black mb-8 text-center font-title ">PROGRAMAS</h2>
      <div className="flex justify-center">
        <div className="bg-rosa-principal w-20 h-2 mb-5"></div>
      </div>
      <h3 className="text-2xl font-sans text-black text-center mb-12">Qué hacemos</h3>
      <div className="grid md:grid-cols-3 gap-8 ml-40 mr-40">
        {programs.map((program, index) => (
          <div key={index} className="bg-verde-lima p-8 rounded-lg shadow-lg text-left">
            <div className="mb-6 w-auto">
              <Image 
                src={program.img}
                alt={`Imagen de ${program.title}`}
                width={600} 
                height={200}
              />
            </div>
            <h4 className="text-2xl font-bold text-black mb-4 font-title">{program.title}</h4>
            <p className="text-black font-sans mb-6">{program.description}</p>
            <a href="#" className="bg-turquesa-secundario text-white px-6 py-3 rounded-full font-bold hover:bg-opacity-90 transition duration-300 font-button">
              CONOCER MÁS
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Programs;