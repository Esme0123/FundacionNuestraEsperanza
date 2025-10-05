import React from 'react';

const News = () => {
  const newsItems = [
    {
      category: 'CBS This Morning',
      progress: '17% de recaudación',
      raised: 'Total recaudado Bs 4563',
      date: 'Fecha del evento'
    },
    {
      category: 'Principal colaborador',
      progress: '17% de recaudación',
      raised: 'Total recaudado Bs 4563',
      date: 'Fecha del evento'
    },
    {
      category: 'CBS This Morning',
      progress: '17% de recaudación',
      raised: 'Total recaudado Bs 4563',
      date: 'Fecha del evento'
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-black mb-12 text-center font-title">NOTICIAS</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <div key={index} className="rounded-lg shadow-lg overflow-hidden">
              <img src={`https://picsum.photos/seed/${index+10}/600/400`} alt="Imagen de noticia" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 text-azul-marino font-title">{item.category}</h3>
                <p className="text-sm text-gray-600 font-sans">{item.progress}</p>
                <p className="text-sm text-gray-600 font-sans">{item.raised}</p>
                <p className="text-sm text-gray-600 font-sans mt-2">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;