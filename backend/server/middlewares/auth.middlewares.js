import jwt from 'jsonwebtoken'
import { configs } from '../config/config'


export const notToken = (req, res, next) => {
/*     const token = req.headers['access-token'];

    if(token){
        jwt.verify(token, configs.secretKey, (err, decode) => {
            if(err){
                res.status(404).json({err: 'Token invalido'})
            }
            else{
                req.decode = decode
                next()
            }
        })
    }
    else{
        res.status(404).json({err: 'Token no proveido'})
    } */

    if(!req.headers.authorization){
        res.status(401).json({msg: "Acceso no autorizado" })
    }
    else{
        let token = req.headers.authorization.split(" ")[1]

        jwt.verify(token, configs.secretKey, (err, decode) => {
            if(err){
                res.status(401).json({err: 'Token invalido'})
            }
            else{
                req.decode = decode
                next();
            }
        })
    }
}