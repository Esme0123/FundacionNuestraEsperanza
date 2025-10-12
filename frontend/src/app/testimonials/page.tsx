"use client";
import React from 'react';
import Image from 'next/image';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Alliances from '@/components/Alliances';

const testimonials = [
  {
      name: "Ana",
      type: "image",
      quote: "Gracias a la fundación, nunca estuve sola. Encontré una familia, fuerza y muchas razones para seguir adelante.",
      image: "/IMG/cabello.png",
      externalLink: "#", 
      age: "12"
    },
    {
      name: "Brenda",
      quote:" Brenda es una verdadera guerrera que tocó la campana y venció al cáncer. 💪✨ Su sonrisa es ahora símbolo de esperanza, su historia una inspiración para todos. ",
      type: "video",
      // URL de incrustación (para el iframe)
      embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2656655388011468%2F&show_text=0&width=560&height=560",
      // URL externa (para la redirección)
      externalLink: "https://www.facebook.com/reel/2656655388011468", 
      image: "/IMG/cabello.png", // Se mantiene por si se cambia a imagen
      age: "Edad" 
    },
    {
      name: "Nombre 2",
      quote: "Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis.",
      type: "image", // Añadido para consistencia
      image: "/IMG/cabello.png",
      externalLink: "#", // Enlace vacío para imágenes
      age: "Edad"
    },
    {
      name: "Nombre 3",
      quote: "Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis.",
      type: "image",
      image: "/IMG/cabello.png", 
      externalLink: "#",
      age: "Edad"
    },
    {
      name: "Nombre 4",
      quote: "Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis.",
      type: "image",
      image: "/IMG/cabello.png", 
      externalLink: "#",
      age: "Edad"
    },
    {
      name: "Nombre 5",
      quote: "Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis.",
      type: "image",
      image: "/IMG/cabello.png", 
      externalLink: "#",
      age: "Edad"
    }
]

const Testimonials = () => {
  return (
    <main>
        <Navbar />
        {/* Sección de Título */}
      <section className="bg-celeste-claro py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-black mb-2 font-title">TESTIMONIOS</h1>
          <div className="flex justify-center">
            <div className="bg-rosa-principal w-20 h-2"></div>
          </div>
        </div>
      </section>
    {/* seccion de testimonios */}
    <section id="testimonios" className="bg-rosa-claro py-16"> 
      <div className="container mx-auto px-6">
        <h2 data-aos="fade-up" className="text-4xl font-bold text-black mb-2 text-center font-title">LO QUE DICEN DE NOSOTROS</h2>
        <div className="flex justify-center">
              <div className="bg-rosa-principal w-20 h-2 mb-12"></div>
            </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {

                const CardContent = (
                    <>
                        <div className="relative w-full h-0 pb-[100%] overflow-hidden"> 
                            {testimonial.type === 'video' ? (
                                <iframe
                                    src={testimonial.embedUrl} 
                                    width="100%"
                                    height="100%"
                                    style={{ border: "none", overflow: "hidden" }}
                                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                    allowFullScreen={true}
                                    title={testimonial.name}
                                    className="absolute inset-0 w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
                                    sandbox="allow-scripts allow-same-origin allow-presentation" 
                                />
                            ) : (
                                <Image
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    layout="fill"
                                    objectFit="cover" 
                                    className="absolute inset-0 transition-transform duration-500 ease-in-out group-hover:scale-110"
                                />
                            )}
                        </div>
                        {/* superposición para el texto */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-500 ease-in-out flex flex-col justify-center items-center p-6">
                            <div className="text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                <h4 className="text-2xl font-bold mb-2 font-title">{testimonial.name}</h4>
                                <p className="font-sans text-gray-200 italic">{testimonial.quote}</p>
                                <p className="text-sm font-sans mt-4 opacity-80">{testimonial.age}</p>
                            </div>
                        </div>
                    </>
                );

                // 3. LÓGICA DE REDIRECCIÓN: Envolver en <a> si hay externalLink válido.
                if (testimonial.externalLink && testimonial.externalLink !== '#') {
                    return (
                        <a 
                            key={index} 
                            href={testimonial.externalLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            data-aos="zoom-in" 
                            data-aos-delay={100 * index} 
                            // Añadir 'block' para que el enlace ocupe todo el espacio de la cuadrícula
                            className="group bg-white shadow-lg overflow-hidden relative cursor-pointer block" 
                        >
                            {CardContent}
                        </a>
                    );
                }
                return (
                    <div 
                        key={index} 
                        data-aos="zoom-in" 
                        data-aos-delay={100 * index} 
                        className="group bg-white shadow-lg overflow-hidden relative cursor-pointer"
                    >
                        {CardContent}
                    </div>
                );
            })}
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
    <section className="bg-azul-marino py-20 text-white text-center">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-4 font-title">CÓMO AYUDAR</h2>
            <div className="flex justify-center">
              <div className="bg-rosa-principal w-20 h-2 mb-10"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                <div className="bg-white/10 p-8 rounded-lg hover:bg-white/20 transition-colors duration-300">
                    <h3 className="text-3xl font-bold font-title mb-4">Voluntariado</h3>
                    <p className="mb-6 font-sans">Suma tu tiempo y talento a nuestra causa. Juntos, podemos llevar más sonrisas y esperanza a nuestros niños.</p>
                    <a href="#" className="bg-white text-azul-marino px-7 py-4 rounded-full font-bold hover:bg-amarillo-detalle hover:text-white transition-all duration-300 font-button">
                        SER VOLUNTARIO
                    </a>
                </div>
                <div className="bg-white/10 p-8 rounded-lg hover:bg-white/20 transition-colors duration-300">
                    <h3 className="text-3xl font-bold font-title mb-4">Donaciones</h3>
                    <p className="mb-6 font-sans">Tu aporte económico nos permite continuar brindando alojamiento, alimentación y apoyo integral a más familias.</p>
                    <a href="#" className="bg-rosa-principal text-white px-7 py-4 rounded-full font-bold hover:bg-amarillo-detalle transition-all duration-300 font-button">
                        DONAR AHORA
                    </a>
                </div>
            </div>
        </div>
      </section>

      <Alliances />
      <Footer />

    </main>
  );
};

export default Testimonials;