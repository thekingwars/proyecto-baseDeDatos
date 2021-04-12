import database from '../db';

export const createEstate = (req, res) => {
    const { name, city, state, nro_country, areas } = req.body
    let sql = 'INSERT INTO estate SET ?'
    let data = {
        name,
        state,
        nro_country,
        city,
        areas,
    }

    if (!name || !city || !state || !nro_country || !areas) {
        return res.status(400).json({ ok: false, err: 'Campos requeridos' });
    }

    database.query(sql, data, (err, results) => {
        if (err) {
            return res.status(500).json({ ok: false, err: 'Ha ocurrido un error: ' + err });
        } else {
            return res.status(201).json({ ok: true, message: 'Se ha creado correctamente el estado' })
        }
    })
}

export const allEstate = (req, res) => {
    let sql = 'SELECT * FROM estate'

    database.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ ok: 'false', err: 'Ha ocurrido un error: ' + err })
        } else {
            if (results.length === 0) {
                return res.status(401).json({ ok: 'false', err: 'No existen datos aun de estados' })
            } else {
                return res.status(200).json({ ok: true, results })
            }
        }
    })
}

export const getEstate = (req, res) => {
    let sql = 'SELECT * FROM estate WHERE id_estate = ?'

    database.query(sql, req.params.id_estate, (err, results) => {
        if (err) {
            return res.status(500).json({ ok: 'false', err: 'Ha ocurrido un error: ' + err })
        } else {
            if (results.length === 0) {
                return res.status(401).json({ ok: 'false', err: 'No existen datos aun de estados' })
            } else {
                return res.status(200).json({ ok: true, employee: results[0] })
            }
        }
    })
}

export const updateEstate = (req, res) => {
    const { name, city, state, nro_country, areas } = req.body
    let sql = 'UPDATE estate set ? WHERE id_estate = ?'

    let data = {
        name,
        state,
        nro_country,
        city,
        areas,
    }

    if (!name || !city || !state || !nro_country || !areas) {
        return res.status(400).json({ ok: false, err: 'Campos requeridos' });
    }

    database.query(sql, [data, req.params.id_estate], (err, results) => {
        if (err) {
            return res.status(500).json({ ok: 'false', err: 'Ha ocurrido un error: ' + err })
        } else {
            return res.status(201).json({ ok: true, msg: 'Estado actualizado con exito' })

        }
    })
}

export const deleteEstate = (req, res) => {
    let sql = 'DELETE FROM estate WHERE id_estate = ?'

    database.query(sql, req.params.id_estate, (err, results) => {
        if (err) {
            return res.status(500).json({ ok: 'false', err: 'Ha ocurrido un error: ' + err })
        } else {
            return res.status(201).json({ ok: true, msg: 'Se ha eliminado un estado con exito' })
        }
    })
}