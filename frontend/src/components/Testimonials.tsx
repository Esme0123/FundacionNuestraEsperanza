"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface TestimonialItem {
  id: number;
  name: string;
  role: string | null;
  message: string;
  image: string | null;
}

interface ApiTestimonialItem {
  id: number;
  name: string;
  role?: string | null;
  message?: string;
  content?: string;
  image?: string | null;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);

  // URL del Backend
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials`);
        const data = await response.json();
        // Mapeamos los datos de la API y tomamos solo los 3 últimos
        const normalizedData = data.slice(0, 3).map((item: ApiTestimonialItem) => ({
          id: item.id,
          name: item.name,
          role: item.role || 'Beneficiario',
          message: item.message || item.content, // Soporte por si el backend manda content
          image: item.image
        }));
        setTestimonials(normalizedData);
      } catch (error) {
        console.error("Error cargando testimonios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="bg-celeste-claro py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-black mb-4 font-title"
          >
            TESTIMONIOS
          </motion.h2>
          <div className="flex justify-center">
            <div className="bg-rosa-principal w-20 h-2"></div>
          </div>
        </div>

        {loading ? (
             <div className="text-center text-gray-500">Cargando testimonios...</div>
        ) : testimonials.length === 0 ? (
             <div className="text-center text-gray-500">Pronto compartiremos nuevas historias.</div>
        ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden group flex flex-col h-full"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -10, boxShadow: "0px 20px 30px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Imagen Grande Rectangular (Como el diseño original) */}
                  <div className="relative w-full h-64 bg-gray-200">
                    {testimonial.image ? (
                        <Image 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            fill 
                            className="object-cover" 
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400 font-bold text-4xl bg-gray-300">
                            {testimonial.name.charAt(0)}
                        </div>
                    )}
                  </div>

                  <div className="p-6 text-center flex flex-col flex-grow">
                    <h4 className="text-xl font-bold text-black mb-2 font-title">
                        {testimonial.name}
                    </h4>
                    
                    {/* Contenido (Quote) */}
                    <div className="text-black font-sans text-sm italic mb-4 flex-grow line-clamp-4">
                        <div dangerouslySetInnerHTML={{ __html: testimonial.message }} />
                    </div>

                    {/* Rol (en lugar de Age, usamos el Rol que viene del backend) */}
                    <p className="text-sm text-turquesa-secundario font-bold font-sans mt-auto uppercase">
                        {testimonial.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
        )}

        <div className="text-center mt-12">
          <a href="/testimonios" className="bg-rosa-principal text-white px-8 py-3 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300 font-button inline-block">
            VER TODAS LAS HISTORIAS
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;