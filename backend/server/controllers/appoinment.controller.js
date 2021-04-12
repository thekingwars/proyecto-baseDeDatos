import database from '../db';

export const createAppointment = (req, res) => {
    const { name } = req.body
    let sql = 'INSERT INTO appointment SET ?'
    let data = {
        name
    }

    if (!name) {
        return res.status(400).json({ ok: 'false', err: 'Campos requeridos' })
    }

    database.query(sql, data, (err, results) => {
        if (err) {
            return res.status(500).json({ ok: false, err: 'Ha ocurrido un error: ' + err });
        } else {
            return res.status(201).json({ ok: true, message: 'Se ha creado correctamente el cargo' })
        }
    })
}

export const allAppointment = (req, res) => {
    let sql = 'SELECT * FROM appointment'

    database.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ ok: 'false', err: 'Ha ocurrido un error: ' + err })
        } else {
            if (results.length === 0) {
                return res.status(401).json({ ok: 'false', err: 'No existen datos aun de cargos' })
            } else {
                return res.status(200).json({ ok: true, results })
            }
        }
    })
}

export const getAppointment = (req, res) => {
    let sql = 'SELECT * FROM appointment WHERE id_appointment = ?'

    database.query(sql, req.params.id_appointment, (err, results) => {
        if (err) {
            return res.status(500).json({ ok: 'false', err: 'Ha ocurrido un error: ' + err })
        } else {
            if (results.length === 0) {
                return res.status(401).json({ ok: 'false', err: 'No existen datos aun de cargos' })
            } else {
                return res.status(200).json({ ok: true, employee: results[0] })
            }
        }
    })
}

export const updateAppointment = (req, res) => {
    const { name } = req.body
    let sql = 'UPDATE appointment set ? WHERE id_appointment = ?'

    let data = {
        name
    }

    if (!name) {
        return res.status(400).json({ ok: false, err: 'Campos requeridos' });
    }

    database.query(sql, [data, req.params.id_appointment], (err, results) => {
        if (err) {
            return res.status(500).json({ ok: 'false', err: 'Ha ocurrido un error: ' + err })
        } else {
            return res.status(201).json({ ok: true, msg: 'Cargo actualizado con exito' })
        }
    })
}

export const deleteAppointment = (req, res) => {
    let sql = 'DELETE FROM appointment WHERE id_appointment = ?'

    database.query(sql, req.params.id_appointment, (err, results) => {
        if (err) {
            return res.status(500).json({ ok: 'false', err: 'Ha ocurrido un error: ' + err })
        } else {
            return res.status(201).json({ ok: true, msg: 'Se ha eliminado un cargo con exito' })
        }
    })
}