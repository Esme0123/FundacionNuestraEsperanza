"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Alliances from '@/components/Alliances';
import Contact from '@/components/Contact'; // Asegúrate de importar esto si lo usas
import Subscribe from '@/components/Suscribe'; // Asegúrate de importar esto

// 1. Definimos la estructura de datos (Typescript)
interface Program {
  id: number;
  title: string;
  description: string;
  image: string;
  color?: string;
}

export default function ProgramsPage() {
    // 2. Estado para los programas
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);
    
    // URL del Backend (Asegúrate de que este puerto sea el correcto)
    const API_URL = 'http://127.0.0.1:8000/api';

    // 3. Conexión al Backend
    useEffect(() => {
        const loadPrograms = async () => {
            try {
                const response = await fetch(`${API_URL}/programs`);
                if (response.ok) {
                    const data = await response.json();
                    setPrograms(data);
                } else {
                    console.error("Error al obtener programas");
                }
            } catch (error) {
                console.error("Error de conexión con API:", error);
            } finally {
                setLoading(false);
            }
        };
        
        loadPrograms();
    }, []);

    return (
        <main>
            <Navbar />
            
            {/* Header */}
            <section className="bg-celeste-claro py-20 text-center">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-azul-marino font-title mb-6">
                        Nuestros Programas
                    </h1>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto font-sans">
                        Proyectos diseñados para brindar esperanza y soporte integral.
                    </p>
                </div>
            </section>

            {/* Lista de Programas */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-6">
                    
                    {loading ? (
                        <div className="text-center py-20">
                            <p className="text-xl text-gray-500">Cargando programas...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            {programs.map((program) => (
                                <div 
                                    key={program.id} 
                                    className="bg-beige-claro rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
                                >
                                    <div className="relative h-64 w-full bg-gray-200">
                                        {program.image ? (
                                            <Image 
                                                src={program.image} 
                                                alt={program.title} 
                                                fill
                                                className="object-cover"
                                                // Manejo de errores de imagen básico
                                                onError={(e) => {
                                                    // Opcional: poner una imagen por defecto si falla
                                                    e.currentTarget.style.display = 'none';
                                                }}
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-400">
                                                Sin Imagen
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow">
                                        <h3 className="text-2xl md:text-3xl font-bold font-title mb-4 text-azul-marino">
                                            {program.title}
                                        </h3>
                                        
                                        {/* Renderizado de Descripción (HTML o Texto) */}
                                        <div className="mb-6 font-sans text-gray-700 flex-grow prose">
                                            {program.description && (
                                                <div dangerouslySetInnerHTML={{ __html: program.description }} />
                                            )}
                                        </div>

                                        <button className="self-start bg-rosa-principal text-white px-7 py-3 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300 font-button">
                                            APOYAR ESTE PROGRAMA
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Sección Voluntariado/Donaciones Estática */}
                    <div className="mt-20 bg-azul-marino rounded-2xl p-10 md:p-16 text-white text-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <div className="bg-white/10 p-8 rounded-lg">
                                <h3 className="text-2xl font-bold font-title mb-4">Voluntariado</h3>
                                <p className="mb-6 font-sans">Suma tu tiempo y talento.</p>
                                <button className="bg-white text-azul-marino px-7 py-4 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300 font-button">
                                    SER VOLUNTARIO
                                </button>
                            </div>
                            <div className="bg-white/10 p-8 rounded-lg">
                                <h3 className="text-2xl font-bold font-title mb-4">Donaciones</h3>
                                <p className="mb-6 font-sans">Tu aporte hace la diferencia.</p>
                                <button className="bg-rosa-principal text-white px-7 py-4 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300 font-button">
                                    DONAR AHORA
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <Alliances/>
            <Subscribe />
            <Contact />
            <Footer />
        </main>
    );
};