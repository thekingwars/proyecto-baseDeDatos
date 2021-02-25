//librerías
import express from 'express'
import morgan from 'morgan'
import routes from './routes/routes'
import bodyParser from 'body-parser'
import path from 'path'
import cors from 'cors'

//inicializaciones
const app = express()

//Variables globales
app.set('port', 3000 || process.env.PORT)

//middleware
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}))

//statics file
app.use(express.static(path.join(__dirname, './public')))

//routers
app.use(routes)

//Servidor
app.listen(app.get('port'), () => {
    console.log('Servidor iniciado en el puerto:', app.get('port'))
})