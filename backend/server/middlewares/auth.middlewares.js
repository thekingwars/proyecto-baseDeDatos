import jwt from 'jsonwebtoken'
import { configs } from '../config/config'


export const notToken = (req, res, next) => {
    if(!req.headers.authorization){
        res.status(401).json({msg: "Acceso no autorizado" })
    }
    else{
        let token = req.headers.authorization.split(" ")[1]

        jwt.verify(token, configs.secretKey, (err, decode) => {
            if(err){
                res.status(500).json({err: 'Token invalido'})
            }
            else{
                req.decode = decode
                next();
            }
        })
    }
}