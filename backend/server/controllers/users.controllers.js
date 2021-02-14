import database from '../db';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { configs } from '../config/config'


export const register = (req, res) => {

    const { nombre, apellido, correo, contraseña } = req.body
    const salt = bcrypt.genSaltSync(10)
    let password = bcrypt.hashSync(contraseña, salt)
    let sql = `INSERT INTO users SET ?`
    let correoExist = `SELECT * FROM users WHERE correo = ?`
    let data = {
        nombre,
        apellido,
        correo,
        contraseña: password
    }
    
    if(!nombre || !apellido || !correo || !contraseña){
        res.status(400).json({ok: 'false', err: 'Campos requeridos'});
    }

    if(contraseña.length < 6){
        res.status(401).json({ok: 'false', err: 'La contraseña minimo debe tener 6 caracteres'})
    }

    database.query(correoExist, correo, function(err, results){
        if(results[0]){
           res.status(401).json({ok: 'false', err: 'correo existente'});
        }
    })

    database.query(sql, data, function(error, results){
        if(error){
            console.log('Ha ocurrido un error: ' + error);
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
    const { correo, contraseña } = req.body

    let sql = `SELECT * FROM users WHERE correo = ?`

    database.query(sql, correo, (err, results) => {
        if(err){
            res.status(401).json({ok: 'false', err: 'El correo no existe'})
        }
        else{
            if(bcrypt.compareSync(contraseña, results[0].contraseña)){
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