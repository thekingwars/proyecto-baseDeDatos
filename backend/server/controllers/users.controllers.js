import database from '../db';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { transporter } from '../config/mailer'
import {configs} from '../config/config'
import {OAuth2Client} from 'google-auth-library'

const client = new OAuth2Client(configs.clientId);


async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: configs.clientId,  // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();

  return {
    nombre: payload.name.split(' ')[0],
    apellido: payload.name.split(' ')[1],
    correo: payload.email,
    google: true,
  }

}

export const register = (req, res) => {
  /*NOTA: consejo practico envuelve tod dentro de un try/catch y manejas un manejador global con un next(err)
   o simplemente envuelves el codigo posiblemente que pueda tener errores con un try/catch */
  const {nombre, apellido, correo, contrasena} = req.body
  const salt = bcrypt.genSaltSync(10)
  let password = bcrypt.hashSync(contrasena, salt)
  let sql = `INSERT INTO users SET ?`
  let correoExist = `SELECT * FROM users WHERE correo = ?`
  let data = {
    nombre,
    apellido,
    correo,
    contrasena: password
  }

  if (!nombre || !apellido || !correo || !contrasena) {
    return res.status(400).json({ok: false, err: 'Campos requeridos'});
  }

  if (contrasena.length < 6) {
    return res.status(406).json({ok: false, err: 'La contraseña minimo debe tener 6 caracteres'})
  }

  database.query(correoExist, correo, (err, results) => {
    if (results.length > 0) {
      if (results[0].correo === correo) {
        return res.status(406).json({ok: false, err: 'correo existente'});
      }
    }
    database.query(sql, data, (error, results) => {
      if (error) {
        return res.status(500).json({ok: false, err: 'Ha ocurrido un error al registrar por favor intentelo de nuevo'});
      } else {
        let token = jwt.sign({id: results.insertId}, configs.secretKey, {
          expiresIn: configs.expireToken
        })
        return res.status(201).json({ok: true, token})
      }
    })
  })
}


export const login = (req, res) => {
  const {correo, contrasena} = req.body

  let sql = `SELECT * FROM users WHERE correo = ?`

  database.query(sql, correo, (err, results) => {

    if(err){
      return res.status(500).json({ok: false, err: 'Ha ocurrido un error inesperado, por favor vuelva a intentarlo'})
    }
    if (results.length === 0) {
      return res.status(400).json({ok: 'false', err: 'correo inexistente, por favor registrese'});
    } else {
      if (bcrypt.compareSync(contrasena, results[0].contrasena)) {
        let token = jwt.sign({user: results[0].id}, configs.secretKey, {
          expiresIn: configs.expireToken
        })
        return res.status(201).json({ok: true, token})
      } else {
        return res.status(401).json({ok: 'false', err: 'correo o contraseña incorrecta'})
      }
    }
  })
}

export const google = async (req, res) => {

  let sql = 'SELECT * FROM users WHERE correo = ?'
  let token = req.body.idtoken
  let googleUser = await verify(token)

  database.query(sql, googleUser.correo, (err, results) => {
    if(err){
      return res.status(500).json({ok: false, err: 'Ha ocurrido un error al iniciar sesion por favor intentelo de nuevo'});
    }
    else{
      if(results.length > 0){
        if(results[0].google == false){
          return res.status(400).json({ok: false, err: 'Usted ya esta autenticado, con otra cuenta'})
        }
        else{
          let token = jwt.sign({user: results[0].id}, configs.secretKey, {
            expiresIn: configs.expireToken
          })

          return res.status(200).json({ok: true, usuario: results[0], token})
        }
      }
      else{
        //si el usuario no existe en nuestra base de datos

        let sql = `INSERT INTO users SET ?`
        let usuario = {
          nombre: googleUser.nombre,
          apellido: googleUser.apellido,
          correo: googleUser.correo,
          contrasena: 'Usuario registrado con google',
          google: googleUser.google
        }

        database.query(sql, usuario, (err, results) => {
          if(err){
            return res.status(500).json({ok: false, err});
          }
          else{
            let token = jwt.sign({id: results.insertId}, configs.secretKey, {
              expiresIn: configs.expireToken
            })
            return res.status(201).json({ok: true, user: results[0], token})
          }
        })

      }
    }
  })
}


export const verifyEmail =  (req, res) => {
  const { correo } = req.body
  let sql = 'SELECT * FROM users WHERE correo = ?'


  if(!correo){
    return res.status(400).json({ok: 'false', err: 'El correo es necesario'})
  }

  database.query(sql, correo, async (err, results) => {
    if(err){
      return res.status(500).json({ok: 'false', err: 'Ha ocurrido un error inesperado, por favor intentelo de nuevo: ' + err})
    }
    else{
      if(results.length > 0){
        let token = jwt.sign({user: results[0].id}, configs.secretKey, {
          expiresIn: '5min'
        })

        let direcction = `localhost:4200/new-password/${token}`

          // send mail with defined transport object
        await transporter.sendMail({
          from: '"Fred Foo 👻" <carlosguerra2001.2@gmail.com>', // sender address
          to: results[0].correo, // list of receivers
          subject: "Hello ✔", // Subject line
          html: `
          <b>Hello world?</b> 
          
          <br> 
          
          <a href="${direcction}" target="_blank">${direcction}</a>

          `, // html body
        });

        return res.status(201).json({ok: true, token, msg: 'Se ha enviado un correo'})
      }
      else{
        return res.status(400).json({ok: 'false', err: 'El correo no existe'})
      }
    }
  })

}


export const resetPassword = (req, res) => {
  const { token } = req.params
  const { newPassword, repeatPassword } = req.body
  const salt = bcrypt.genSaltSync(10)
  console.log(token)

  let newPasswordEncrypt = bcrypt.hashSync(newPassword, salt)

  let data = {
    contrasena: newPasswordEncrypt
  }

  let sql = 'UPDATE users set ? WHERE id = ?'

  if(!repeatPassword || !newPassword){
    return res.status(400).json({ok: false, err: 'Campos requeridos'});
  }

  if(repeatPassword !== newPassword){
    return res.status(400).json({ok: false, err: 'Las contraseñas no coinciden'});
  }

  if(!token){
    res.status(404).json({err: 'Debe verificar su email y leer su correo'})
  }
  else{
    jwt.verify(token, configs.secretKey, (err, decode) => {
      if(err){
        res.status(500).json({err: 'Token invalido'})
      }
      else{
        database.query(sql, [data, decode.user], (err, results) => {
          if(err){
            return res.status(500).json({ok: false, err: 'Ha ocurrido un error inesperado', err})
          }
          else{
            return res.status(201).json({ok: true, msg: 'Contraseña actualizada con exito'})
          } 
        })
      }
    })
  }

}