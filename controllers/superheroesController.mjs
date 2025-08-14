import { obtenerSuperheroePorId, obtenerTodosLosSuperheroes, buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30, agregarSuperheroe, actualizarSuperheroePorId, eliminarSuperheroePorId, eliminarSuperheroePorNombreSuperheroe } from '../services/superheroesServices.mjs'

import { renderizarSuperheroe, renderizarListaSuperheroes } from '../views/responseView.mjs'


export async function obtenerSuperheroePorIdController(req, res) {
  try {
    const { id } = req.params
    const superheroe = await obtenerSuperheroePorId(id)
    if (!superheroe) {
      return res.status(404).send( {mensaje: 'Superheroe no encontrado' })
    }

    res.render('viewConfirmDeleteSuperhero', { superheroe })
    // const superheroeFormateado = renderizarSuperheroe(superheroe)
    // res.status(200).json(superheroeFormateado)

  } catch (error) {
    res.status(500).send( { mensaje: 'Error al obtener el superhéroe', error: error.message })
  }
}

export async function obtenerTodosLosSuperheroesController(req, res) {
  try {
    const superheroes = await obtenerTodosLosSuperheroes()

    // const superheroesFormateados = renderizarListaSuperheroes(superheroes)
    // res.status(200).json(superheroesFormateados)
    res.render('dashboard', { superheroes })
  } catch (error) {
    res.status(500).send( {mensaje: 'Error al obtener los superhéroes', error: error.message })
  }
}

export async function buscarSuperheroesPorAtributoController(req, res) {
  try {
    const { atributo, valor } = req.params
    const superheroes = await buscarSuperheroesPorAtributo(atributo, valor)
    if (superheroes.length === 0) {
      return res.status(404).send( {mensaje: 'No se encontraron superhéroes con ese atributo' })
    }

    const superheroesFormateados = renderizarListaSuperheroes(superheroes)
    res.status(200).json(superheroesFormateados)
  } catch (error) {
    res.status(500).send( {mensaje: 'Error al buscar los superhéroes', error: error.message })
  }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
  try {
    const superheroes = await obtenerSuperheroesMayoresDe30()
    if (superheroes.length === 0) {
      return res.status(404).send( {mensaje: 'No se encontraron superhéroes mayores de 30 años' })
    }

    const superheroesFormateados = renderizarListaSuperheroes(superheroes)
    res.status(200).json(superheroesFormateados)
  } catch (error) {
    res.status(404).send( {mensaje: 'Error al obtener superhéroes mayores de 30', error: error.message })
  }
}

export function agregarSuperheroeFormController(req, res) {
  res.status(200).render('addSuperhero')
}

export async function agregarSuperheroeController(req, res) {
  try {
    const nuevoSuperheroe = await agregarSuperheroe(req.body)
    if (nuevoSuperheroe)
      await res.redirect('/api/heroes')

  } catch (error) {
    res.status(409).send( { mensaje: 'Error al agregar el Superheroe', error: error.message })
  }
}

export async function editarSuperheroePorIdFormController(req, res) {
  try {
    const { id } = req.params
    const superheroe = await obtenerSuperheroePorId(id)
    if (id === null) {
      throw new Error(`No se encontró el Superhéroe con ID: ${id}`)
    }
    res.render('editSuperhero', { superheroe })
  } catch (error) {
    res.status(404).send({mensaje: 'Error al actualizar el Superhéroe', error: error.message})
  }
}

export async function actualizarSuperheroePorIdController(req, res) {
  try {
    const { id } = req.params
    const buscarId = await obtenerSuperheroePorId(id)
    if (buscarId === null) {
      throw new Error(`No se encontró el Superhéroe con ID: ${id}`)
    }
    const atributosSuper = req.body
    // const superheroe = await actualizarSuperheroePorId(id, atributosSuper)
    await actualizarSuperheroePorId(id, atributosSuper)
    // const superheroeFormateado = renderizarSuperheroe(superheroe)
    return await res.redirect('/api/heroes')

  } catch (error) {
    res.status(404).send({mensaje: 'Error al actualizar el Superhéroe', error: error.message})
  }
}

export async function eliminarSuperheroePorIdController(req, res) {
  try {
    const { id } = req.params
    const buscarId = await obtenerSuperheroePorId(id)
    if (buscarId === null) {
      throw new Error(`No se encontró el Superhéroe con ID: ${id}`)
    }
    await eliminarSuperheroePorId(id)
    await res.redirect('/api/heroes')

  } catch (error) {
    res.status(404).send({mensaje: 'Error al eliminar el Superhéroe', error: error.message})
  }
}

export async function eliminarSuperheroePorNombreSuperheroeController(req, res) {
    try {
    const { nombreSuperHeroe } = req.params
    const superheroeEliminado = await eliminarSuperheroePorNombreSuperheroe(nombreSuperHeroe)
    if (superheroeEliminado === null) {
      throw new Error(`No se encontró el Superhéroe con nombre: ${nombreSuperHeroe}`)
    }
    const superheroeFormateado = renderizarSuperheroe(superheroeEliminado)
    res.status(200).json(superheroeFormateado)

  } catch (error) {
    res.status(404).send({mensaje: 'Error al eliminar el Superhéroe', error: error.message})
  }
}