module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'azul-marino':'#12296C',
        'rosa-principal': '#FF5087',
        'celeste-fondo': '#59ADD3',
        'verde-lima': '#88B13F',
        'turquesa-secundario':'#00C1CA',
        'amarillo-detalle':'#FFAE00',
        'celeste-claro':'#ADE5FF',
        'rosa-claro':'#FFD5E2',
        'verde-lima-claro':'#F1FFD9',
        'beige-claro':'#F6F4E9',
        'amarillo-claro':'#FFE8B7',
        'white': '#FFFFFF',
        'black': '#000000',
      },
      fontFamily: {
        sans:['var(--font-mplus)'], //subtítulos y texto
        title:['var(--font-surfer)'],//títulos
        button:['var(--font-gluten)'],//botones
      } 
    },
  },
  plugins: [],
}