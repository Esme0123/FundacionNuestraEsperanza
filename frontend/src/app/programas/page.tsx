"use client";
import React, { useState, useMemo } from 'react'; // Importar useState y useMemo
import Image from 'next/image';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Alliances from '@/components/Alliances';

// Definición de las tarjetas de programas (se mantiene igual)
const allPrograms = [
    {
      image:"/IMG/Programs/DORMITORIOS.JPG", //camia imagen
      title: "Albergue",
      description: "Nuestra casita albergue 'UTAJA' (Mi Casa) ofrece un hogar seguro y cálido. Contamos con  11 dormitorios, totalmente equipados.",
    },
    {
      image:"/IMG/almuerzo.png",
      title: "Alimentación y Nutrición",
      description: "Contamos con una amplia cocina donde una encargada prepara alimentos completos y balanceados para padres y niños. Los padres de  niños que tienen recomendaciones de nutrición especial, tienen la posibilidad de preparar su alimento en la casa.", 
    },
    {
      image:"/IMG/alojamiento.jpg",
      title: "Área de juegos y esparcimiento",
      description: "Contamos con un espacio donde los niños pueden jugar, descansar , al igual que los padres, con mobiliario cómodo, televisión por cable, música, video juegos.",
    },
    {
      image:"/IMG/Programs/PSICOLOGIA.jpg",
      title: "Apoyo Psicológico",
      description: "Disponemos de un gabinete de psicología y equipo de psicólogas para apoyar a niños y padres. También se realizan capacitaciones para las familias y voluntarias. El equipo apoya a familias, donde sea que se encuentren, durante la etapa de cuidados paliativos de los pacientes. ",
    },
    {
      image:"/IMG/Programs/TransporteSeguro.jpg",
      title: "Transporte Seguro",
      description: "Para evitar contagios por utilizar medios de transporte masivo, otorgamos un servicio de taxi para ir y volver de hospitales, centro de radioterapia, estación de buses, etc.",
    },
    {
      image:"/IMG/Programs/SOBREVIVIENTES BABY SHOWER.jpg",
      title: "Sobrevivientes",
      description: " La Fundación hace seguimiento a  sobrevivientes que durante su tratamiento estuvieron en la casita. Gestionamos becas universitarias, recientemente tuvimos Baby Shower para dos sobrevivientes que acaban de ser mamás. Se organizan encuentros de sobrevivientes a nivel local y nacional y también son miembros de asociaciones de sobrevivientes internacionales",
    },
    {
      image:"/IMG/Programs/PROGRAMA CABELLOS 2.jpg",
      title: "Cabello para todas",
      description: "Recibimos donación de cabello y hacemos turbantes con cabellos, los cuales están a la venta. Con el dinero recaudado se paga la confección de los mismos y se regalan turbantes a las niñas de la casita.",
    }
];

// --- Configuración de Paginación ---
const CARDS_PER_PAGE = 5;

const ProgramsPage = () => {
    // Estado para la página actual, inicia en 1
    const [currentPage, setCurrentPage] = useState(1);
    
    const totalPages = Math.ceil(allPrograms.length / CARDS_PER_PAGE);
    const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
    const endIndex = startIndex + CARDS_PER_PAGE;
    const currentPrograms = useMemo(() => {
        return allPrograms.slice(startIndex, endIndex);
    }, [currentPage, allPrograms]); 

    // Función para cambiar la página
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);


    return (
        <main>
            <Navbar />
            {/* Sección de Título */}
            <section className="bg-celeste-claro py-12 md:py-16">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-black mb-2 font-title">PROGRAMAS / NUESTRO TRABAJO</h1>
                    <div className="flex justify-center">
                        <div className="bg-rosa-principal w-20 h-2"></div>
                    </div>
                </div>
            </section>

            {/* Sección de Programas */}
            <section className="py-16 md:py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    {/* Barra de búsqueda (
                    Visual) */}
                    <div className="mb-12 flex justify-center">
                        <div className="relative w-full max-w-sm md:max-w-lg">
                            <input
                                type="text"
                                placeholder="Buscar programa..."
                                className="w-full px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-rosa-principal"
                            />
                            <button className="absolute right-0 top-0 mt-1.5 mr-1.5 bg-rosa-principal text-white px-4 py-2 md:px-6 md:py-2 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300 text-sm md:text-base">
                                Buscar
                            </button>
                        </div>
                    </div>

                    {/* Grid de Programas (Mapea 'currentPrograms' en lugar de 'allPrograms') */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentPrograms.map((program, index) => (
                            <div key={index} data-aos="fade-up" data-aos-delay={100 * index} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group">
                                <div className="relative w-full h-56 overflow-hidden">
                                    <Image
                                        src={program.image}
                                        alt={`Imagen de ${program.title}`}
                                        layout="fill"
                                        objectFit="cover"
                                        className="transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h4 className="text-2xl font-bold text-black mb-3 font-title">{program.title}</h4>
                                    <p className="text-gray-700 font-sans mb-6 flex-grow">{program.description}</p>
                                    <a href="#" className="bg-turquesa-secundario text-azul-marino px-6 py-3 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300 font-button self-start">
                                        VER DETALLE
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Paginación (Funcional) */}
                    {totalPages > 1 && ( 
                        <div className="flex justify-center mt-16 space-x-1 md:space-x-2">
                            {/* Botón Anterior */}
                            <button 
                                onClick={() => goToPage(currentPage - 1)} 
                                disabled={currentPage === 1}
                                className={`px-3 py-2 md:px-4 md:py-2 ${currentPage === 1 ? 'text-gray-400' : 'text-gray-700 hover:text-rosa-principal'}`}
                            >
                                {"<"}
                            </button>
                            
                            {/* Botones de Páginas */}
                            {pageNumbers.map((page) => (
                                <button
                                    key={page}
                                    onClick={() => goToPage(page)}
                                    className={`px-3 py-2 md:px-4 md:py-2 rounded-md font-button transition duration-300 ${
                                        page === currentPage 
                                        ? 'text-white bg-rosa-principal' 
                                        : 'text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            {/* Botón Siguiente */}
                            <button 
                                onClick={() => goToPage(currentPage + 1)} 
                                disabled={currentPage === totalPages}
                                className={`px-3 py-2 md:px-4 md:py-2 ${currentPage === totalPages ? 'text-gray-400' : 'text-gray-700 hover:text-rosa-principal'}`}
                            >
                                {">"}
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Sección Cómo Ayudar (Se mantiene igual) */}
            <section className="bg-azul-marino py-16 md:py-20 text-white text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 font-title">CÓMO AYUDAR</h2>
                    <div className="flex justify-center">
                        <div className="bg-rosa-principal w-20 h-2 mb-10"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white/10 p-8 rounded-lg">
                            <h3 className="text-2xl md:text-3xl font-bold font-title mb-4">Voluntariado</h3>
                            <p className="mb-6 font-sans">Suma tu tiempo y talento a nuestra causa. Juntos, podemos llevar más sonrisas y esperanza a nuestros niños.</p>
                            <a href="#" className="bg-white text-azul-marino px-7 py-4 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300 font-button">
                                SER VOLUNTARIO
                            </a>
                        </div>
                        <div className="bg-white/10 p-8 rounded-lg">
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

export default ProgramsPage;