import mysql from 'mysql'

const myConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proyecto_bd'
})


myConnection.connect(function(err){
    if(err){
        console.log('Ha ocurrido un error con la conexión: ' + err)
        return
    }

    console.log('Nos hemos conectado con éxito en la base de datos')
})

export default myConnection