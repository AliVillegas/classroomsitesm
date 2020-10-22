// Importamos express-validators para ayudarnos a implementar las reglas
// de validación
const { check, body } = require('express-validator');

exports.isSuperAdmin = () => {
  return false
}