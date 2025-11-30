"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DonationModal from '@/components/DonationModal';

// Un componente pequeño para el spinner de carga
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-rosa-principal"></div>
  </div>
);

// Componente para el formulario de Editar Perfil
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProfileForm = ({ user }: { user: any }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    // TODO: Llamada a la API de Laravel para ACTUALIZAR perfil
    // const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://tu-api-laravel.com';
    // const response = await fetch(`${API_URL}/api/user/profile`, { ... });

    // --- Simulación de éxito ---
    await new Promise(res => setTimeout(res, 1000));
    setSuccess('¡Perfil actualizado con éxito!');
    // Aquí también deberías actualizar el usuario en el AuthContext
    // auth.login(updatedUser, auth.token);
    // --- Fin de simulación ---

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="text-sm font-bold text-gray-700 font-sans">
          Nombre Completo
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rosa-principal"
        />
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-bold text-gray-700 font-sans">
          Correo Electrónico
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rosa-principal"
        />
      </div>

      {success && <p className="text-sm text-green-600">{success}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="px-6 py-2 font-bold text-white transition-colors duration-300 rounded-full bg-rosa-principal hover:bg-amarillo-detalle font-button disabled:bg-gray-400"
      >
        {isLoading ? 'Guardando...' : 'Guardar Cambios'}
      </button>
    </form>
  );
};

// Componente para el formulario de Cambiar Contraseña
const PasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (newPassword !== newPasswordConfirmation) {
      setError('Las nuevas contraseñas no coinciden.');
      setIsLoading(false);
      return;
    }

    // TODO: Llamada a la API de Laravel para CAMBIAR contraseña
    // const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://tu-api-laravel.com';
    // const response = await fetch(`${API_URL}/api/user/password`, { ... });

    await new Promise(res => setTimeout(res, 1000));
    setSuccess('¡Contraseña actualizada con éxito!');

    setIsLoading(false);
    setCurrentPassword('');
    setNewPassword('');
    setNewPasswordConfirmation('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="currentPassword"
          className="text-sm font-bold text-gray-700 font-sans"
        >
          Contraseña Actual
        </label>
        <input
          id="currentPassword"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rosa-principal"
        />
      </div>
      <div>
        <label
          htmlFor="newPassword"
          className="text-sm font-bold text-gray-700 font-sans"
        >
          Nueva Contraseña
        </label>
        <input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rosa-principal"
        />
      </div>
      <div>
        <label
          htmlFor="newPasswordConfirmation"
          className="text-sm font-bold text-gray-700 font-sans"
        >
          Confirmar Nueva Contraseña
        </label>
        <input
          id="newPasswordConfirmation"
          type="password"
          value={newPasswordConfirmation}
          onChange={(e) => setNewPasswordConfirmation(e.target.value)}
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rosa-principal"
        />
      </div>

      {success && <p className="text-sm text-green-600">{success}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="px-6 py-2 font-bold text-white transition-colors duration-300 rounded-full bg-rosa-principal hover:bg-amarillo-detalle font-button disabled:bg-gray-400"
      >
        {isLoading ? 'Actualizando...' : 'Actualizar Contraseña'}
      </button>
    </form>
  );
};


