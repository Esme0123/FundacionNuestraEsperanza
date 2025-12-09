"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Alliances from '@/components/Alliances';

interface TestimonialItem {
    id: number;
    name: string;
    role: string | null;   // Ej: "Madre de familia"
    message: string;       // Laravel manda esto (mapeado desde 'content')
    image: string | null;  // URL completa o null
}

interface ApiTestimonialResponse {
    id: number;
    name: string;
    role: string | null;
    message?: string;
    content?: string;
    image: string | null;
}

export default function TestimonialsPage() {
    // 2. Estados
    const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
    const [loading, setLoading] = useState(true);

    // URL del Backend
    const API_URL = 'http://127.0.0.1:8000/api';
    
    useEffect(() => {
        const loadTestimonials = async () => {
            try {
                const response = await fetch(`${API_URL}/testimonials`);
                if (response.ok) {
                    const data = await response.json();
                    // Aseguramos que los datos se ajusten a la interfaz
                    // Si tu API devuelve 'content' en vez de 'message', aquí lo arreglamos
                    const normalizedData = data.map((item: ApiTestimonialResponse) => ({
                        id: item.id,
                        name: item.name,
                        role: item.role || 'Beneficiario', // Valor por defecto si es nulo
                        message: item.message || item.content, // Soporte para ambos nombres
                        image: item.image
                    }));

                    setTestimonials(normalizedData);
                } else {
                    console.error("Error al obtener testimonios");
                }
            } catch (error) {
                console.error("Error de conexión:", error);
            } finally {
                setLoading(false);
            }
        };

        loadTestimonials();
    }, []);

    return (
        <main>
            <Navbar />
            
            {/* Header */}
            <section className="bg-celeste-claro py-20 text-center">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-azul-marino font-title mb-6">
                        Testimonios
                    </h1>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto font-sans">
                        Historias reales de esperanza, lucha y superación que nos inspiran cada día.
                    </p>
                </div>
            </section>

            {/* Lista de Testimonios */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-6">
                    
                    {loading ? (
                        <div className="text-center py-20 text-gray-500">Cargando historias...</div>
                    ) : testimonials.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">Aún no hay testimonios registrados.</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {testimonials.map((item) => (
                                <div 
                                    key={item.id} 
                                    className="bg-beige-claro rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
                                >
                                    {/* Imagen Circular (Avatar) */}
                                    <div className="relative w-24 h-24 mb-6">
                                        {item.image ? (
                                            <Image 
                                                src={item.image} 
                                                alt={item.name} 
                                                fill
                                                className="rounded-full object-cover border-4 border-white shadow-md"
                                            />
                                        ) : (
                                            // Si no hay foto, mostramos un círculo gris con la inicial
                                            <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center text-gray-500 text-2xl font-bold border-4 border-white shadow-md">
                                                {item.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>

                                    {/* Comillas decorativas */}
                                    <div className="text-rosa-principal text-4xl font-serif leading-none mb-4">
                                        “
                                    </div>

                                    {/* Contenido del Testimonio */}
                                    {/* Usamos dangerouslySetInnerHTML porque Filament guarda HTML (negritas, párrafos) */}
                                    <div 
                                        className="text-gray-700 font-sans italic mb-6 line-clamp-6 flex-grow prose-sm"
                                        dangerouslySetInnerHTML={{ __html: item.message }}
                                    />

                                    {/* Nombre y Rol */}
                                    <div className="mt-auto">
                                        <h3 className="text-xl font-bold text-azul-marino font-title">
                                            {item.name}
                                        </h3>
                                        <p className="text-turquesa-secundario font-bold text-sm uppercase mt-1">
                                            {item.role}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Sección de llamada a la acción (Estática) */}
                    <div className="mt-20 bg-azul-marino rounded-2xl p-10 md:p-16 text-white text-center">
                        <h3 className="text-2xl md:text-3xl font-bold font-title mb-4">¿Tienes una historia que contar?</h3>
                        <p className="mb-8 font-sans max-w-2xl mx-auto">
                            Si has sido parte de nuestra fundación, nos encantaría conocer tu experiencia.
                        </p>
                        <a href="/contacto" className="bg-rosa-principal text-white px-8 py-3 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300 font-button">
                            CONTÁCTANOS
                        </a>
                    </div>

                </div>
            </section>
            
            <Alliances />
            <Footer />
        </main>
    );
};