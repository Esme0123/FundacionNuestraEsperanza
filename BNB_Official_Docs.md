# Documentación Oficial: Open Banking Medio de Pago QR - BNB (v2)

## 1. Introducción
Servicios para la generación de QRs Simples, consulta de estado y notificaciones (Webhooks).

* **Base URL (Sandbox):** `http://test.bnb.com.bo`
* **Protocolo:** HTTP (Sandbox) / HTTPS (Producción)

---

## 2. Autenticación y Seguridad

### 2.1 Generar Token (Login)
Debe invocarse antes de cualquier operación. El token se envía en el header `Authorization: Bearer <token>`.

* **Endpoint:** `/ClientAuthentication.API/api/v1/auth/token`
* **Método:** `POST`
* **Headers:** `Content-Type: application/json`
* **Body:**
    ```json
    {
      "accountId": "USUARIO_BNB",
      "authorizationId": "PASSWORD_BNB"
    }
    ```
* **Respuesta:** `success: true`, `message: "TOKEN_JWT..."`

### 2.2 Actualizar Credenciales (OBLIGATORIO PRIMERA VEZ)
El `authorizationId` original debe ser cambiado obligatoriamente antes de consumir los servicios.
* **Endpoint:** `/ClientAuthentication.API/api/v1/auth/UpdateCredentials`
* **Método:** `POST`
* **Requisitos Clave Nueva:**
    * Mínimo 15 caracteres.
    * Al menos 1 letra y 1 número.
    * Al menos 1 caracter especial (`+`, `-`, `/`, `#`, etc.).
* **Body:**
    ```json
    {
      "AccountId": "USUARIO_BNB",
      "actualAuthorizationId": "PASSWORD_ACTUAL",
      "newAuthorizationId": "NUEVA_PASSWORD_SEGURA*"
    }
    ```

---

## 3. Generación de QR (Cobro Simple)

Genera un QR y devuelve la imagen en bytes (Base64).

* **Endpoint:** `/QRSimple.API/api/v1/main/getQRWithImageAsync`
* **Método:** `POST`
* **Body:**
    ```json
    {
      "currency": "BOB",           // Moneda (BOB o USD)
      "gloss": "Glosa del pago",   // Referencia
      "amount": 20,                // Monto
      "singleUse": true,           // true = expira al pagarse
      "expirationDate": "2025-12-31", // Fecha límite
      "destinationAccountId": "1", // "1" = Moneda Nacional, "2" = Extranjera
      "additionalData": "ID_INTERNO_DONACION" // Opcional, útil para tracking
    }
    ```
* **Respuesta:**
    * `id`: ID del QR (Importante guardar).
    * `qr`: Imagen en Base64.

---

## 4. Gestión y Estado

### 4.1 Obtener Estado de un QR
* **Endpoint:** `/QRSimple.API/api/v1/main/getQRStatusAsync`
* **Método:** `POST`
* **Body:** `{"qrId": 59}`
* **Respuesta:** `statusId`: 1 (No Usado), 2 (Usado), 3 (Expirado), 4 (Error).

### 4.2 Cancelar QR
Anula un QR antes de ser pagado.
* **Endpoint:** `/QRSimple.API/api/v1/main/CancelQRByIdAsync`
* **Body:** `{"qrId": 59}`

---

## 5. Notificación de Pagos (WEBHOOK)
Método mediante el cual el BNB informa a tu servidor que un pago se realizó exitosamente.

* **Tu Endpoint:** Debes exponer una URL (ej: `/api/bnb/callback`).
* **Método que envía el Banco:** `POST`
* **Datos que envía el Banco (JSON):**
    ```json
    {
      "QRId": "76",               // ID que retornó getQRWithImageAsync
      "Gloss": "Ref Pago",
      "sourceBankId": 1,          // Banco del donante
      "originName": "JUAN PEREZ", // Nombre del donante
      "VoucherId": "1J9F121212",  // Comprobante
      "TransactionDateTime": "19/10/2020 17:30:15",
      "additionalData": "..."     // Dato que enviaste al generar
    }
    ```
* **Respuesta Esperada por el Banco:**
    ```json
    {
      "success": true,
      "message": "Recibido"
    }
    ```