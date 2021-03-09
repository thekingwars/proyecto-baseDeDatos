import database from '../db';


export const contactMe = (req, res) => {
    const { nombre, apellido, correo, telefono, descripcion, empresa } = req.body
    let sql = 'INSERT INTO contact SET ?'
    let data = {
        nombre,
        apellido,
        correo,
        telefono,
        descripcion,
        empresa
    }

    if(!nombre || !apellido || !correo || !descripcion){
        return res.status(400).json({ok: false, err: 'Campos requeridos'});
    }

    database.query(sql, data, (err, results) => {
        if (err) {
            return res.status(500).json({ok: false, err: 'Ha ocurrido un error al registrar por favor intentelo de nuevo'});
        }
        else{
            return res.status(201).json({ok: true, message: 'Se ha enviado correctamente la información'})
        }
    })
}


export const allContact = (req, res) => {
    let sql = 'SELECT * FROM contact'

    database.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ok: false, err: 'Ha ocurrido un error al registrar por favor intentelo de nuevo'});
        }
        else{
            if(results.length === 0){
                return res.status(401).json({ok: false, err: 'No existen contactos aún'});
            }
            else{
                return res.status(200).json({ok: true, results})
            }   
        }
    })
}


export const getContact = (req, res) => {
    let sql = 'SELECT * FROM contact WHERE id = ?'

    database.query(sql, req.params.id, (err, results) => {
        if (err) {
            return res.status(500).json({ok: false, err: 'Ha ocurrido un error al registrar por favor intentelo de nuevo'});
        }
        else{
            return res.status(200).json({ok: false, contact: results[0]});
        }
    })
}