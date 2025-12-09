"use client";
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import AboutUs from "@/components/AboutUs";
import Programs from "@/components/Programs";
import HowToHelp from "@/components/HowToHelp";
import Testimonials from "@/components/Testimonials";
import News from "@/components/News";
import Contact from "@/components/Contact";
import Subscribe from "@/components/Suscribe";
import Alliances from "@/components/Alliances";
import Footer from "@/components/Footer";
import DonationModal from '@/components/DonationModal';

export default function HomePage() {
  // 1. Estado del Modal (Ya lo tenías bien)
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main>
      {/* Navbar y Hero ya tenían la función, ¡excelente! */}
      <Navbar onOpenDonationModal={openModal} />
      <Hero onOpenDonationModal={openModal} />
      
      <Stats/>
      <AboutUs />
      <Programs/>

      {/* AQUI ESTABA EL DETALLE: Pasamos la función al componente */}
      <HowToHelp onOpenDonationModal={openModal} />

      <Testimonials/>
      <News/>
      <Contact/>
      <Subscribe/>
      <Alliances/>
      <Footer onOpenDonationModal={openModal} />

      {/* El Modal que se abre */}
      <DonationModal isOpen={isModalOpen} onClose={closeModal} />
    </main>
  );
}