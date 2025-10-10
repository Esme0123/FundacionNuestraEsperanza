import React from 'react';

const Contact = () => {
  return (
    <section className="bg-verde-lima-claro py-16">
      <div className="container mx-auto px-6 text-center ">
        <h2 className="text-4xl font-bold text-black mb-4 font-title ">CONTACTO</h2>
        <div className="flex justify-center">
          <div className="bg-rosa-principal w-20 h-2 mb-5"></div>
        </div>
        <p className="text-black font-sans max-w-2xl mx-auto mb-8">
          ¿Tienes alguna pregunta o quieres saber más sobre cómo puedes ayudar? ¡Nos encantaría saber de ti!
        </p>
        <form className="max-w-xl mx-auto border-black border-2 bg-white p-5">
          <div className="mb-4 text-left">
            <p className='font-sans font-bold'>Nombre</p>
            <input type="text" placeholder="Tu Nombre" className="w-full p-3 rounded-md border border-gray-300 bg-gray-200 mt-3" />
          </div>
          <div className='mb-4 text-left'>
            <p className='font-sans font-bold'>Apellido</p>
            <input type='text' placeholder='Tu Apellido' className='w-full p-3 rounded-md border border-gray-300 bg-gray-200  mt-3'/>
          </div>
          <div className="mb-4 text-left">
            <p className='font-sans font-bold'>Correo Electrónico</p>
            <input type="email" placeholder="Tu Correo Electrónico" className="w-full p-3 rounded-md border border-gray-300 bg-gray-200 mt-3" />
          </div>
          <div className="mb-4 text-left">
            <p className='font-sans font-bold'>Mensaje</p>
            <textarea placeholder="Tu Mensaje" rows={5} className="w-full p-3 rounded-md border border-gray-300 bg-gray-200 mt-3"></textarea>
          </div>
          <button type="submit" className="bg-turquesa-secundario hover:bg-blue-200 text-azul-marino px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition duration-300 font-button">
            ENVIAR MENSAJE
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;