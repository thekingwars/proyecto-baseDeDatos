import database from '../db';
import multer from 'multer';
import { storage } from '../config/multer'
import { pathCloudinary } from '../config/cloudinary'
import fs from 'fs/promises'


export const uploader = multer({
    storage
}).fields([{
    name: 'img_animal',
    maxCount: 5
}])

export const indexAnimal = (req, res) => {
    let sql = `SELECT a1.*, b1.name "name_estate" 
               FROM animal a1 JOIN estate b1 ON a1.fk_estate = b1.id_estate
               ORDER BY id_animal LIMIT ? OFFSET ?`
    const { limit, offset } = req.query

    database.query(sql, [parseInt(limit), parseInt(offset)], (err, result) => {
        if (err) {
            return res.status(500).json({ ok: false, err: 'Ha ocurrido un error: ' + err });

        } else {
            return res.status(201).json({ ok: true, result })
        }
    })

}

export const findAnimal = (req, res) => {
    let sql = `SELECT a1.*, b1.name "name_estate" 
               FROM animal a1 JOIN estate b1 ON a1.fk_estate = b1.id_estate 
               WHERE a1.name LIKE "%${req.query.name}%" OR a1.cod_animal LIKE "%${req.query.cod_animal}%" 
               ORDER BY id_animal`

    const { name, cod_animal } = req.query

    database.query(sql, [name, parseInt(cod_animal)], (err, result) => {
        if (err) {
            return res.status(500).json({ ok: false, err: 'Ha ocurrido un error: ' + err });

        } else {
            return res.status(201).json({ ok: true, result })
        }
    })

}

export const createAnimal = async(req, res) => {
    const { name, fecha, cod_animal, breed, color, fk_estate } = req.body
    let sql = 'INSERT INTO animal SET ?'
    let result = []

    let data = {
        name,
        fecha,
        cod_animal,
        breed,
        color,
        fk_estate,
        img_animal: result
    }

    const path = req.files.img_animal.map(result => {
        return result.path
    })

    for (let index = 0; index < path.length; index++) {
        const element = path[index];

        let secure_url = await pathCloudinary(element)

        result.push({ secure_url })

        await fs.unlink(element)

        console.log(result)
    }



    if (!name || !fecha || !cod_animal || !breed || !color || !fk_estate) {
        return res.status(400).json({ ok: false, err: 'Campos requeridos' });
    }

    database.query(sql, data, (err, results) => {
        if (err) {
            return res.status(500).json({ ok: false, err: 'Ha ocurrido un error: ' + err });
        } else {
            return res.status(201).json({ ok: true, message: 'Se ha creado correctamente el animal' })
        }
    })
}

export const allAnimal = (req, res) => {
    let sql = `SELECT a1.*, b1.name "name_estate"
               FROM animal a1 JOIN estate b1 ON a1.fk_estate = b1.id_estate
               ORDER BY id_animal`

    database.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ ok: 'false', err: 'Ha ocurrido un error: ' + err })
        } else {
            if (results.length === 0) {
                return res.status(401).json({ ok: 'false', err: 'No existen datos aun de animales' })
            } else {
                return res.status(200).json({ ok: true, results })
            }
        }
    })
}

export const getAnimal = (req, res) => {
    let sql = `SELECT a1.*, b1.name "name_estate" 
               FROM animal a1 JOIN estate b1 ON a1.fk_estate = b1.id_estate 
               WHERE a1.id_animal = ?`


    database.query(sql, req.params.id_animal, (err, results) => {
        if (err) {
            return res.status(500).json({ ok: 'false', err: 'Ha ocurrido un error: ' + err })
        } else {
            if (results.length === 0) {
                return res.status(401).json({ ok: 'false', err: 'No existen datos aun de animales' })
            } else {
                return res.status(200).json({ ok: true, animal: results[0] })
            }
        }
    })
}

export const updateAnimal = (req, res) => {
    const { name, fecha, cod_animal, breed, color, fk_estate } = req.body
    let sql = 'UPDATE animal set ? WHERE id_animal = ?'

    let data = {
        name,
        fecha,
        cod_animal,
        breed,
        color,
        fk_estate
    }

    if (!name || !fecha || !cod_animal || !breed || !color || !fk_estate) {
        return res.status(400).json({ ok: false, err: 'Campos requeridos' });
    }

    database.query(sql, [data, req.params.id_animal], (err, results) => {
        if (err) {
            return res.status(500).json({ ok: 'false', err: 'Ha ocurrido un error: ' + err })
        } else {
            return res.status(201).json({ ok: true, msg: 'Animal actualizado con exito' })

        }
    })
}

export const deleteAnimal = (req, res) => {
    let sql = 'DELETE FROM animal WHERE id_animal = ?'

    database.query(sql, req.params.id_animal, (err, results) => {
        if (err) {
            return res.status(500).json({ ok: 'false', err: 'Ha ocurrido un error: ' + err })
        } else {
            return res.status(201).json({ ok: true, msg: 'Se ha eliminado un animal con exito' })
        }
    })
}