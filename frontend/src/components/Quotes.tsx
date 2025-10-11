"use client";
import React from 'react';
import Slider from 'react-slick';

const Quotes = () => {
  const quotes = [
    { quote: "Como su nombre lo dice, da 'Esperanza' a los necesitados", author: "Monina Gilchrist, La Paz Bolivia" },
    { quote: "La labor de dar cobijo a los enfermos de Cancer y a sus protectotes es maravilloso.", author: "Marianela Zeballos La Paz Bolivia" },
    { quote: "Increíbles personas que se encargan de cuidar, ayudar y proteger a los niños que luchan cada día por sanar. Gracias por el gran trabajo que hacen cada día.", author: "Tricia Herbas, La Paz Bolivia" }
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
    <section className="bg-celeste-fondo py-20 text-white">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <Slider {...settings}>
          {quotes.map((item, index) => (
            <div key={index}>
              <p className="text-3xl font-sans italic">&quot;{item.quote}&quot;</p>
              <p className="mt-4 font-bold text-lg font-title">- {item.author} -</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Quotes;