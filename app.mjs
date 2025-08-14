import express from 'express'
import { connectDB } from './config/dbConfig.mjs'
import superHeroRoutes from './routes/superHeroRoutes.mjs'
import methodOverride from 'method-override'



const app = express()
const PORT = process.env.PORT || 3000

/* Middleware para parsear JSON */
app.use(express.json())
/* Middleware para trabajar con formularios. application/x-www-form-urlencoded */
app.use(express.urlencoded({ extended: true }))
/* Middleware para trabajar con el método put desde un formulario */
app.use(methodOverride('_method'))
/* Middleware para servir archivos estáticos */
app.use(express.static('public'))

/* Configuramos EJS como Motor de Vistas */
app.set('view engine', 'ejs')

/* Conexión a MongoDB */
connectDB()

/* Configuración de Rutas */
app.use('/api', superHeroRoutes)

/* Manejo de errores para rutas no encontradas */
app.use((req, res) => {
  res.status(404).send( {mensaje: 'Ruta no encontrada' })
})


app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))