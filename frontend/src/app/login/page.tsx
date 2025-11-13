"use client";
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth(); 
  const router = useRouter(); // Para redirigir

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    //Reemplazar con la URL de producción cuando esté lista
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://tu-api-laravel.com';

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Error de Laravel (ej. credenciales incorrectas)
        setError(data.message || 'Error al iniciar sesión.');
        setIsLoading(false);
        return;
      }

      // --- ¡ÉXITO! ---
      // 'data' debería tener la forma: { user: {...}, token: "..." }
      if (data.user && data.token) {
        login(data.user, data.token); // Usamos la función del AuthContext
        router.push('/perfil'); // Redirigimos al perfil del usuario
      } else {
         setError('Respuesta inesperada del servidor.');
      }

    } catch (err) {
      console.error('Error de red o fetch:', err);
      setError('No se pudo conectar al servidor. Inténtalo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };
  const handleMockLogin = () => {
    // Datos falsos para simular la respuesta del backend
    const mockUser = {
      id: 99, // ID de prueba
      name: 'Usuario de Prueba',
      email: 'prueba@fundacion.org'
    };
    const mockToken = 'fake-developer-token-12345';
    
    // Usamos la misma función login() de nuestro AuthContext
    login(mockUser, mockToken); 
    
    // Redirigimos al perfil
    router.push('/perfil');
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-beige-claro">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-4">
          <Link href="/">
            <Image
              src="/IMG/Logo.jpg" 
              alt="Volver al Inicio - Fundación Nuestra Esperanza"
              width={180}
              height={54}
              className="cursor-pointer"
            />
          </Link>
        </div>
        <h2 className="text-3xl font-bold text-center text-azul-marino font-title">
          Iniciar Sesión
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="email" 
              className="text-sm font-bold text-gray-700 font-sans"
            >
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rosa-principal"
            />
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="text-sm font-bold text-gray-700 font-sans"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rosa-principal"
            />
          </div>

          {error && (
            <p className="text-sm text-center text-red-600">{error}</p>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 font-bold text-white transition-colors duration-300 rounded-md bg-rosa-principal hover:bg-amarillo-detalle font-button disabled:bg-gray-400"
            >
              {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-600 font-sans">
          ¿No tienes una cuenta?{' '}
          <Link href="/registro" className="font-bold text-turquesa-secundario hover:underline">
            Regístrate
          </Link>
        </p>
        {process.env.NODE_ENV === 'development' && (
          <div className="text-center border-t pt-4 mt-4 border-dashed">
            <p className="text-xs text-gray-500 font-sans mb-2">-- Solo para desarrollo --</p>
            <button
              type="button"
              onClick={handleMockLogin}
              className="w-full px-4 py-2 font-bold text-white transition-colors duration-300 rounded-md bg-turquesa-secundario hover:bg-amarillo-detalle font-button"
            >
              Probar Perfil (Simular Login)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}