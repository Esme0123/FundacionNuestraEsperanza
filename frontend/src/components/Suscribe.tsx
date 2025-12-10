"use client";
import React, { useState } from 'react';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // URL de tu Backend
  // Strip trailing slash if present to avoid double slashes
  const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch(`${API_BASE}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const contentType = response.headers.get("content-type");
      let data: { message?: string } = {};
      
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        // Handle non-JSON response (e.g. 404 HTML or 500 Error page)
        if (!response.ok) {
             throw new Error(`Error del servidor: ${response.status}`);
        }
      }

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 3000); // Resetear mensaje
      } else {
        // Si el correo ya existe (error 422), marcamos error
        setStatus('error');
        setErrorMessage(data.message || 'Verifica el correo o intenta de nuevo.');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage('Error de conexión.');
    }
  };

  return (
    <section className="bg-beige-claro py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-title">Suscríbete</h2>
        <p className="max-w-xl mx-auto mb-8 font-sans">
          Recibe las últimas noticias y actualizaciones de nuestra fundación.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-lg mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Tu correo electrónico"
            required
            className="w-full rounded-full sm:rounded-l-full sm:rounded-r-none px-6 py-3 text-black focus:outline-none mb-2 sm:mb-0 border border-transparent focus:border-rosa-principal"
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`px-8 py-3 rounded-full sm:rounded-r-full sm:rounded-l-none font-bold text-white transition duration-300 font-button
                ${status === 'success' ? 'bg-green-500 hover:bg-green-600' : 'bg-rosa-principal hover:bg-amarillo-detalle'}
                ${status === 'error' ? 'bg-red-500' : ''}
            `}
          >
            {status === 'loading' ? '...' : status === 'success' ? '¡LISTO!' : status === 'error' ? 'ERROR' : 'SUSCRIBIRME'}
          </button>
        </form>
        {status === 'error' && <p className="text-red-500 mt-2 text-sm">Error: {errorMessage}</p>}
      </div>
    </section>
  );
};

export default Subscribe;