"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Donation, fetchMockDonations } from '@/utils/mockData'; // Importamos nuestros datos falsos
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
const ProfileForm = ({ user }: { user:any}) => {
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
  const { user, isLoading: isAuthLoading, logout } = useAuth();
  const router = useRouter();

  const [donations, setDonations] = useState<Donation[]>([]);
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

  // Efecto 2: Cargar el historial (simulado)
  useEffect(() => {
    if (user) {
      setIsDonationsLoading(true);
      fetchMockDonations()
        .then((data) => setDonations(data))
        .catch((err) => setError('No se pudo cargar el historial.'))
        .finally(() => setIsDonationsLoading(false));
    }
  }, [user]);

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
                    ) : (
                      <div className="space-y-4">
                        {donations.map((don) => (
                          <div 
                            key={don.id} 
                            className="flex flex-col md:flex-row justify-between items-center p-4 border rounded-lg"
                          >
                            <div className="mb-2 md:mb-0">
                              <p className="text-lg font-bold text-azul-marino font-sans">{don.program}</p>
                              <p className="text-sm text-gray-500 font-sans">ID: {don.id} | Fecha: {don.date}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold text-verde-lima font-button">
                                Bs {don.amount.toFixed(2)}
                              </p>
                              <span className="px-3 py-1 text-sm rounded-full bg-green-200 text-green-800">
                                {don.status}
                              </span>
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