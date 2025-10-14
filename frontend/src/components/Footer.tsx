import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-azul-marino text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="flex items-center sm:col-span-2 lg:col-span-1">
            <Image
              src="/IMG/Logo.jpg" alt='Logo Fundación' width={200} height={200}
            />
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-bold mb-4 font-title">FUNDACIÓN NUESTRA ESPERANZA</h3>
            <p className="text-gray-300 text-sm mb-2">
              Haciendo una diferencia en la vida de los niños que padecen de cáncer en toda Bolivia.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/NuestraEsperanzaBo/?locale=es_LA">
                <Image
                  src="/IMG/ic_facebook.png" alt='Facebook' width={30} height={30}
                /></a>
              <a href="https://www.tiktok.com/@fund.nuestra.esperanza?_t=ZM-90VE1jzCdp5&_r=1">
                <Image
                  src="/IMG/ic_tiktok.png" alt='TikTok' width={30} height={30}
                /></a>
              <a href="https://www.instagram.com/fundacionnuestraesperanza/?hl=es-la"><Image
                src="/IMG/ic_instagram.png" alt='Instagram' width={30} height={30}
              /></a>
            </div>
            <p className='mt-2 font-sans text-sm'>Escríbenos al: 70112236</p>
            <p className='mt-2 font-sans text-sm'>fundacion.nuestraesperanza1@gmail.com</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition duration-300 text-rosa-principal">Quiénes Somos</a></li>
              <li><a href="#" className="hover:text-white transition duration-300 text-rosa-principal">Programas</a></li>
              <li><a href="#" className='hover:text-white transition duration-300 text-rosa-principal'>Cómo Ayudar</a></li>
              <li><a href="#" className="hover:text-white transition duration-300 text-rosa-principal">Testimonios</a></li>
              <li><a href="#" className="hover:text-white transition duration-300 text-rosa-principal">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Cómo Ayudar</h4>
            <ul className="space-y-4 md:space-y-10 text-sm">
              <li><a href="#" className="bg-rosa-principal px-5 py-3 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300 font-button">
                DONAR AHORA
              </a></li>
              <li><a href="#" className="bg-rosa-principal text-white px-6 py-3 rounded-full font-bold hover:bg-amarillo-detalle transition duration-300 font-button">
                SER VOLUNTARIO
              </a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Subscríbete</h4>
            <p className="text-gray-300 text-sm mb-3">Recibe noticias en tu correo.</p>
            <form className="flex">
              <input type="email" placeholder="Tu correo" className="w-full rounded-l-md px-3 py-2 text-gray-800" />
              <button className="bg-rosa-principal px-4 rounded-r-md font-bold hover:bg-amarillo-detalle">OK</button>
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