"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Alliances from '@/components/Alliances';
import { fetchTestimonials } from '@/services/dataService'; 

// 1. Definir la interfaz de la estructura de datos que esperamos de la API
interface TestimonialItem {
    id: number;
    name: string;
    quote: string;
    type: 'image' | 'video';
    image: string | null; // URL de la imagen (completa desde Laravel)
    embedUrl: string | null; // URL de embed para videos (ej. YouTube, Facebook)
    externalLink: string;
    age: string;
}

const Testimonials = () => {
    // 2. Estados para almacenar los datos y el estado de carga
    const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
    const [loading, setLoading] = useState(true);

    // 3. Efecto para cargar los datos del API
    useEffect(() => {
        const loadTestimonials = async () => {
            try {
                setLoading(true);
                // Llama al servicio para obtener los datos
                const data = await fetchTestimonials(); 
                setTestimonials(data); // Almacena los testimonios cargados
            } catch (error) {
                console.error("Fallo al cargar testimonios desde la API:", error);
                setTestimonials([]); // Deja la lista vacía si hay un error
            } finally {
                setLoading(false);
            }
        };
        loadTestimonials();
    }, []); 

    // 4. Mostrar estado de carga
    if (loading) {
        return (
            <main>
                <Navbar />
                <section className="py-16 md:py-20 bg-gray-50 text-center min-h-screen">
                    <h2 className="text-3xl font-bold">Cargando Testimonios...</h2>
                    <div className="flex justify-center mt-5"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-rosa-principal"></div></div>
                </section>
                <Footer />
            </main>
        );
    }
    
    // 5. Mostrar si no hay datos
    if (testimonials.length === 0 && !loading) {
        return (
            <main>
                <Navbar />
                <section className="py-16 md:py-20 bg-gray-50 text-center min-h-screen">
                    <h2 className="text-3xl font-bold text-red-500">No se encontraron testimonios.</h2>
                    <p>Revisa tu servidor de Laravel (`/api/testimonials`) o si hay datos creados.</p>
                </section>
                <Footer />
            </main>
        );
    }

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
                    <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-bold text-black mb-2 text-center font-title">LO QUE VIVIERON CON NOSOTROS</h2>
                    <div className="flex justify-center">
                        <div className="bg-rosa-principal w-20 h-2 mb-12"></div>
                    </div>
                    {/* Grid responsivo */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* 6. Mapear sobre el estado 'testimonials' */}
                        {testimonials.map((item, index) => (
                            <div key={item.id || index} data-aos="fade-up" data-aos-delay={100 * index} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl">
                                <a href={item.externalLink} target="_blank" rel="noopener noreferrer" className="block h-64">
                                    {item.type === 'image' && item.image ? (
                                        <div className="relative w-full h-full overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                layout="fill"
                                                objectFit="cover"
                                                unoptimized={true} 
                                                className="transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                    ) : (item.type === 'video' && item.embedUrl ? (
                                        // Contenedor para el video embed
                                        <div className="relative w-full h-full overflow-hidden"> 
                                            <iframe
                                                className="absolute top-0 left-0 w-full h-full"
                                                src={item.embedUrl}
                                                title={`Video testimonio de ${item.name}`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    ) : (
                                        // Placeholder si no hay imagen ni video
                                        <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
                                            Contenido no disponible
                                        </div>
                                    ))}
                                </a>
                                <div className="p-6 text-center flex-grow flex flex-col">
                                    <h4 className="text-xl font-bold text-black mb-2 font-title">{item.name}</h4>
                                    <p className="text-gray-700 font-sans text-sm italic mb-4 flex-grow">&quot;{item.quote}&quot;</p>
                                    <p className="text-sm text-gray-500 font-sans mt-auto">{item.age}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Paginación visual estática (mantenida por la estructura original) */}
                    <div className="flex justify-center mt-16 space-x-1 md:space-x-2">
                         <a href="#" className="px-3 py-2 md:px-4 md:py-2 text-gray-500 hover:text-rosa-principal">{"<"}</a>
                         <a href="#" className="px-3 py-2 md:px-4 md:py-2 text-white bg-rosa-principal rounded-md">1</a>
                         <a href="#" className="px-3 py-2 md:px-4 md:py-2 text-gray-700 hover:bg-gray-200 rounded-md">2</a>
                         <a href="#" className="px-3 py-2 md:px-4 md:py-2 text-gray-700 hover:bg-gray-200 rounded-md">3</a>
                         <a href="#" className="px-3 py-2 md:px-4 md:py-2 text-gray-500 hover:text-rosa-principal">{">"}</a>
                    </div>
                    
                </div>
            </section>
            
            {/* Sección Cómo Ayudar (se mantiene igual) */}
            <section className="bg-azul-marino py-16 md:py-20 text-white text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 font-title">CÓMO AYUDAR</h2>
                    <div className="flex justify-center">
                        <div className="bg-rosa-principal w-20 h-2 mb-10"></div>
                    </div>
                    {/* Grid responsivo */}
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