// --- Página Principal del Perfil ---
export default function ProfilePage() {
  const { user, isLoading: isAuthLoading, logout, token: contextToken } = useAuth();
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [donations, setDonations] = useState<any[]>([]);
  const [isDonationsLoading, setIsDonationsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // Pestaña activa (profile, password, donations)
  const [activeTab, setActiveTab] = useState('profile');

  // Efecto 1: Proteger la ruta
  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push('/login');
    }
  }, [user, isAuthLoading, router]);

  // Efecto 2: Cargar el historial (REAL)
  useEffect(() => {
    if (user && activeTab === 'donations') {
      setIsDonationsLoading(true);

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const token = contextToken || localStorage.getItem('token');

      if (!token) {
        console.error('No token found in context or localStorage');
        setError('No se encontró sesión activa. Por favor, recargue la página o inicie sesión nuevamente.');
        setIsDonationsLoading(false);
        return;
      }

      fetch(`${API_URL}/api/auth/donations/my`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      })
        .then(async res => {
          if (!res.ok) {
            const text = await res.text();
            console.error('Error fetching donations:', res.status, text);
            throw new Error(`Error ${res.status}: No se pudo cargar el historial.`);
          }
          return res.json();
        })
        .then(data => {
          console.log('Donaciones recibidas:', data);
          setDonations(data.data || []);
        })
        .catch(err => {
          console.error('Fetch error:', err);
          setError(err.message || 'No se pudo cargar el historial.');
        })
        .finally(() => setIsDonationsLoading(false));
    }
  }, [user, activeTab, contextToken]);

  if (isAuthLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-beige-claro">
        <LoadingSpinner />
      </div>
    );
  }

  // Si el usuario está logueado, muestra la página
  return (
    <>
      <Navbar onOpenDonationModal={openModal} />
      <div className="min-h-screen bg-beige-claro pt-20">
        <div className="container mx-auto px-6 py-12">

          {/* Saludo y Logout */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-azul-marino font-title">
              Mi Perfil
            </h1>
            <button
              onClick={logout}
              className="bg-gray-200 text-azul-marino px-6 py-2 rounded-full font-bold hover:bg-gray-300 transition duration-300 font-button"
            >
              Cerrar Sesión
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Navegación de Pestañas (Sidebar en desktop) */}
            <aside className="md:col-span-1">
              <nav className="flex flex-col space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`p-4 rounded-lg text-left font-bold font-sans ${activeTab === 'profile' ? 'bg-white text-rosa-principal shadow-md' : 'text-gray-700 hover:bg-white/50'}`}
                >
                  Editar Perfil
                </button>
                <button
                  onClick={() => setActiveTab('password')}
                  className={`p-4 rounded-lg text-left font-bold font-sans ${activeTab === 'password' ? 'bg-white text-rosa-principal shadow-md' : 'text-gray-700 hover:bg-white/50'}`}
                >
                  Cambiar Contraseña
                </button>
                <button
                  onClick={() => setActiveTab('donations')}
                  className={`p-4 rounded-lg text-left font-bold font-sans ${activeTab === 'donations' ? 'bg-white text-rosa-principal shadow-md' : 'text-gray-700 hover:bg-white/50'}`}
                >
                  Historial de Donaciones
                </button>
              </nav>
            </aside>

            {/* Contenido de la Pestaña Activa */}
            <main className="md:col-span-3">
              <div className="bg-white p-8 rounded-lg shadow-md">

                {activeTab === 'profile' && (
                  <div>
                    <h2 className="text-3xl font-bold text-azul-marino font-title mb-6">
                      Información Personal
                    </h2>
                    <ProfileForm user={user} />
                  </div>
                )}

                {activeTab === 'password' && (
                  <div>
                    <h2 className="text-3xl font-bold text-azul-marino font-title mb-6">
                      Actualizar Contraseña
                    </h2>
                    <PasswordForm />
                  </div>
                )}

                {activeTab === 'donations' && (
                  <div>
                    <h2 className="text-3xl font-bold text-azul-marino font-title mb-6">
                      Mi Historial de Donaciones
                    </h2>
                    {isDonationsLoading ? (
                      <LoadingSpinner />
                    ) : error ? (
                      <p className="text-red-600 text-center font-sans">{error}</p>
                    ) : donations.length === 0 ? (
                      <p className="text-gray-600 text-center font-sans">No tienes donaciones registradas aún.</p>
                    ) : (
                      <div className="space-y-4">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {donations.map((don: any) => (
                          <div
                            key={don.id}
                            className="flex flex-col md:flex-row justify-between items-center p-4 border rounded-lg bg-gray-50 hover:bg-white transition-colors duration-200"
                          >
                            <div className="mb-2 md:mb-0">
                              <p className="text-lg font-bold text-azul-marino font-sans">
                                Donación #{don.id}
                              </p>
                              <p className="text-sm text-gray-500 font-sans">
                                Fecha: {don.date}
                              </p>
                              {don.is_recurring && (
                                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full mt-1">
                                  Recurrente
                                </span>
                              )}
                            </div>

                            <div className="flex flex-col items-end gap-2">
                              <div className="text-right">
                                <p className="text-xl font-bold text-verde-lima font-button">
                                  {don.formatted_amount}
                                </p>
                                <span className={`px-3 py-1 text-sm rounded-full ${don.status === 'succeeded' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                                  }`}>
                                  {don.status === 'succeeded' ? 'Exitosa' : don.status}
                                </span>
                              </div>

                              {/* Botón de Descarga de Certificado */}
                              {don.certificate && don.certificate.download_link && (
                                <a
                                  href={don.certificate.download_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white transition-colors duration-300 rounded-md bg-rosa-principal hover:bg-amarillo-detalle font-button"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                  </svg>
                                  Descargar Certificado
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
      <DonationModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}