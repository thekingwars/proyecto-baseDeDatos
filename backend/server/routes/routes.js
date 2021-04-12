import { register, login, google, verifyEmail, resetPassword } from '../controllers/users.controllers'
import { contactMe, allContact, getContact } from '../controllers/contact.controller'
import { createEmployees, allEmployees, getEmployees, updateEmployees, deleteEmployees } from '../controllers/employees.controller'
import { createAppointment, allAppointment, getAppointment, updateAppointment, deleteAppointment } from '../controllers/appoinment.controller'
import { createEstate, allEstate, getEstate, updateEstate, deleteEstate } from '../controllers/estate.controller'
import { createAnimal, allAnimal, getAnimal, updateAnimal, deleteAnimal } from '../controllers/animal.controller'
import express from 'express';
import { notToken } from '../middlewares/auth.middlewares'

const router = express.Router();

//login y registro de usuarios
router.post('/api/register', register)
router.post('/api/login', login)
router.post('/api/login/google', google)
router.post('/api/forgout-password', verifyEmail)
router.put('/api/reset-password/:token', resetPassword)


//Contacto
router.post('/api/contacto', contactMe)
router.get('/api/contacto', allContact)
router.get('/api/contacto/:id_contact', getContact)

//employees
router.post('/api/employees', [], createEmployees)
router.get('/api/employees', [], allEmployees)
router.get('/api/employees/:id_employee', [], getEmployees)
router.put('/api/employees/:id_employee', [], updateEmployees)
router.delete('/api/employees/:id_employee', [], deleteEmployees)

//appointment
router.post('/api/appointment', [], createAppointment)
router.get('/api/appointment', [], allAppointment)
router.get('/api/appointment/:id_appointment', [], getAppointment)
router.put('/api/appointment/:id_appointment', [], updateAppointment)
router.delete('/api/appointment/:id_appointment', [], deleteAppointment)

//estate
router.post('/api/estate', [], createEstate)
router.get('/api/estate', [], allEstate)
router.get('/api/estate/:id_estate', [], getEstate)
router.put('/api/estate/:id_estate', [], updateEstate)
router.delete('/api/estate/:id_estate', [], deleteEstate)

//animal
router.post('/api/animal', [], createAnimal)
router.get('/api/animal', [], allAnimal)
router.get('/api/animal/:id_animal', [], getAnimal)
router.put('/api/animal/:id_animal', [], updateAnimal)
router.delete('/api/animal/:id_animal', [], deleteAnimal)

export default router;