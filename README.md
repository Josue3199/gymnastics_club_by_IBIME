# Gymnastics Club by IBIME — Guía Técnica

## Estructura del repositorio

```
/
├── gymnastics_admin_clases.html    Portal de administración (publicar clases, gestionar catálogo)
├── gymnastics_alumno.html          Portal del alumno (reservar, pagar, ver estado en tiempo real)
├── gymnastics_profesores.html      Portal del profesor (ver inscritos, pasar lista, asistencia)
├── gymnastics_recepcion.html       Portal de recepción (cobros, inscripciones, reservas)
└── assets/
    └── js/
        ├── firebase-init.js        Inicialización centralizada de Firebase (cargado por todos los HTML)
        └── schema.js               Constantes de colecciones y campos de Firestore
```

## Cómo configurar Firebase

1. Abre [Firebase Console](https://console.firebase.google.com/) y crea o selecciona tu proyecto.
2. En **Configuración del proyecto → Aplicaciones web**, copia la configuración.
3. Abre `assets/js/firebase-init.js` y reemplaza los valores de `FIREBASE_CONFIG`:

```javascript
var FIREBASE_CONFIG = {
  apiKey:            "TU_API_KEY",
  authDomain:        "TU_PROJECT.firebaseapp.com",
  databaseURL:       "https://TU_PROJECT-default-rtdb.firebaseio.com/",
  projectId:         "TU_PROJECT",
  appId:             "TU_APP_ID"
};
```

> No es necesario cambiar ningún otro archivo; todos los HTML cargan `assets/js/firebase-init.js` antes de su script de página.

## Colecciones y campos de Firestore

### `catalogo` — Catálogo de clases y productos

| Campo           | Tipo      | Descripción                                             |
|-----------------|-----------|---------------------------------------------------------|
| nombre          | string    | Nombre de la clase/producto                             |
| tipo            | string    | `"clase"` o `"producto"`                                |
| area            | string    | `"fitness"` o `"gimnasia"`                              |
| inicio          | string    | Hora de inicio (HH:MM)                                  |
| fin             | string    | Hora de fin (HH:MM)                                     |
| dia             | string    | Día de la semana en español ("Lunes", "Martes", etc.)   |
| diasSemana      | array     | Arreglo con el/los días                                 |
| cupo            | number    | Cupo total de alumnos                                   |
| cupoDisponible  | number    | Lugares restantes (se decrementa al reservar)           |
| precio          | number    | Precio regular                                          |
| precioPronto    | number    | Precio pronto pago                                      |
| icon            | string    | Emoji/ícono representativo                              |
| profesor        | string    | Nombre del profesor asignado                            |
| activa          | boolean   | Si la clase está activa/publicada                       |
| timestamp       | timestamp | Fecha de creación/actualización                         |

---

### `alumnos` — Registro de alumnos

| Campo             | Tipo    | Descripción                                    |
|-------------------|---------|------------------------------------------------|
| nombre            | string  | Nombre completo                                |
| curp              | string  | CURP (18 caracteres)                           |
| nivel             | string  | Nivel/categoría                                |
| pago              | number  | Monto de inscripción                           |
| pin               | string  | PIN de acceso                                  |
| condicion         | string  | `ALUMNO_INTERNO` o `ALUMNO_EXTERNO`            |
| matricula         | string  | Matrícula                                      |
| correo            | string  | Correo electrónico                             |
| celular           | string  | Número de celular                              |
| fechaRegistro     | string  | Fecha de registro (formato es-MX)              |
| vencimiento       | string  | Fecha de vencimiento membresía (YYYY-MM-DD)    |
| estatus           | string  | `INACTIVO` o `ACTIVO`                          |
| inscripcionPagada | boolean | Si la inscripción fue pagada                   |
| primerAcceso      | boolean | Flag de primer acceso al sistema               |
| password          | string  | Contraseña de acceso                           |
| ultimoPago        | string  | Fecha del último pago                          |

---

### `reservas` — Reservas/apartados de clases

| Campo            | Tipo    | Descripción                                      |
|------------------|---------|--------------------------------------------------|
| alumnoId         | string  | ID del alumno (referencia a `alumnos`)           |
| alumnoNombre     | string  | Nombre del alumno (desnormalizado)               |
| claseId          | string  | ID de la clase (referencia a `catalogo`)         |
| claseNombre      | string  | Nombre de la clase (desnormalizado)              |
| area             | string  | `"fitness"` o `"gimnasia"`                       |
| folio            | string  | Folio único del pedido (IBY-PAG-##########)      |
| estado           | string  | `"pre-reserva"` o `"confirmada"`                 |
| alertaMostrada   | boolean | Si se mostró la alerta de confirmación al alumno |
| fechaConfirmacion| string  | Fecha de confirmación de pago (es-MX)            |
| frecuenciaSem    | number  | Clases por semana seleccionadas                  |
| timestamp        | number  | Timestamp en ms de creación                      |
| dia              | string  | Día de la semana de la clase                     |
| hora             | string  | Hora de inicio (HH:MM)                           |
| horaFin          | string  | Hora de fin (HH:MM)                              |
| profesor         | string  | Nombre del profesor                              |
| pasesTotal       | number  | Total de pases/sesiones compradas                |
| pasesRestantes   | number  | Pases restantes (se decrementa al pasar lista)   |
| asistencia       | boolean | `true` si el profesor marcó asistencia           |
| falta            | boolean | `true` si el profesor marcó inasistencia         |

---

### `pagos` — Registro de pagos

| Campo      | Tipo      | Descripción                                        |
|------------|-----------|----------------------------------------------------|
| alumnoId   | string    | ID del alumno                                      |
| nombre     | string    | Nombre del alumno                                  |
| monto      | number    | Monto pagado                                       |
| detalle    | string    | Descripción del pago                               |
| folio      | string    | Folio del pedido                                   |
| fecha      | timestamp | Fecha/hora del pago                                |
| fechaString| string    | Fecha en formato es-MX                             |
| metodo     | string    | `EFECTIVO`, `TRANSFERENCIA`, o `APP_PENDIENTE`     |
| referencia | string    | Referencia de transferencia (opcional)             |

---

### `asistencias` — Registro de asistencia por sesión

| Campo          | Tipo      | Descripción                                     |
|----------------|-----------|-------------------------------------------------|
| alumnoId       | string    | ID del alumno                                   |
| alumnoNombre   | string    | Nombre del alumno                               |
| claseId        | string    | ID de la clase                                  |
| claseNombre    | string    | Nombre de la clase                              |
| profesorId     | string    | ID del profesor                                 |
| profesorNombre | string    | Nombre del profesor                             |
| fecha          | string    | Fecha en formato YYYY-MM-DD                     |
| hora           | string    | Hora del registro                               |
| tipo           | string    | `presente`, `ausente`, `tarde`, `justificado`   |
| timestamp      | timestamp | Timestamp del servidor                          |

---

### `profesores` — Catálogo de profesores

| Campo     | Tipo      | Descripción          |
|-----------|-----------|----------------------|
| nombre    | string    | Nombre del profesor  |
| createdAt | timestamp | Fecha de registro    |

---

### `config` — Configuración del sistema

| Documento           | Campos              | Descripción                        |
|---------------------|---------------------|------------------------------------|
| `contador_alumnos`  | `ultimo_numero`     | Contador para generar IDs de alumnos|
| `contador_pagos`    | `ultimo_numero`     | Contador para generar folios       |
| `costos_fitness`    | estructura de costos| Precios de paquetes fitness        |
| `costos_gimnasia`   | estructura de costos| Precios de paquetes gimnasia       |

---

## Flujo completo de datos

```
Admin publica clase
  → catalogo/{id} {activa:true, dia, inicio, fin, profesor, cupo, ...}
  
Alumno selecciona clase y horario
  → Al hacer checkout: reservas/{id} {estado:'pre-reserva', dia, hora, pasesTotal, ...}
  → rtdb/estatus_acceso/{alumnoId} {folio, monto, ...}

Recepción ve pre-reserva en tiempo real (onSnapshot)
  → Al cobrar: pagos/{id} {monto, metodo, ...}
  → reservas/{id} {estado:'confirmada', fechaConfirmacion}
  → alumnos/{id} {estatus:'ACTIVO', ultimoPago}

Alumno ve clase confirmada (onSnapshot en reservas)
  → Banner de estado por tiempo: 30 min antes / comenzó / terminada
  → checkClaseActual() corre cada 60s con setInterval

Profesor ve inscritos en tiempo real (onSnapshot en reservas)
  → Al pasar lista: asistencias/{id} {tipo, fecha, ...}
  → reservas/{id} {pasesRestantes:-1, asistencia/falta}

Alumno ve actualización de pases en tiempo real (onSnapshot en reservas)
```

## Reglas de Firestore recomendadas

### Modo prueba (desarrollo)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

> ⚠️ **Solo para desarrollo.** Estas reglas permiten acceso público total.

### Modo producción (mínimo recomendado)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Catálogo: lectura pública, escritura solo desde admin
    match /catalogo/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    // Alumnos: solo lectura/escritura autenticada
    match /alumnos/{alumnoId} {
      allow read, write: if request.auth != null;
    }
    // Reservas, pagos, asistencias: solo autenticados
    match /reservas/{id} {
      allow read, write: if request.auth != null;
    }
    match /pagos/{id} {
      allow read, write: if request.auth != null;
    }
    match /asistencias/{id} {
      allow read, write: if request.auth != null;
    }
    match /profesores/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /config/{id} {
      allow read, write: if request.auth != null;
    }
  }
}
```

> Nota: el sistema actual no usa Firebase Auth, por lo que en producción real se recomienda implementar autenticación (con PIN/email) para aplicar reglas por rol.

## Cómo probar el flujo end-to-end

1. **Admin publica una clase:**
   - Abre `gymnastics_admin_clases.html`
   - Agrega o edita una clase con nombre, día, hora inicio/fin, profesor y cupo
   - Haz clic en "Publicar" → debe aparecer en Firestore bajo `catalogo`

2. **Alumno reserva:**
   - Abre `gymnastics_alumno.html`
   - Inicia sesión con un ID de alumno (ej. `IBI-GYM000001`) y su PIN
   - Selecciona área → disciplina → frecuencia → **aparecerán los horarios del catálogo**
   - Selecciona un horario y confirma el carrito
   - Se crea una `reserva` con `estado:'pre-reserva'` y aparece el QR de pago

3. **Recepción confirma pago:**
   - Abre `gymnastics_recepcion.html`
   - En el panel "Pre-reservas" aparece el alumno (en tiempo real)
   - Busca al alumno por ID o escanea el QR
   - Registra el cobro → la reserva cambia a `estado:'confirmada'`

4. **Alumno ve clase activa:**
   - En `gymnastics_alumno.html`, en "Mis Clases" aparece la clase con horario
   - 30 min antes: banner "Tu clase inicia en X min"
   - Durante: banner "Tu clase comenzó"
   - Después sin asistencia: banner "Clase terminada — pase descontado"

5. **Profesor ve y pasa lista:**
   - Abre `gymnastics_profesores.html`
   - Selecciona su nombre e ingresa contraseña (`gymnastics2026`)
   - Sus clases aparecen en tiempo real (actualizadas al confirmarse pagos)
   - Al seleccionar una clase, ve la lista de alumnos inscritos
   - Marca presente/ausente/tarde/justificado y guarda
   - Se descuenta 1 pase por alumno marcado y se registra en `asistencias`

## Despliegue en GitHub Pages

No se requiere build ni Node.js. Solo sube los archivos y activa GitHub Pages desde la rama `main` (o el branch que uses):

1. Ve a Settings → Pages → Source: `main` branch, root `/`
2. Asegúrate de que los 4 HTML y la carpeta `assets/` estén en la raíz del repositorio
3. Las rutas relativas `assets/js/firebase-init.js` y `assets/js/schema.js` funcionan automáticamente

## Notas de migración

- Los campos `dia`, `hora`, `horaFin`, `profesor`, `pasesTotal`, `pasesRestantes` son **nuevos** en `reservas`. Las reservas existentes no los tendrán; la UI los trata como opcionales.
- Los campos `asistencia` y `falta` son **nuevos** en `reservas`. Se establecen al guardar la lista del profesor.
- La colección `catalogo` NO ha cambiado; los documentos existentes siguen siendo compatibles.
