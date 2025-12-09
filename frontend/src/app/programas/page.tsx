"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Alliances from '@/components/Alliances';
import Contact from '@/components/Contact';
import Subscribe from '@/components/Suscribe';
import HowToHelp from '@/components/HowToHelp';

// 1. Interfaz de Datos
interface Program {
  id: number;
  title: string;
  description: string;
  image: string;
  color: string; // Este es el color que viene del Admin
}

const ITEMS_PER_PAGE = 6; // Paginación de 6 en 6

export default function ProgramsPage() {
    // 2. Estados
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    
    // URL del Backend
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
                console.error("Error de conexión:", error);
            } finally {
                setLoading(false);
            }
        };
        
        loadPrograms();
    }, []);

    // 4. Lógica de Paginación
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentPrograms = programs.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(programs.length / ITEMS_PER_PAGE);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        // Scroll suave al inicio de la lista cuando cambian de página
        document.getElementById('programs-list')?.scrollIntoView({ behavior: 'smooth' });
    };

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
            <section id="programs-list" className="bg-white py-16">
                <div className="container mx-auto px-6">
                    
                    {loading ? (
                        <div className="text-center py-20">
                            <p className="text-xl text-gray-500">Cargando programas...</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                                {currentPrograms.map((program) => (
                                    <div 
                                        key={program.id} 
                                        // AQUI APLICAMOS EL COLOR DEL ADMIN
                                        // Si no trae color, usa blanco por defecto
                                        className={`${program.color || 'bg-white'} rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform duration-300 hover:-translate-y-2 flex flex-col`}
                                    >
                                        <div className="relative h-64 w-full bg-gray-200">
                                            {program.image ? (
                                                <Image 
                                                    src={program.image} 
                                                    alt={program.title} 
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-gray-400">
                                                    Sin Imagen
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-8 flex flex-col flex-grow">
                                            <h3 className="text-2xl font-bold font-title mb-4 text-azul-marino">
                                                {program.title}
                                            </h3>
                                            
                                            {/* Descripción */}
                                            <div className="mb-6 font-sans text-gray-800 flex-grow text-sm leading-relaxed">
                                                {program.description && (
                                                    <div dangerouslySetInnerHTML={{ __html: program.description }} />
                                                )}
                                            </div>

                                            <button className="self-start bg-white/80 text-azul-marino px-6 py-2 rounded-full font-bold hover:bg-azul-marino hover:text-white transition duration-300 font-button border-2 border-transparent hover:border-white shadow-sm">
                                                CONOCER MÁS
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Controles de Paginación */}
                            {totalPages > 1 && (
                                <div className="flex justify-center mt-12 space-x-2">
                                    <button
                                        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                                        disabled={currentPage === 1}
                                        className={`px-4 py-2 rounded-md font-bold ${
                                            currentPage === 1 
                                            ? 'text-gray-300 cursor-not-allowed' 
                                            : 'text-azul-marino hover:bg-gray-100'
                                        }`}
                                    >
                                        Anterior
                                    </button>
                                    
                                    {/* Números de página */}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                        <button
                                            key={number}
                                            onClick={() => handlePageChange(number)}
                                            className={`px-4 py-2 rounded-md font-bold transition-colors ${
                                                currentPage === number
                                                    ? 'bg-rosa-principal text-white'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            {number}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className={`px-4 py-2 rounded-md font-bold ${
                                            currentPage === totalPages 
                                            ? 'text-gray-300 cursor-not-allowed' 
                                            : 'text-azul-marino hover:bg-gray-100'
                                        }`}
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
            <HowToHelp />
            <Alliances/>
            <Subscribe />
            <Contact />
            <Footer />
        </main>
    );
};