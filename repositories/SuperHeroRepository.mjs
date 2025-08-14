import SuperHero from "../models/SuperHero.mjs"
import IRepository from "./IRepository.mjs"

class SuperHeroRepository extends IRepository {
  async obtenerPorId(id) {
    return await SuperHero.findById(id)
  }

  async obtenerTodos() {
    return await SuperHero.find({})
  }

  async buscarPorAtributo(atributo, valor) {
    return await SuperHero.find({ [atributo]: valor })
  }

  async obtenerMayoresDe30() {
    return await SuperHero.find({
      edad: { $gt: 30 },
      planetaOrigen: 'Tierra',
      $expr: { $gte: [{ $size: '$poderes' }, 2] }
    })
  }

  async agregar(superheroe) {
    return await SuperHero.create(superheroe)
  }
  
  async actualizar(id, atributos) {
    return await SuperHero.findByIdAndUpdate(id, atributos, { new: true})
    // return await SuperHero.findOneAndUpdate({id:id}, atributos, { new: true})
  }

  async eliminarPorId(id) {
    return await SuperHero.findByIdAndDelete(id)
    // return await SuperHero.findOneAndDelete({id: id})
  }

  async eliminarPorNombre(nombre) {
    return await SuperHero.findOneAndDelete({ nombreSuperHeroe: nombre})
  }
}

export default new SuperHeroRepository();
