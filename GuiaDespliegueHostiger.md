Guía Definitiva: Despliegue de Laravel 12 en Hostinger
Este Runbook detalla el proceso completo y verificado para desplegar una aplicación Laravel 12 en un
entorno de hosting compartido de Hostinger, basado en lecciones aprendidas y mejores prácticas.
Fase 0: Preparación del Proyecto (Local)
Antes de subir al servidor, asegúrate de que tu proyecto local esté listo para producción.

1. Requisitos de Versión:
   Tu composer.json debe especificar php >= 8.3 .
   Asegúrate de estar usando PHP 8.3 o superior en tu entorno local (Laragon).
2. Configuración de Laravel 12:
   Rutas API: Confirma que el archivo routes/api.php existe. Si no, créalo vacío.
   Carga de Rutas: Verifica que bootstrap/app.php cargue explícitamente las rutas de API:
   ->withRouting(
   web: **DIR**.'/../routes/web.php',
   api: **DIR**.'/../routes/api.php', // ¡Esencial!
   commands: **DIR**.'/../routes/console.php',
   health: '/up',
   )
   Middleware: Registra cualquier alias de middleware (como role ) en bootstrap/app.php
   dentro de ->withMiddleware(...) .
3. Archivo de Entorno Ejemplo ( .env.example ):
   Asegúrate de que contenga todas las variables de entorno necesarias para producción (BD,
   URL, Mail, etc.), pero con valores dummy.
4. Control de Versiones (Git):
   Verifica que .gitignore ignore vendor/ , .env , y storage/ (excepto
   storage/app/public ).
   Haz commit y push de todos tus cambios a tu repositorio remoto.
   Fase 1: Preparación en Hostinger (hPanel)
   Configura el entorno en el servidor antes de desplegar el código.
5. Crear Base de Datos:
   Ve a Bases de datos -> Administración de Bases de Datos MySQL .
   Crea una nueva base de datos y un usuario.
   ¡CRÍTICO! Anota el nombre completo de la BD y del usuario (incluyendo el prefijo uXXXX\_ )
   y la contraseña.
6. Establecer Versión de PHP (Web):
   Ve a Avanzado -> Configuración de PHP .
   10/12/25, 0:42 Google Gemini
   https://gemini.google.com/u/0/app/14416241fe42927f?hl=es&pli=1&pageId=none 1/4
   Selecciona PHP 8.3 o superior.
7. Obtener Credenciales SSH:
   Ve a Avanzado -> Acceso SSH . Anota el Host, Puerto y Usuario.
   Fase 2: Despliegue Inicial (SSH)
   Conéctate al servidor y sube el código.
8. Conexión SSH: Conéctate usando tu cliente SSH ( ssh usuario@host -p puerto ).
9. Navegación: Ve al directorio raíz de tu dominio (ej. cd ~/domains/tudominio.com/public_html ). No crees subcarpetas.
10. Clonar Repositorio: Clona tu proyecto directamente en la carpeta actual.
    git clone URL_DE_TU_REPOSITORIO .
    Fase 3: Configuración del Entorno en Servidor (SSH)
    Aquí aplicamos todas las configuraciones críticas para que Laravel funcione en Hostinger.
11. Identificar y Configurar PHP CLI:
    Encuentra la ruta:
    ls -d /opt/alt/php\*/usr/bin/php
    (Elige la ruta de 8.3 o superior, ej. /opt/alt/php83/usr/bin/php ).
    Crea un Alias (¡MUY RECOMENDADO!): Esto te permitirá usar php normalmente.
    echo "alias php='/opt/alt/php83/usr/bin/php'" >> ~/.bashrc && source ~/.bashrc
    Verifica: Ejecuta php -v (debe mostrar 8.3.x).
12. Instalar Dependencias: Ahora puedes usar el alias php .
    php /usr/local/bin/composer install --no-dev --optimize-autoloader
13. Configurar .env :
    Copia el ejemplo: cp .env.example .env
    Edita con nano .env :
    APP_ENV=production
    APP_DEBUG=false
    APP_URL=https://tu-dominio.com
    10/12/25, 0:42 Google Gemini
    https://gemini.google.com/u/0/app/14416241fe42927f?hl=es&pli=1&pageId=none 2/4
    DB_DATABASE=uXXXX_nombre_bd (¡Nombre completo con prefijo!)
    DB_USERNAME=uXXXX_usuario_bd (¡Usuario completo con prefijo!)
    DB_PASSWORD="la_contraseña_bd"
    Genera la clave: php artisan key:generate
14. Preparar Base de Datos (Secuencia Importante):
    Paso A: Importar Estructura Base (.sql): Sube tu archivo SQL y ejecútalo.
    mysql -u uXXXX_usuario_bd -p uXXXX_nombre_bd < tu_archivo.sql
    (O impórtalo directamente desde phpMyAdmin).
    Paso B: Migraciones de Laravel: (Crea tablas internas como sessions , tokens ).
    php artisan migrate --force
    Paso C: Seeders (Si aplica):
    php artisan db:seed --force
15. Configurar Enrutamiento (Solución de "Dos Recepcionistas"):
    Crea .htaccess en public_html (Raíz del Dominio): Este archivo redirige todo el tráfico
    a /public .
    cat > .htaccess <<'HTEOF'
    RewriteEngine On
    RewriteCond %{REQUEST_URI} !^/public/
    RewriteRule ^(.\*)$ public/$1 [L,QSA]
    HTEOF
    Verifica .htaccess en public_html/public (El de Laravel): Asegúrate de que exista y,
    preferiblemente, contenga la línea RewriteBase / después de RewriteEngine On .
16. Ajustar Permisos:
    chmod -R 775 storage bootstrap/cache
17. Optimizar la Aplicación:
    php artisan optimize
    10/12/25, 0:42 Google Gemini
    https://gemini.google.com/u/0/app/14416241fe42927f?hl=es&pli=1&pageId=none 3/4
    Fase 4: Verificación y Troubleshooting
18. Prueba la URL Raíz: Abre https://tu-dominio.com . Deberías ver tu aplicación.
19. Prueba un Endpoint de API: Usa Postman o curl .
    curl -I https://tu-dominio.com/api/login -> Esperado: 405 Method Not Allowed .
    POST https://tu-dominio.com/api/login -> Esperado: 200 OK (con token) o 401
    (credenciales inválidas).
20. Error 500: Revisa storage/logs/laravel.log en el servidor.
21. Error 404:
    Verifica que ambos archivos .htaccess existan.
    Limpia la caché de rutas: php artisan route:clear y luego php artisan optimize .
    Tip Pro: Desactiva temporalmente la CDN de Hostinger ( hPanel -> Rendimiento -> CDN ) si
    las rutas de API siguen fallando.
22. Error 403: Verifica los permisos de las carpetas.
    Fase 5: Despliegues de Actualización (Nuevos Módulos)
    Para futuras actualizaciones, el proceso es mucho más simple:
23. SSH a public_html .
24. git pull origin main
25. php /usr/local/bin/composer install --no-dev --optimize-autoloader
26. php artisan migrate --force (si hay nuevas migraciones).
27. php artisan db:seed --force (si hay nuevos seeders).
28. php artisan optimize
