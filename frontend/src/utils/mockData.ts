// src/utils/mockData.ts

// 1. Definimos cómo se ve una donación
export interface Donation {
  id: string;
  date: string;
  amount: number;
  status: 'Completada' | 'Pendiente';
  program: string;
}

// 2. Creamos una lista de donaciones falsas
export const mockDonations: Donation[] = [
  {
    id: 'DON-12345',
    date: '2023-10-28',
    amount: 100,
    status: 'Completada',
    program: 'Programa de Almuerzos',
  },
  {
    id: 'DON-12366',
    date: '2023-09-15',
    amount: 50,
    status: 'Completada',
    program: 'Programa de Alojamiento',
  },
  {
    id: 'DON-12399',
    date: '2023-08-02',
    amount: 200,
    status: 'Completada',
    program: 'Colaboración General',
  },
];

// 3. Creamos una "falsa API" que devuelve los datos después de 1 segundo
export const fetchMockDonations = (): Promise<Donation[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDonations);
    }, 1000); // Simula 1 segundo de carga
  });
};