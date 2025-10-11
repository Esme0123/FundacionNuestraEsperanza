import React from 'react';
import Image from 'next/image';
const AboutUs = () => {
  return (
    <section className="mx-auto px-2 py-16 ">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center p-10">
        <div data-aos="fade-right">
          <h2 className="text-5xl font-bold text-black mb-4 font-title">QUIÉNES SOMOS</h2>
          <div className="bg-rosa-principal w-20 h-2 mb-5"></div>
          <h4 className='text-2xl font-sans text-black'>Misión, Visión y Propósito</h4>
          <p className="text-black font-sans pt-5 pb-5 ">
            En la Fundación Nuestra Esperanza trabajamos de corazón con el objetivo fundamental de mejorar la calidad de vida y aumentar las probabilidades de sobrevivir de niños, niñas y adolecentes de escasos recursos que padecen de Cáncer.</p>
          <p className='mb-6'>Desde el año 2017 hemos implementado un programa de intervención integral gratuito. Trabajamos brindando a las familias alojamiento, alimentación, apoyo psicosocial, espacios de recreación y otro tipo de ayudas complementarias como ser viveres, y material escolar que permitan hacer su día a día más llevadero y evitar que nuestros niños abandonen el tratamiento.
          </p>
          <a href="/quienes-somos"  className="bg-turquesa-secundario px-7 py-5 rounded-full font-bold hover:bg-blue-200 text-azul-marino transition duration-300 font-button">
            CONOCER MÁS
          </a>
        </div>
        <div data-aos="fade-left" className="relative w-full h-96 rounded-lg shadow-lg overflow-hidden">
          <Image 
            src="/IMG/Equipo1.jpg" 
            alt="Voluntarios de la fundación ayudando" 
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;