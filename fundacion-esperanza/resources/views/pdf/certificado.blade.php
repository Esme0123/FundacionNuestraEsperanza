<!DOCTYPE html>
<html lang="es">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Certificado de Prueba</title>
    <style>
        body { margin: 0; padding: 0; }
    </style>
</head>
<body>
    <div style="text-align: center; padding: 50px; border: 2px solid #333;">
        <h1>CERTIFICADO DE PRUEBA SIMPLE</h1>
        <p>Este archivo es para confirmar que DomPDF funciona en tu entorno.</p>
        <p>Donante: <strong>{{ $donante_nombre }}</strong></p>
        <p>Monto: {{ $donacion_monto }}</p>
        <p>Folio: {{ $certificado_uuid }}</p>
        <p style="color: green; font-weight: bold;">¡Si ves este PDF en tu carpeta, la generación funciona!</p>
    </div>
</body>
</html>