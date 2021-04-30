import database from '../db';

export const createAnimal = (req, res) => {
    const { name, fecha, cod_animal, breed, color, fk_estate } = req.body
    let sql = 'INSERT INTO animal SET ?'
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

    database.query(sql, data, (err, results) => {
        if (err) {
            return res.status(500).json({ ok: false, err: 'Ha ocurrido un error: ' + err });
        } else {
            return res.status(201).json({ ok: true, message: 'Se ha creado correctamente el animal' })
        }
    })
}

export const allAnimal = (req, res) => {
    let sql = `SELECT *, a1.create_at as "create_at", a1.update_at as "update_at", b1.name as "name_estate" 
               FROM animal a1 JOIN estate b1 ON a1.fk_estate = b1.id_estate`

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
    let sql = `SELECT *, a1.create_at as "create_at", a1.update_at as "update_at", b1.name as "name_estate" 
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