# Plan de Despliegue Personalizado: Next.js + Laravel en Hostinger

Este plan complementa la guía general, adaptándola específicamente para tu arquitectura **Frontend (Next.js)** + **Backend (Laravel)**.

## Arquitectura Objetivo en Hostinger

En un hosting compartido (cPanel/hPanel), la mejor estrategia es:

1.  **Backend (API)**: Alojado en un subdominio (ej. `api.tudominio.com`) o una subcarpeta, sirviendo solo la API.
2.  **Frontend (Web)**: Generado como **Sitio Estático** y servido desde la raíz (`tudominio.com`).

---

## Fase 1: Preparación del Frontend (Local)

Al no tener un servidor Node.js persistente en el plan compartido estándar, debemos convertir Next.js a HTML/CSS/JS estático.

### 1. Actualizar `next.config.ts`

Tu archivo ya está configurado correctamente con `output: 'export'` y `images: { unoptimized: true }`. ¡Excelente!

Asegúrate de agregar tu dominio de producción en la sección `remotePatterns` o `domains` si sirves imágenes desde la API en producción.

```typescript
    // Cuando subas a Hostinger, agrega aquí tu dominio real:
    { protocol: 'https', hostname: 'api.tudominio.com', pathname: '/storage/**' }
```

### 2. Configurar Variables de Entorno de Producción

Crea un archivo `.env.production` en la carpeta `frontend`:

```env
NEXT_PUBLIC_API_URL=https://api.tudominio.com
# Asegúrate de NO poner http://localhost aquí
```

### 3. Generar la Build

Ejecuta el siguiente comando en tu terminal local (`frontend`):

```bash
npm run build
```

Esto creará una carpeta llamada **`out`**.

- **Contenido de `out`**: `index.html`, `404.html`, carpeta `_next`, etc.
- **Esta carpeta `out` ES tu página web.**

---

## Fase 2: Estructura en el Servidor (Hostinger)

No mezcles el código de Laravel con el de Next.js en la misma carpeta pública.

### Opción Recomendada: Subdominio para API

1.  **Crear Subdominio**: En hPanel, crea `api.tudominio.com`.
    - Esto creará una carpeta: `domains/tudominio.com/public_html/api` (o similar).
2.  **Backend**: Sigue la guía original (`GuiaDespliegueHostiger.md`), pero apunta la instalación de Laravel para que sirva desde este subdominio.
    - Sube el código de Laravel (repo `fundacion-esperanza`) a una carpeta privada, ej: `domains/tudominio.com/laravel-core`.
    - Copia el contenido de `public` de Laravel a la carpeta del subdominio (`domains/tudominio.com/public_html/api`).
    - Edita el `index.php` en esa carpeta para cargar el framework desde `../../laravel-core`.

### Opción Simplificada (Todo en Raíz, no recomendada para Next.js limpio)

Si no quieres subdominios, la API chocaría con Next.js. Mejor usa el subdominio `api.`.

---

## Fase 3: Subida del Frontend

1.  Ve a la carpeta `public_html` de tu dominio principal (donde quieres que se vea la web).
2.  **Borra** el archivo `default.php` de Hostinger.
3.  **Sube TODO el contenido de la carpeta `out`** (generada en la Fase 1) directamente aquí.
    - Deberías ver `index.html` directamente en `public_html`.
4.  **Configurar Redirecciones (SPA Fallback)**:
    Como es una "Single Page App", si alguien entra directo a `/perfil`, el servidor buscará `perfil.html` o carpeta `perfil`. Si no existe, dará 404. Debemos redirigir todo al `index.html` (o al html correspondiente).

    Crea un `.htaccess` en `public_html`:

    ```apache
    <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /
      RewriteRule ^index\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteCond %{REQUEST_FILENAME} !-l
      RewriteRule . /index.html [L]
    </IfModule>
    ```

---

## Resumen de Pasos Previos

Antes de seguir la guía de Hostinger para el backend:

1.  [ ] **Frontend**: Modifica `next.config.ts` (agrega el dominio de prod a `images`).
2.  [ ] **Frontend**: Crea `.env.production` con la URL real de tu API en Hostinger.
3.  [ ] **Frontend**: Ejecuta `npm run build` y verifica que se cree la carpeta `out`.
4.  [ ] **Backend**: Asegúrate de que `config/cors.php` permita peticiones desde tu dominio de producción (`https://tudominio.com`).

Una vez tengas la carpeta `out` (tu web) y el código Laravel listo, procede a subir archivos.
