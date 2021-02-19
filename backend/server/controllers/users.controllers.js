import database from '../db';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { configs } from '../config/config'
import { OAuth2Client } from 'google-auth-library'

const client = new OAuth2Client(configs.clientId);


async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: configs.clientId,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();

    console.log(payload)
  }

export const register = (req, res) => {

    const { nombre, apellido, correo, contrasena } = req.body
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

    database.query(sql, data, function(error, results){
        if(error){
            if(!nombre || !apellido || !correo || !contrasena){
                return res.status(400).json({ok: 'false', err: 'Campos requeridos'});
            }

            if(contrasena.length < 6){
                return res.status(401).json({ok: 'false', err: 'La contraseña minimo debe tener 6 caracteres'})
            }

            database.query(correoExist, correo, function(err, results){
                if(results[0].correo === correo){
                   res.status(401).json({ok: 'false', err: 'correo existente'});
                }
            })
        }
        else{
            let token = jwt.sign({id: results.insertId}, configs.secretKey, {
                expiresIn: configs.expireToken
            })
            return res.status(201).json({ok: 'true', token})
        }
    })
}


export const login = (req, res) => {
    const { correo, contrasena } = req.body

    let sql = `SELECT * FROM users WHERE correo = ?`

    database.query(sql, correo, (err, results) => {
        if(results[0].correo === correo){
            res.status(401).json({ok: 'false', err: 'correo existente'});
         }
        else{
            if(bcrypt.compareSync(contrasena, results[0].contrasena)){
                let token = jwt.sign({user: results[0].id}, configs.secretKey, {
                    expiresIn: configs.expireToken
                })

               res.status(201).json({ok: 'true', token})
            }
            else{
                res.status(401).json({ok: 'false', err: 'correo o contraseña incorrecta'})
            } 
        }
    })

}

export const google = (req, res) => {
    let token = req.body.idtoken

    verify(token)

    res.status(200).json({token})
}