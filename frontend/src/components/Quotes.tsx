"use client";
import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';

const Quotes = () => {
  const quotes = [
    { quote: "Como su nombre lo dice, da 'Esperanza' a los necesitados", author: "Monina Gilchrist, La Paz Bolivia",image: "/IMG/frase-1.jpeg" },
    { quote: "La labor de dar cobijo a los enfermos de Cancer y a sus protectotes es maravilloso.", author: "Marianela Zeballos La Paz Bolivia",image: "/IMG/frase-2.jpg" },
    { quote: "Increíbles personas que se encargan de cuidar, ayudar y proteger a los niños que luchan cada día por sanar. Gracias por el gran trabajo que hacen cada día.", author: "Tricia Herbas, La Paz Bolivia",image: "/IMG/frase-3.jpeg" }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000, 
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000, 
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <section className="relative text-white">
      <Slider {...settings}>
        {quotes.map((item, index) => (
          <div key={index} className="relative h-96 flex items-center justify-center text-center">
            <Image 
              src={item.image} 
              alt={`Fondo para frase de ${item.author}`} 
              layout="fill" 
              objectFit="cover" 
              className="-z-10 object-cover object-center" 
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative justify-center container mx-auto px-6 max-w-3xl text-center mt-32">
              <p className="text-3xl font-sans italic">&quot;{item.quote}&quot;</p>
              <p className="mt-4 font-bold text-lg font-title">- {item.author} -</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Quotes;