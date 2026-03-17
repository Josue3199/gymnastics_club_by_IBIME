/**
 * schema.js
 * Constantes de colecciones y campos de Firestore.
 * Usadas como referencia central para evitar errores de tipeo.
 *
 * Esquema de datos:
 *
 * catalogo/{id}
 *   nombre, tipo ('clase'|'producto'), area ('fitness'|'gimnasia'),
 *   inicio (HH:MM), fin (HH:MM), dia (nombre en español),
 *   diasSemana (array), cupo (number), cupoDisponible (number),
 *   precio (number), precioPronto (number), icon (string),
 *   profesor (string), activa (boolean), timestamp (serverTimestamp)
 *
 * alumnos/{id}
 *   nombre, curp, nivel, pago, pin, condicion, matricula,
 *   correo, celular, fechaRegistro, vencimiento (YYYY-MM-DD),
 *   estatus ('INACTIVO'|'ACTIVO'), inscripcionPagada (bool),
 *   primerAcceso (bool), password, ultimoPago
 *
 * reservas/{id}
 *   alumnoId, alumnoNombre, claseId, claseNombre, area,
 *   folio, estado ('pre-reserva'|'confirmada'),
 *   alertaMostrada (bool), fechaConfirmacion,
 *   frecuenciaSem (number|null), timestamp (number ms),
 *   dia, hora (HH:MM), horaFin (HH:MM), profesor,
 *   pasesTotal (number), pasesRestantes (number)
 *
 * pagos/{id}
 *   alumnoId, nombre, monto, detalle, folio,
 *   fecha (timestamp), fechaString, metodo, referencia?
 *
 * asistencias/{id}
 *   alumnoId, alumnoNombre, claseId, claseNombre,
 *   profesorId, profesorNombre, fecha (YYYY-MM-DD), hora,
 *   tipo ('presente'|'ausente'|'tarde'|'justificado'),
 *   timestamp (serverTimestamp), registradoEn?
 *
 * profesores/{id}
 *   nombre, createdAt
 *
 * config/contador_alumnos  -> ultimo_numero
 * config/contador_pagos    -> ultimo_numero
 * config/costos_fitness    -> structure for cost tiers
 * config/costos_gimnasia   -> structure for cost tiers
 */
var COL = {
  CLASES:       'catalogo',
  ALUMNOS:      'alumnos',
  RESERVAS:     'reservas',
  PAGOS:        'pagos',
  ASISTENCIAS:  'asistencias',
  PROFESORES:   'profesores',
  CONFIG:       'config'
};

var ESTADO_RESERVA = {
  PRE_RESERVA: 'pre-reserva',
  CONFIRMADA:  'confirmada'
};

var ESTATUS_ALUMNO = {
  ACTIVO:   'ACTIVO',
  INACTIVO: 'INACTIVO'
};

var TIPO_ASISTENCIA = {
  PRESENTE:    'presente',
  AUSENTE:     'ausente',
  TARDE:       'tarde',
  JUSTIFICADO: 'justificado'
};
