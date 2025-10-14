"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Quiénes Somos", path: "/quienes-somos" },
    { name: "Programas", path: "/programas" },
    { name: "Cómo Ayudar", path: "/como-ayudar" },
    { name: "Testimonios", path: "/testimonials" },
    { name: "Noticias", path: "/news" },
    { name: "Contacto", path: "/#contacto" },
  ];

  return (
    <header className="bg-azul-marino shadow-md sticky top-0 z-50 font-sans text-base">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/IMG/Logo.jpg"
            alt="Fundación Nuestra Esperanza"
            width={150} // Reducido para mejor ajuste en móviles
            height={45}
            className="cursor-pointer"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-7">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.path} className="text-white hover:text-rosa-principal transition duration-300">
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center space-x-4">
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

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-azul-marino">
          <div className="flex flex-col items-center py-4 space-y-4">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.path} className="text-white hover:text-rosa-principal transition duration-300" onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
            <a href="#" className="text-white border border-white rounded-full px-6 py-2 hover:bg-white hover:text-azul-marino transition duration-300 font-button">
              Login
            </a>
            <a href="#" className="bg-rosa-principal text-white px-6 py-2 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300 font-button">
              DONAR
            </a>
            <div className="text-white">
              <a href="#" className="font-bold">ES</a> / <a href="#" className="text-gray-300">EN</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;