import React from 'react';

const Contact = () => {
  return (
    <section className="bg-verde-lima-claro py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-black mb-4 font-title">CONTACTO</h2>
        <p className="text-black font-sans max-w-2xl mx-auto mb-8">
          ¿Tienes alguna pregunta o quieres saber más sobre cómo puedes ayudar? ¡Nos encantaría saber de ti!
        </p>
        <form className="max-w-xl mx-auto">
          <div className="mb-4">
            <input type="text" placeholder="Tu Nombre" className="w-full p-3 rounded-md border border-gray-300" />
          </div>
          <div className='mb-4'>
            <input type='text' placeholder='Tu Apellido' className='w-full p-3 rounded-md border border-gray-300'/>
          </div>
          <div className="mb-4">
            <input type="email" placeholder="Tu Correo Electrónico" className="w-full p-3 rounded-md border border-gray-300" />
          </div>
          <div className="mb-4">
            <textarea placeholder="Tu Mensaje" rows={5} className="w-full p-3 rounded-md border border-gray-300"></textarea>
          </div>
          <button type="submit" className="bg-turquesa-secundario text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition duration-300 font-button">
            ENVIAR MENSAJE
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;