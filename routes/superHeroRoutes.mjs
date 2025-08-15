import { Router } from 'express'
import { obtenerSuperheroePorIdController, obtenerTodosLosSuperheroesController, buscarSuperheroesPorAtributoController, obtenerSuperheroesMayoresDe30Controller, agregarSuperheroeController, agregarSuperheroeFormController, actualizarSuperheroePorIdController, editarSuperheroePorIdFormController, eliminarSuperheroePorIdController, eliminarSuperheroePorNombreSuperheroeController } from '../controllers/superheroesController.mjs'
import { parseStringToArray } from '../middlewares/parseStringToArray.mjs'
import { agregarValidationRules } from '../middlewares/validationRules.mjs'
import { handleValidationErros } from '../middlewares/errorMiddleware.mjs'

const router = Router()

router.get('/heroes', obtenerTodosLosSuperheroesController)
router.get('/heroes/heroe/mayores-30', obtenerSuperheroesMayoresDe30Controller)
router.get('/heroes/heroe/:id', obtenerSuperheroePorIdController)
router.get('/heroes/heroe/atributo/:atributo/:valor', buscarSuperheroesPorAtributoController)

router.post('/heroes/agregar', parseStringToArray, agregarValidationRules(), handleValidationErros, agregarSuperheroeController) // Agregar un superhéroe
// router.post('/heroes/agregar', agregarSuperheroeController) // Agregar un superhéroe

// router.put('/heroes/:id', agregarValidationRules(), handleValidationErros,actualizarSuperheroePorIdController) // Actualizar un superhéroe por Id
router.put('/heroes/:id', parseStringToArray, agregarValidationRules(), handleValidationErros, actualizarSuperheroePorIdController) // Actualizar un superhéroe por Id


router.delete('/heroes/:id', eliminarSuperheroePorIdController)
router.delete('/heroes/nombreSuperheroe/:nombreSuperHeroe', eliminarSuperheroePorNombreSuperheroeController)

/* Endpoint para formulario Agregar Superhéroe */
router.get('/heroes/formAgregar', agregarSuperheroeFormController)
/* Endpoint para formulario Editar Superheroe */
router.get('/heroes/:id/editar', editarSuperheroePorIdFormController)


export default router
