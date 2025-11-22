## Endpoints de Autenticación - Guía de Uso

### 1. Login
**Endpoint**: `POST /api/auth/login`

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "correo_electronico": "panel.test@fundacion.org",
  "password": "password"
}
```

**Respuesta exitosa (200)**:
```json
{
  "message": "Login exitoso",
  "data": {
    "token": "YOUR_API_TOKEN",
    "user": {
      "id": 2,
      "nombre": "Test",
      "correo_electronico": "panel.test@fundacion.org",
      "roles": ["viewer"]
    }
  }
}
```

---

### 2. Cambiar Contraseña
**Endpoint**: `POST /api/auth/change-password`

**Headers**:
```
Authorization: Bearer YOUR_API_TOKEN
Content-Type: application/json
```

**Body**:
```json
{
  "password_actual": "password",
  "password_nueva": "password1",
  "password_nueva_confirmation": "password1"
}
```

**Respuesta exitosa (200)**:
```json
{
  "message": "Contraseña actualizada correctamente. Por favor inicia sesión nuevamente."
}
```

**Errores posibles**:
- `401`: "La contraseña actual es incorrecta"
- `422`: Errores de validación (contraseña muy corta, no coincide, etc.)
- `500`: Error interno del servidor

---

### Notas importantes:
- La nueva contraseña debe tener mínimo **8 caracteres**
- Después de cambiar la contraseña, todos los tokens se revocam (debes hacer login nuevamente)
- El servidor debe estar ejecutándose en `http://localhost:8000`

---

## Ejemplo con cURL:

### Login:
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "correo_electronico": "panel.test@fundacion.org",
    "password": "password"
  }'
```

### Cambiar contraseña:
```bash
curl -X POST http://localhost:8000/api/auth/change-password \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "password_actual": "password",
    "password_nueva": "password1",
    "password_nueva_confirmation": "password1"
  }'
```
