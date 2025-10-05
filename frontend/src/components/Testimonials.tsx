import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Nombre 1",
      quote: "Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis."
    },
    {
      name: "Nombre 2",
      quote: "Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis."
    },
    {
      name: "Nombre 3",
      quote: "Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis."
    }
  ];

  return (
    <section className="bg-rosa-claro py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-black mb-12 text-center font-title">TESTIMONIOS</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-center">
              <img src={`https://i.pravatar.cc/150?img=${index + 1}`} alt={testimonial.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h4 className="text-xl font-bold text-black mb-2 font-title">{testimonial.name}</h4>
              <p className="text-black font-sans">{testimonial.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;