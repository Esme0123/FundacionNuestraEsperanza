import React from 'react';

const Programs = () => {
  const programs = [
    {
      title: "Apoyo Emocional",
      description: "The long barrow was built on land previously inhabited in the Mesolithic period."
    },
    {
      title: "Alojamiento",
      description: "Maxwell's equations-the foundation of classical electromagnetism- describe light as a wave that moγής with a characteristic velocity."
    },
    {
      title: "Alimentación y transporte",
      description: "Physiological respiration involves the mechanisms that ensure that the composition of the functional residual capacity is kept constant."
    }
  ];

  return (
    <section className="container mx-auto px-6 py-16 bg-celeste-claro">
      <h2 className="text-4xl font-bold text-black mb-2 text-center font-title">PROGRAMAS</h2>
      <h3 className="text-2xl font-sans text-black text-center mb-12">Qué hacemos</h3>
      <div className="grid md:grid-cols-3 gap-8">
        {programs.map((program, index) => (
          <div key={index} className="bg-verde-lima p-8 rounded-lg shadow-lg text-center">
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