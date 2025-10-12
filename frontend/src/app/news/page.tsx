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
        date: " 26 de Agosto, 2025",
        // sponsor: "Empresa Amiga"
    },
    {
        category: "Salud",
        image: "/IMG/Events/DAB79F60-1707-4ADB-908D-E238FF21E37F_4_5005_c.jpeg",
        title: "Celebramos y Agradecemos en el Día del Médico",
        date: "21 de Septiembre, 2025",
        // sponsor: "Clínica Bienestar"
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
        // sponsor: "Comunidad Unida"
    },
    {
        category: "Eventos",
        image: "/IMG/Events/rifaSolidaria.jpg",
        title: "Exitosa rifa para recaudación de fondos",
        date: "10 de Julio, 2025",
        // sponsor: "Voluntarios en Acción"
    },
    {
        category: "Comunidad",
        image: "/IMG/Events/Navidad0.jpg",
        title: "Familias de la fundación celebran juntos la magia de la Navidad",
        date: "25 de Diciembre, 2024",
        // sponsor: "Jugueterías Felices"
    }
];

const NewsPage = () => {
    const [activeCategory, setActiveCategory] = useState("Todos");
    const [filteredNews, setFilteredNews] = useState(allNews);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; //ITEMS POR PAGINA

    const categories = ["Todos", "Eventos", "Comunidad", "Salud", "Aniversarios",  "Voluntariado"];

    useEffect(() => {
        if (activeCategory === "Todos") {
            setFilteredNews(allNews);
        } else {
            const filtered = allNews.filter(news => news.category === activeCategory);
            setFilteredNews(filtered);
        } setCurrentPage(1);
    }, [activeCategory]);
    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

const paginatedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
);

    return (
        <main className="bg-gray-50">
            <Navbar />
            <section className="bg-beige-claro py-12">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2 font-title">NOTICIAS</h1>
                    <div className="flex justify-center">
                        <div className="bg-rosa-principal w-20 h-2"></div>
                    </div>
                </div>
            </section>
            <section className="container mx-auto px-4 sm:px-6 py-16">
                <div className="grid lg:grid-cols-4 gap-12">

                    <aside className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit lg:sticky top-28">
                        <h3 className="text-2xl font-bold font-title mb-6">Filtrar</h3>                     
                        {/* Filtro por Categoría */}
                        <div className="mb-8">
                            <h4 className="font-bold font-title text-lg mb-3">Categoría</h4>
                            <ul className="space-y-2">
                                {categories.map(cat => (
                                    <li key={cat} onClick={() => setActiveCategory(cat)}
                                        className={`cursor-pointer transition-colors duration-300 ${activeCategory === cat ? 'text-rosa-principal font-bold' : 'text-gray-600 hover:text-azul-marino'}`}>
                                        {cat}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-6">
                             <h4 className="font-bold font-title text-lg mb-3">Buscar Noticia</h4>
                             <input type="text" placeholder="Escribe un término..." className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-principal"/>
                        </div>
                        <div>
                            <h4 className="font-bold font-title text-lg mb-3">Fecha</h4>
                            <input type="date" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-principal"/>
                        </div>
                        <button className="w-full mt-8 bg-rosa-principal text-white py-3 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300 font-button">
                            BUSCAR NOTICIA
                        </button>
                    </aside>

                    {/* Columna de Noticias (Derecha) */}
                    <div className="lg:col-span-3">
                        <div className="grid md:grid-cols-2 gap-8">
                            {paginatedNews.map((news, index) => (
                                <div key={index} className="group bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                                    {/* Contenedor de la Imagen */}
                                    <div className="relative h-56 w-full overflow-hidden bg-gray-200">
                                        <Image 
                                            src={news.image} 
                                            alt={news.title} 
                                            layout="fill" 
                                            objectFit="cover"
                                            className="transition-transform duration-500 group-hover:scale-110"/>
                                    </div>
                                    {/* Contenido de la Tarjeta */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <p className="text-sm text-rosa-principal font-semibold mb-2">{news.category.toUpperCase()}</p>
                                        <h3 className="text-lg md:text-xl font-bold font-title text-black mb-3 h-20">{news.title}</h3>
                                        <p className="text-sm text-gray-500 mt-auto">{news.date}</p>
                                        {/*{news.sponsor && (
                                            <div className="flex items-center text-gray-600 pt-4 mt-4 border-t">
                                                {/* <FaUserCircle className="mr-2 text-xl text-gray-400"/> 
                                                <span className="font-sans text-sm">Auspiciador: <strong>{news.sponsor}</strong></span>
                                            </div>
                                        )}*/}
                                    </div>
                                </div>
                            ))}
                        </div>
                         {filteredNews.length === 0 && (
                            <div className="text-center py-12 col-span-full">
                                <p className="text-gray-500">No se encontraron noticias en esta categoría.</p>
                            </div>
                        )}
                        {/* Paginación */}
                        <div className="flex justify-center mt-16 space-x-2">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded-md ${
                                    currentPage === 1 ? 'text-gray-300' : 'text-gray-500 hover:text-rosa-principal'
                                }`}
                            >
                                {"<"}
                            </button>
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`px-4 py-2 rounded-md ${
                                        currentPage === index + 1
                                            ? "text-white bg-rosa-principal"
                                            : "text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded-md ${
                                    currentPage === totalPages ? 'text-gray-300' : 'text-gray-500 hover:text-rosa-principal'
                                }`}
                            >
                                {">"}
                            </button>
</div>                        
                        {/* <div className="flex justify-center mt-16 space-x-2">
                            <a href="#" className="px-4 py-2 text-gray-500 hover:text-rosa-principal">{"<"}</a>
                            <a href="#" className="px-4 py-2 text-white bg-rosa-principal rounded-md">1</a>
                            <a href="#" className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md">2</a>
                            <a href="#" className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md">3</a>
                            <a href="#" className="px-4 py-2 text-gray-500 hover:text-rosa-principal">{">"}</a>
                        </div> */}
                    </div>
                </div>
            </section>
            
            <Alliances />
            <Footer />
        </main>
    );
};

export default NewsPage;
