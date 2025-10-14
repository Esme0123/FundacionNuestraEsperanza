"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, animate } from 'framer-motion';
// Componente para animar el número
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
        <div className="absolute inset-0 bg-black opacity-0"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-white text-center">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <p className="text-5xl font-bold font-title"><Counter from={0} to={Number(stat.number)} />+</p>
              <p className="mt-2 text-lg font-sans">{stat.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;