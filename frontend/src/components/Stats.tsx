"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, animate } from 'framer-motion';

function Counter({ from, to }: { from: number, to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      animate(from, to, {
        duration: 2,
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = Math.round(value).toString();
          }
        },
      });
    }
  }, [inView, from, to]);

  return <span ref={ref}>{from}</span>;
}

const Stats = () => {
  const stats = [
    { number: '100', text: 'Niños que recibieron ayuda' },
    { number: '100', text: 'Niños con cáncer' },
    { number: '50', text: 'Voluntarios' },
  ];

  return (
    <section className="relative py-20">
      <div className="absolute inset-0 z-0">
        <Image
          src="/IMG/cantidad.png"
          alt="Niños de la fundación"
          layout="fill"
          objectFit="cover"
          quality={90}
        />
        {/* Aumentando la opacidad para mejorar la legibilidad del texto en móviles */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-white text-center">
        {/* Grid se convierte a 1 columna en móvil y 3 en desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="p-4"
            >
              <h3 className="text-5xl md:text-6xl font-extrabold font-title">
                +<Counter from={0} to={parseInt(stat.number)} />
              </h3>
              <p className="mt-2 text-md md:text-lg font-sans">{stat.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;