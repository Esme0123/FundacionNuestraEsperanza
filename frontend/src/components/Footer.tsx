import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-azul-marino text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-2xl mb-4 font-title">NUESTRA ESPERANZA</h3>
            <p className="text-gray-300 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus magna purus, nibh dolor sed egestas...
            </p>
            {/* Aquí puedes agregar íconos de redes sociales */}
          </div>
          <div>
            <h4 className="font-bold mb-4">Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-rosa-principal">Quiénes Somos</a></li>
              <li><a href="#" className="hover:text-rosa-principal">Programas</a></li>
              <li><a href="#" className="hover:text-rosa-principal">Testimonios</a></li>
              <li><a href="#" className="hover:text-rosa-principal">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Donar</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="bg-rosa-principal text-white px-6 py-3 font-bold hover:bg-opacity-90 transition duration-300 font-button rounded-full">Donar ahora</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Subscríbete</h4>
            <p className="text-gray-300 text-sm mb-3">Recibe noticias en tu correo.</p>
            <form className="flex">
              <input type="email" placeholder="Tu correo" className="w-full rounded-l-md px-3 py-2 text-gray-800" />
              <button className="bg-rosa-principal px-4 rounded-r-md font-bold">OK</button>
            </form>
          </div>
        </div>
        <div className="text-center text-gray-400 text-sm pt-8 border-t border-gray-600">
          © {new Date().getFullYear()} Fundación Nuestra Esperanza. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;