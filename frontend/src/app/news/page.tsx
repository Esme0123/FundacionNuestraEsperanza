"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Alliances from '@/components/Alliances';

// 1. Interfaz exacta de lo que devuelve Laravel
interface NewsItem {
    id: number;
    title: string;
    content: string; // Laravel devuelve 'content', no 'description'
    image: string | null;
    date: string;
    // Como tu BD no tiene categorías, lo manejaremos manual
}

const CARDS_PER_PAGE = 6; // Aumenté a 6 para que se vea mejor la grilla

export default function NewsPage() {
    // Estados
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    // URL del Backend
    const API_URL = 'http://127.0.0.1:8000/api';

    // 2. Cargar datos del Backend
    useEffect(() => {
        const loadNews = async () => {
            try {
                const response = await fetch(`${API_URL}/news`);
                if (response.ok) {
                    const data = await response.json();
                    setNews(data);
                } else {
                    console.error("Error al obtener noticias");
                }
            } catch (error) {
                console.error("Error de conexión:", error);
            } finally {
                setLoading(false);
            }
        };

        loadNews();
    }, []);

    // 3. Lógica de Paginación
    const indexOfLastCard = currentPage * CARDS_PER_PAGE;
    const indexOfFirstCard = indexOfLastCard - CARDS_PER_PAGE;
    const currentNews = news.slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(news.length / CARDS_PER_PAGE);

    return (
        <main>
            <Navbar />
            
            {/* Header */}
            <section className="bg-beige-claro py-20 text-center">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-azul-marino font-title mb-6">
                        Noticias y Eventos
                    </h1>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto font-sans">
                        Mantente al día con nuestras actividades y logros.
                    </p>
                </div>
            </section>

            {/* Lista de Noticias */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-6">
                    
                    {loading ? (
                        <div className="text-center py-20 text-gray-500">Cargando noticias...</div>
                    ) : news.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">No hay noticias publicadas aún.</div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                                {currentNews.map((item) => (
                                    <div 
                                        key={item.id} 
                                        className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
                                    >
                                        {/* Imagen */}
                                        <div className="relative h-56 w-full bg-gray-100">
                                            {item.image ? (
                                                <Image 
                                                    src={item.image} 
                                                    alt={item.title} 
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-gray-400">
                                                    Sin Imagen
                                                </div>
                                            )}
                                            <div className="absolute top-4 right-4 bg-rosa-principal text-white text-xs font-bold px-3 py-1 rounded-full">
                                                {item.date || 'Reciente'}
                                            </div>
                                        </div>

                                        {/* Contenido */}
                                        <div className="p-6 flex flex-col flex-grow">
                                            <span className="text-turquesa-secundario text-sm font-bold mb-2 uppercase">
                                                Noticias
                                            </span>
                                            <h3 className="text-xl font-bold font-title mb-3 text-azul-marino line-clamp-2">
                                                {item.title}
                                            </h3>
                                            
                                            {/* Extracto del contenido (renderizamos HTML seguro) */}
                                            <div 
                                                className="text-gray-600 font-sans text-sm mb-4 line-clamp-3 flex-grow"
                                                dangerouslySetInnerHTML={{ __html: item.content }}
                                            />

                                            <button className="text-rosa-principal font-bold hover:underline self-start mt-auto">
                                                Leer más →
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Paginación */}
                            {totalPages > 1 && (
                                <div className="flex justify-center mt-12 space-x-2">
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
                                    >
                                        Anterior
                                    </button>
                                    
                                    <span className="px-4 py-2 text-rosa-principal font-bold">
                                        Página {currentPage} de {totalPages}
                                    </span>

                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
            
            <Alliances />
            <Footer />
        </main>
    );
};