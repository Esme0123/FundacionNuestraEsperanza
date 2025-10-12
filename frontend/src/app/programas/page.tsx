"use client";
import React from 'react';
import Image from 'next/image';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Alliances from '@/components/Alliances';

const allPrograms = [
    {
      image:"/IMG/alojamiento.jpg",
      title: "Alojamiento",
      description: "Nuestra casita albergue 'UTAJA' (Mi Casa) ofrece un hogar seguro y cálido para 12 familias, asegurando que nadie luche solo.",
    },
    {
      image:"/IMG/almuerzo.png",
      title: "Alimentación y Nutrición",
      description: "Proveemos almuerzos nutritivos y gratuitos para cada niño y su acompañante, garantizando su bienestar durante el tratamiento.",
    },
    {
      image:"/IMG/colaboracion.jpg",
      title: "Apoyo Integral",
      description: "Ofrecemos talleres educativos, apoyo psicológico y asistencia social para fortalecer a las familias en cada paso del camino.",
    },
    {
      image:"/IMG/transporte.jpg", 
      title: "Transporte Seguro",
      description: "Facilitamos el transporte desde y hacia el hospital para asegurar que los niños no pierdan sus citas médicas y tratamientos vitales.",
    },
    {
      image:"/IMG/recreacion.jpg", 
      title: "Espacios de Recreación",
      description: "Creamos ambientes de juego y esparcimiento para que los niños puedan seguir disfrutando de su infancia a pesar de la enfermedad.",
    },
    {
      image:"/IMG/educacion.jpg", 
      title: "Soporte Educativo",
      description: "Brindamos apoyo escolar y materiales para que los niños no se atrasen en sus estudios durante su estancia con nosotros.",
    }
];

const ProgramsPage = () => {
  return (
    <main>
      <Navbar />

      {/* Sección de Título */}
      <section className="bg-celeste-claro py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-black mb-2 font-title">PROGRAMAS / NUESTRO TRABAJO</h1>
          <div className="flex justify-center">
            <div className="bg-rosa-principal w-20 h-2"></div>
          </div>
        </div>
      </section>

      {/* Sección de Programas */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
            {/* Barra de búsqueda (Visual) */}
            <div className="mb-12 flex justify-center">
                <div className="relative w-full max-w-lg">
                    <input 
                        type="text" 
                        placeholder="Buscar programa..." 
                        className="w-full px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-rosa-principal"
                    />
                    <button className="absolute right-0 top-0 mt-2 mr-2 bg-rosa-principal text-white px-6 py-2 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300">
                        Buscar
                    </button>
                </div>
            </div>

            {/* Grid de Programas */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allPrograms.map((program, index) => (
                    <div key={index} data-aos="fade-up" data-aos-delay={100 * index} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group">
                        <div className="relative w-full h-56 overflow-hidden">
                            <Image
                                src={program.image}
                                alt={`Imagen de ${program.title}`}
                                layout="fill"
                                objectFit="cover"
                                className="transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <h4 className="text-2xl font-bold text-black mb-3 font-title">{program.title}</h4>
                            <p className="text-gray-700 font-sans mb-6 flex-grow">{program.description}</p>
                            <a href="#" className="bg-turquesa-secundario text-azul-marino px-6 py-3 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300 font-button self-start">
                                VER DETALLE
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Paginación (Visual) */}
            <div className="flex justify-center mt-16 space-x-2">
                <a href="#" className="px-4 py-2 text-gray-500 hover:text-rosa-principal">{"<"}</a>
                <a href="#" className="px-4 py-2 text-white bg-rosa-principal rounded-md">1</a>
                <a href="#" className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md">2</a>
                <a href="#" className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md">3</a>
                <a href="#" className="px-4 py-2 text-gray-500 hover:text-rosa-principal">{">"}</a>
            </div>
        </div>
      </section>

      {/* Sección Cómo Ayudar */}
      <section className="bg-azul-marino py-20 text-white text-center">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-4 font-title">CÓMO AYUDAR</h2>
            <div className="flex justify-center">
              <div className="bg-rosa-principal w-20 h-2 mb-10"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                <div className="bg-white/10 p-8 rounded-lg">
                    <h3 className="text-3xl font-bold font-title mb-4">Voluntariado</h3>
                    <p className="mb-6 font-sans">Suma tu tiempo y talento a nuestra causa. Juntos, podemos llevar más sonrisas y esperanza a nuestros niños.</p>
                    <a href="#" className="bg-white text-azul-marino px-7 py-4 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300 font-button">
                        SER VOLUNTARIO
                    </a>
                </div>
                <div className="bg-white/10 p-8 rounded-lg">
                    <h3 className="text-3xl font-bold font-title mb-4">Donaciones</h3>
                    <p className="mb-6 font-sans">Tu aporte económico nos permite continuar brindando alojamiento, alimentación y apoyo integral a más familias.</p>
                    <a href="#" className="bg-rosa-principal text-white px-7 py-4 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300 font-button">
                        DONAR AHORA
                    </a>
                </div>
            </div>
        </div>
      </section>
     <Alliances/>
      <Footer />
    </main>
  );
};

export default ProgramsPage;