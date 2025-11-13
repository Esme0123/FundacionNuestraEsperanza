"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Alliances from '@/components/Alliances';

const allNews = [
    {
        category: "Aniversarios",
        image: "/IMG/Events/aniversarioFundacion.jpg",
        title: "¡Celebramos nuestro Aniversario número 8!",
        date: "26 de Agosto, 2025",
    },
    {
        category: "Salud",
        image: "/IMG/Events/DAB79F60-1707-4ADB-908D-E238FF21E37F_4_5005_c.jpeg",
        title: "Celebramos y Agradecemos en el Día del Médico",
        date: "21 de Septiembre, 2025",
    },
    {
        category: "Eventos",
        image: "/IMG/Events/CimasDeLaEsperanza21-5-2025.jpg",
        title: "Cimas de la Esperanza",
        date: "05 de Agosto, 2025",
    },
    {
        category: "Eventos",
        image: "/IMG/Events/carreraPedestre.jpg",
        title: "Éxito total en nuestra Carrera Solidaria 5K 🏃‍♀️🏃‍♂️💙",
        date: "03 de Agosto, 2025",
    },
    {
        category: "Eventos",
        image: "/IMG/Events/rifaSolidaria.jpg",
        title: "Exitosa rifa para recaudación de fondos",
        date: "10 de Julio, 2025",
    },
    {
        category: "Comunidad",
        image: "/IMG/Events/Navidad0.jpg",
        title: "Familias de la fundación celebran juntos la magia de la Navidad",
        date: "25 de Diciembre, 2024",
    }
];

const NewsPage = () => {
    const [activeCategory, setActiveCategory] = useState("Todos");
    const [filteredNews, setFilteredNews] = useState(allNews);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const categories = ["Todos", "Eventos", "Comunidad", "Salud", "Aniversarios", "Voluntariado"];

    useEffect(() => {
        if (activeCategory === "Todos") {
            setFilteredNews(allNews);
        } else {
            const filtered = allNews.filter(news => news.category === activeCategory);
            setFilteredNews(filtered);
        }
        setCurrentPage(1); // Reset page on category change
    }, [activeCategory]);

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentNews = filteredNews.slice(firstItemIndex, lastItemIndex);
    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

    return (
        <main>
            <Navbar />
            <section className="bg-celeste-claro py-12 md:py-16">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-black mb-2 font-title">NOTICIAS</h1>
                    <div className="flex justify-center">
                        <div className="bg-rosa-principal w-20 h-2"></div>
                    </div>
                </div>
            </section>
            
            <section className="py-16 md:py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    {/* Filters Section */}
                    <div className="mb-12">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            {/* Category Filters */}
                            <div className="flex overflow-x-auto pb-2 -mx-2 px-2">
                                <div className="flex space-x-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-colors duration-300 ${
                                            activeCategory === category
                                                ? 'bg-rosa-principal text-white'
                                                : 'bg-white text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                                </div>
                            </div>
                            {/* Search Bar */}
                            <div className="relative w-full md:w-auto md:min-w-[300px]">
                                <input
                                    type="text"
                                    placeholder="Buscar en noticias..."
                                    className="w-full pl-5 pr-12 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-rosa-principal"
                                />
                                <button className="absolute right-0 top-0 mt-1.5 mr-1.5 bg-rosa-principal text-white p-2.5 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* News Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {currentNews.map((news, index) => (
                            <div key={index} data-aos="fade-up" data-aos-delay={100 * index} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group">
                                <div className="relative w-full h-56 overflow-hidden">
                                    <Image
                                        src={news.image}
                                        alt={`Imagen de ${news.title}`}
                                        layout="fill"
                                        objectFit="cover"
                                        className="transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <span className="absolute top-3 left-3 bg-rosa-principal text-white text-xs font-semibold px-3 py-1 rounded-full">{news.category}</span>
                                </div>
                                <div className="p-5 flex flex-col flex-grow">
                                    <h3 className="text-lg font-bold text-black mb-2 font-title flex-grow">{news.title}</h3>
                                    <p className="text-sm text-gray-500 font-sans mt-auto">{news.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center mt-16 space-x-2">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-3 py-2 rounded-md ${currentPage === 1 ? 'text-gray-300' : 'text-gray-500 hover:text-rosa-principal'}`}
                        >
                            {"<"}
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                            <button
                                key={number}
                                onClick={() => setCurrentPage(number)}
                                className={`px-4 py-2 rounded-md text-sm font-medium ${
                                    currentPage === number ? 'bg-rosa-principal text-white' : 'text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {number}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-2 rounded-md ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-500 hover:text-rosa-principal'}`}
                        >
                            {">"}
                        </button>
                    </div>
                </div>
            </section>
            
            <Alliances />
            <Footer />
        </main>
    );
};

export default NewsPage;