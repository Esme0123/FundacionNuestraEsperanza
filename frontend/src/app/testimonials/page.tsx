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
        quote: "Brenda es una verdadera guerrera que tocó la campana y venció al cáncer. 💪✨ Su sonrisa es ahora símbolo de esperanza, su historia una inspiración para todos.",
        type: "video",
        embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2656655388011468%2F&show_text=0&width=560&height=560",
        externalLink: "https://www.facebook.com/reel/2656655388011468",
        image: "/IMG/cabello.png",
        age: "Edad"
    },
    {
        name: "Nombre 2",
        quote: "Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis.",
        type: "image",
        image: "/IMG/cabello.png",
        externalLink: "#",
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
];

const Testimonials = () => {
    return (
        <main>
            <Navbar />
            {/* Sección de Título */}
            <section className="bg-celeste-claro py-12 md:py-16">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-black mb-2 font-title">TESTIMONIOS</h1>
                    <div className="flex justify-center">
                        <div className="bg-rosa-principal w-20 h-2"></div>
                    </div>
                </div>
            </section>
            
            {/* Sección de Testimonios */}
            <section id="testimonios" className="bg-rosa-claro py-16 md:py-20">
                <div className="container mx-auto px-6">
                    <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-bold text-black mb-2 text-center font-title">LO QUE DICEN DE NOSOTROS</h2>
                    <div className="flex justify-center">
                        <div className="bg-rosa-principal w-20 h-2 mb-12"></div>
                    </div>
                    {/* Grid responsivo: 1 columna en móvil, 2 en tablet, 3 en desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((item, index) => (
                            <div key={index} data-aos="fade-up" data-aos-delay={100 * index} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group">
                                <a href={item.externalLink} target="_blank" rel="noopener noreferrer" className="block">
                                    {item.type === 'image' ? (
                                        <div className="relative w-full h-64 overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                layout="fill"
                                                objectFit="cover"
                                                className="transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                    ) : (
                                        // Contenedor responsivo para el video
                                        <div className="relative w-full aspect-w-1 aspect-h-1 overflow-hidden">
                                            <iframe
                                                className="absolute top-0 left-0 w-full h-full"
                                                src={item.embedUrl}
                                                title={`Video testimonio de ${item.name}`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    )}
                                </a>
                                <div className="p-6 text-center flex-grow flex flex-col">
                                    <h4 className="text-xl font-bold text-black mb-2 font-title">{item.name}</h4>
                                    <p className="text-gray-700 font-sans text-sm italic mb-4 flex-grow">&quot;{item.quote}&quot;</p>
                                    <p className="text-sm text-gray-500 font-sans mt-auto">{item.age}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Paginación (Visual) */}
                    <div className="flex justify-center mt-16 space-x-1 md:space-x-2">
                        <a href="#" className="px-3 py-2 md:px-4 md:py-2 text-gray-500 hover:text-rosa-principal">{"<"}</a>
                        <a href="#" className="px-3 py-2 md:px-4 md:py-2 text-white bg-rosa-principal rounded-md">1</a>
                        <a href="#" className="px-3 py-2 md:px-4 md:py-2 text-gray-700 hover:bg-gray-200 rounded-md">2</a>
                        <a href="#" className="px-3 py-2 md:px-4 md:py-2 text-gray-700 hover:bg-gray-200 rounded-md">3</a>
                        <a href="#" className="px-3 py-2 md:px-4 md:py-2 text-gray-500 hover:text-rosa-principal">{">"}</a>
                    </div>
                </div>
            </section>
            
            {/* Sección Cómo Ayudar */}
            <section className="bg-azul-marino py-16 md:py-20 text-white text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 font-title">CÓMO AYUDAR</h2>
                    <div className="flex justify-center">
                        <div className="bg-rosa-principal w-20 h-2 mb-10"></div>
                    </div>
                    {/* Grid responsivo: 1 columna en móvil, 2 en pantallas más grandes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white/10 p-8 rounded-lg hover:bg-white/20 transition-colors duration-300">
                            <h3 className="text-2xl md:text-3xl font-bold font-title mb-4">Voluntariado</h3>
                            <p className="mb-6 font-sans">Suma tu tiempo y talento a nuestra causa. Juntos, podemos llevar más sonrisas y esperanza a nuestros niños.</p>
                            <a href="#" className="bg-white text-azul-marino px-7 py-4 rounded-full font-bold hover:bg-amarillo-detalle hover:text-white transition-all duration-300 font-button">
                                SER VOLUNTARIO
                            </a>
                        </div>
                        <div className="bg-white/10 p-8 rounded-lg hover:bg-white/20 transition-colors duration-300">
                            <h3 className="text-2xl md:text-3xl font-bold font-title mb-4">Donaciones</h3>
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

export default Testimonials;