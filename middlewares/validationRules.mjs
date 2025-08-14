import sanitizeHTML from 'sanitize-html'
import { body } from 'express-validator'

export const agregarValidationRules = (req, res) => [
  body('nombreSuperHeroe')
    .trim()
    .escape()
    .notEmpty().withMessage('El nombre del Superhéroe es requerido')
    .isLength( {min: 3, max: 60} ).withMessage('El nombre del Superhéroe debe tener entre 3 y 60 caracteres.'),
  body('nombreReal')
    .trim()
    .escape()
    .notEmpty().withMessage('El nombre real del Superhéroe es requerido')
    .isLength( {min: 3, max: 60} ).withMessage('El nombre real del Superhéroe debe tener entre 3 y 60 caracteres.'),
  body('edad')
    .notEmpty().withMessage('La edad del Superhéroe es requerida.')
    .isInt({min: 0}).withMessage('Solo se pueden ingresar valores enteros positivos.'),
    // .isLength({min: 0}).withMessage('No se permiten edades negativas.'),
  body('poderes')
    .isArray().withMessage('La lista de poderes debe ser un array.'),
  body('poderes.*')
    .customSanitizer(value => sanitizeHTML(value, {
      allowedTags: [], // Sin etiquetas HTML permitidas
      allowedAttributes: {}
    }))
    .isString().withMessage('Cada poder debe ser una cadena de texto')
    .trim()
    .notEmpty().withMessage('Los poderes no pueden estar vacíos.')
    .isLength({min: 3, max: 60}).withMessage('Cada poder debe tener entre 3 y 60 caracteres'),
  body('poderes')
    .isLength({min: 1}).withMessage('La lista de poderes no puede estar vacía.')
]