"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; 
import AboutUs from "@/components/AboutUs";
import Suscribe from "@/components/Suscribe";
import Quotes from '@/components/Quotes';

const teamMembers = [
  { name: 'Nombre Apellido', role: 'Cargo', image: '/IMG/team-1.jpg' },
  { name: 'Nombre1 Apellido1', role: 'Cargo', image: '/IMG/team-2.jpg' },
  { name: 'Nombre2 Apellido2', role: 'Cargo', image: '/IMG/team-3.jpg' },
  { name: 'Nombre3 Apellido3', role: 'Cargo', image: '/IMG/team-4.jpg' },
  { name: 'Nombre4 Apellido4', role: 'Cargo', image: '/IMG/team-5.jpg' },
  { name: 'Nombre5 Apellido5', role: 'Cargo', image: '/IMG/team-6.jpg' },
];

const AboutPage = () => {
    const [selectedMember, setSelectedMember] = useState(teamMembers[0]);
  return (
    <main>
      <Navbar />
      <section className="relative h-80 flex items-center justify-center text-white">
        <Image src="/IMG/Equipo.jpg" alt="Fondo Quiénes Somos" layout="fill" objectFit="cover" className="-z-10" />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="text-6xl font-bold z-10 font-title">Quiénes Somos</h1>
      </section>
      <AboutUs />

      {/* Nuestra Historia Section */}
      <section className="relative py-24 text-white text-center">
        <Image src="/IMG/historia.jpg" alt="Nuestra Historia" layout="fill" objectFit="cover" className="-z-10" />
        <div className="absolute inset-0 bg-azul-marino opacity-70"></div>
        <div className="relative container mx-auto px-6 max-w-3xl">
            <h2 className="text-4xl font-bold text-white mb-4 font-title">Nuestra Historia</h2>
            <div className="flex justify-center">
              <div className="bg-rosa-principal w-20 h-2 mb-5"></div>
            </div>
            <p className="text-gray-400 mb-6 font-sans">
              Desde 2017, la Casita Utaja brinda un hogar de esperanza para niños con cáncer y sus familias que llegan desde distintas regiones del país. Gracias al apoyo solidario de muchas personas, hemos crecido durante más de ocho años ofreciendo un espacio cálido, humano y lleno de amor.
            </p>
            <p className="text-gray-400 mb-6 font-sans">
              En 2024, con el financiamiento de CCI y SIOP mediante el proyecto Home Away From Home, logramos adquirir nuestra propia casa, ampliando la capacidad del albergue y mejorando las condiciones para nuestras familias.
            </p>
        </div>
      </section>

      {/* Misión y Visión Section */}
      <section className="bg-beige-claro py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-xl">
            <Image src="/IMG/mision-vision.jpg" alt="Niños de la fundación" layout="fill" objectFit="cover" />
          </div>
          <div className="space-y-8">
            <div className="bg-verde-lima p-6 rounded-lg shadow-md">
              <h3 className="text-3xl font-bold text-azul-marino mb-3 font-title">Misión</h3>
              <p className="font-sans text-gray-700">Apoyar al niño, niña y adolescente con cáncer a través de programas de atención integral con fin de mejorar su calidad de vida.</p>
            </div>
            <div className="bg-verde-lima p-6 rounded-lg shadow-md">
              <h3 className="text-3xl font-bold text-azul-marino mb-3 font-title">Visión</h3>
              <p className="font-sans text-gray-700">Ser una organizacion sin fines de lucro con un alto nivel de sensibilidad y responsabilidad social, comprometida a luchar por mejorar la calidad de vida del niño, niña y adolescentes con cáncer y a sus familias. </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestro Equipo Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-black mb-12 text-center font-title">Nuestro Equipo</h2>
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <div className="relative w-full h-0 pb-[66.66%] rounded-lg overflow-hidden shadow-xl mb-4">
              <Image src={selectedMember.image} alt={selectedMember.name} layout="fill" objectFit="cover" />
            </div>
            <h3 className="text-3xl font-bold font-title">{selectedMember.name}</h3>
            <p className="text-xl text-rosa-principal font-sans">{selectedMember.role}</p>
          </div>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                onClick={() => setSelectedMember(member)}
                className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all duration-300 ${selectedMember.name === member.name ? 'bg-celeste-claro shadow-md' : 'hover:bg-gray-100'}`}
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image src={member.image} alt={member.name} layout="fill" objectFit="cover" />
                </div>
                <div>
                  <h4 className="font-bold font-title">{member.name}</h4>
                  <p className="font-sans text-sm text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Quotes />
      <Suscribe />
      <Footer />
    </main>
  );
};

export default AboutPage;