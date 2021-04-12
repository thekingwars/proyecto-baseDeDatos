import database from '../db';

export const createEmployees = (req, res) => {
    const { name, lastname, dni, typeofpayroll, fecha, phone, fk_appointment } = req.body
    let sql = 'INSERT INTO employees SET ?'
    let data = {
        name,
        lastname,
        dni,
        typeofpayroll,
        fecha,
        phone,
        fk_appointment
    }

    if (!name || !lastname || !typeofpayroll || !dni || !fecha || !phone || !fk_appointment) {
        return res.status(400).json({ ok: false, err: 'Campos requeridos' });
    }

    database.query(sql, data, (err, results) => {
        if (err) {
            return res.status(500).json({ ok: false, err: 'Ha ocurrido un error: ' + err });
        } else {
            return res.status(201).json({ ok: true, message: 'Se ha creado correctamente el empleado' })
        }
    })
}

export const allEmployees = (req, res) => {
    let sql = 'SELECT * FROM employees'

    database.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ ok: 'false', err: 'Ha ocurrido un error: ' + err })
        } else {
            if (results.length === 0) {
                return res.status(401).json({ ok: 'false', err: 'No existen datos aun de empleados' })
            } else {
                return res.status(200).json({ ok: true, results })
            }
        }
    })
}

export const getEmployees = (req, res) => {
    let sql = 'SELECT * FROM employees WHERE id_employee = ?'

    database.query(sql, req.params.id_employee, (err, results) => {
        if (err) {
            return res.status(500).json({ ok: 'false', err: 'Ha ocurrido un error: ' + err })
        } else {
            if (results.length === 0) {
                return res.status(401).json({ ok: 'false', err: 'No existen datos aun de empleados' })
            } else {
                return res.status(200).json({ ok: true, employee: results[0] })
            }
        }
    })
}

export const updateEmployees = (req, res) => {
    const { name, lastname, dni, typeofpayroll, fecha, phone, fk_appointment } = req.body
    let sql = 'UPDATE employees set ? WHERE id_employee = ?'

    let data = {
        name,
        lastname,
        dni,
        typeofpayroll,
        fecha,
        phone,
        fk_appointment
    }

    if (!name || !lastname || !typeofpayroll || !dni || !fecha || !phone || !fk_appointment) {
        return res.status(400).json({ ok: false, err: 'Campos requeridos' });
    }

    database.query(sql, [data, req.params.id_employee], (err, results) => {
        if (err) {
            return res.status(500).json({ ok: 'false', err: 'Ha ocurrido un error: ' + err })
        } else {
            return res.status(201).json({ ok: true, msg: 'Empleado actualizado con exito' })

        }
    })
}

export const deleteEmployees = (req, res) => {
    let sql = 'DELETE FROM employees WHERE id_employee = ?'

    database.query(sql, req.params.id_employee, (err, results) => {
        if (err) {
            return res.status(500).json({ ok: 'false', err: 'Ha ocurrido un error: ' + err })
        } else {
            return res.status(201).json({ ok: true, msg: 'Se ha eliminado un empleado con exito' })
        }
    })
}