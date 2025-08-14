import express from 'express'
import { connectDB } from './config/dbConfig.mjs'
import superHeroRoutes from './routes/superHeroRoutes.mjs'
import methodOverride from 'method-override'
import path from 'path'
import expressLayouts from 'express-ejs-layouts'



const app = express()
const PORT = process.env.PORT || 3000

/* Middleware para parsear JSON */
app.use(express.json())
/* Middleware para trabajar con formularios. application/x-www-form-urlencoded */
app.use(express.urlencoded({ extended: true }))
/* Middleware para trabajar con el método put desde un formulario */
app.use(methodOverride('_method'))

/* Configuramos EJS como Motor de Vistas */
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

/* Configuramos Express Layouts */
app.use(expressLayouts)
app.set('layout', 'layout') // Archivo base de Layout

/* Middleware para servir archivos estáticos */
app.use(express.static(path.resolve('./public')))

/* Conexión a MongoDB */
connectDB()

/* Configuración de Rutas */
app.use('/api', superHeroRoutes)

/* Manejo de errores para rutas no encontradas */
app.use((req, res) => {
  res.status(404).send( {mensaje: 'Ruta no encontrada' })
})


app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))