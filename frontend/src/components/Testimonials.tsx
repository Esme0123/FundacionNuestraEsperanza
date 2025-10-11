import React from 'react';
import Image from 'next/image';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Nombre 1",
      quote: "Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis.",
      image: "/IMG/cabello.png",
      age: "Edad" 
    },
    {
      name: "Nombre 2",
      quote: "Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis.",
      image: "/IMG/cabello.png",
      age: "Edad"
    },
    {
      name: "Nombre 3",
      quote: "Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis.",
      image: "/IMG/cabello.png", 
      age: "Edad"
    }
  ];

  return (
    <section id="testimonios" className="bg-rosa-claro py-16"> 
      <div className="container mx-auto px-6">
        <h2 data-aos="fade-up" className="text-4xl font-bold text-black mb-2 text-center font-title">TESTIMONIOS</h2>
        <div className="flex justify-center">
              <div className="bg-rosa-principal w-20 h-2 mb-5"></div>
            </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} data-aos="zoom-in" data-aos-delay={100 * index} className="bg-white shadow-lg overflow-hidden">
              <div className="relative w-full h-0 pb-[100%] overflow-hidden"> 
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  layout="fill"
                  objectFit="cover" 
                  className="absolute inset-0"
                />
              </div>
              <div className="p-6 text-center">
                <h4 className="text-xl font-bold text-black mb-2 font-title">{testimonial.name}</h4>
                <p className="text-black font-sans">{testimonial.quote}</p>
                <p className="text-sm text-gray-500 font-sans mt-2">{testimonial.age}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href="#" className="bg-rosa-principal text-white px-8 py-3 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300 font-button">
            VER MÁS
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;