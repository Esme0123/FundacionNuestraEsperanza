import React from 'react';

const Subscribe = () => {
  return (
    <section className="bg-beige-claro py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4 font-title">Subscríbete</h2>
        <p className="max-w-xl mx-auto mb-8 font-sans">
          Recibe las últimas noticias y actualizaciones de nuestra fundación directamente en tu correo electrónico.
        </p>
        <form className="flex max-w-lg mx-auto">
          <input 
            type="email" 
            placeholder="Escribe tu correo electrónico" 
            className="w-full rounded-l-full px-6 py-3 text-black focus:outline-none" 
          />
          <button 
            type="submit" 
            className="bg-rosa-principal hover:bg-amarillo-detalle text-white px-8 py-3 rounded-r-full font-bold hover:bg-opacity-90 transition duration-300 font-button"
          >
            SUBSCRIBETE
          </button>
        </form>
      </div>
    </section>
  );
};

export default Subscribe;