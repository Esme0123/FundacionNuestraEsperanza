import type { Metadata } from "next";
import "./globals.css";
import {M_PLUS_Rounded_1c, Original_Surfer,Gluten} from "next/font/google";
import AOSInitializer from "@/components/AOSInitializer";

const mPlus=M_PLUS_Rounded_1c({
  subsets:['latin'],
  weight:['400','700'],
    variable: '--font-mplus',
})
const surfer=Original_Surfer({
  subsets:['latin'],
  weight:['400'],
  variable:'--font-surfer',
})
const gluten=Gluten({
  subsets:['latin'],
  weight:['400','700'],
  variable:'--font-gluten',
})

export const metadata: Metadata = {
  title: "Fundación Nuestra Esperanza",
  description: "Sitio web Oficial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={
      `${mPlus.variable} ${surfer.variable} ${gluten.variable}`
    }>
      <body>
        <AOSInitializer />
        {children}
      </body>
    </html>
  );
}
