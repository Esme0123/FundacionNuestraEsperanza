import React from 'react';
import Image from 'next/image';
const Navbar = () => {
  const navLinks = ["Inicio", "Quiénes Somos", "Programas","Cómo Ayudar", "Testimonios", "Noticias", "Contacto"];
  return (
    <header className="bg-azul-marino shadow-md sticky top-0 z-50 font-sans text-base">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Image
                  src="/IMG/Logo.jpg" 
                  alt="Fundación Nuestra Esperanza"
                  width={200}
                  height={60}
          />  
        </div>
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link} href="#" className="text-white hover:text-rosa-principal transition duration-300">
              {link}
            </a>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-white border border-white rounded-full px-6 py-2 hover:bg-white hover:text-azul-marino transition duration-300 font-button">
            Login
          </a>
          <a href="#" className="bg-rosa-principal text-white px-6 py-2 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300 font-button">
            DONAR
          </a>
          <div className="text-white pl-2">
            <a href="#" className="font-bold">ES</a> / <a href="#" className="text-gray-300">EN</a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;