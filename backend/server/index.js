//librerías
import express from 'express'
import morgan from 'morgan'
import routes from './routes/routes'


//inicializaciones
const app = express()

//Variables globales
app.set('port', 3000 || process.env.PORT)

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//routers
app.use(routes)

//Servidor
app.listen(app.get('port'), () => {
    console.log('Servidor iniciado en el puerto:', app.get('port'))
})