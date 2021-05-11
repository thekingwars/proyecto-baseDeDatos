import { register, login, google, verifyEmail, resetPassword } from '../controllers/users.controllers'
import { contactMe, allContact, getContact } from '../controllers/contact.controller'
import { createEmployees, allEmployees, getEmployees, updateEmployees, deleteEmployees } from '../controllers/employees.controller'
import { createAppointment, allAppointment, getAppointment, updateAppointment, deleteAppointment } from '../controllers/appoinment.controller'
import { createEstate, allEstate, getEstate, updateEstate, deleteEstate } from '../controllers/estate.controller'
import { createAnimal, allAnimal, getAnimal, updateAnimal, deleteAnimal, indexAnimal, findAnimal, uploader } from '../controllers/animal.controller'
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
router.post('/api/employees', [notToken], createEmployees)
router.get('/api/employees', [notToken], allEmployees)
router.get('/api/employees/:id_employee', [notToken], getEmployees)
router.put('/api/employees/:id_employee', [notToken], updateEmployees)
router.delete('/api/employees/:id_employee', [notToken], deleteEmployees)

//appointment
router.post('/api/appointment', [notToken], createAppointment)
router.get('/api/appointment', [notToken], allAppointment)
router.get('/api/appointment/:id_appointment', [notToken], getAppointment)
router.put('/api/appointment/:id_appointment', [notToken], updateAppointment)
router.delete('/api/appointment/:id_appointment', [notToken], deleteAppointment)

//estate
router.post('/api/estate', [notToken], createEstate)
router.get('/api/estate', [notToken], allEstate)
router.get('/api/estate/:id_estate', [notToken], getEstate)
router.put('/api/estate/:id_estate', [notToken], updateEstate)
router.delete('/api/estate/:id_estate', [notToken], deleteEstate)

//animal
router.post('/api/animal', [notToken, uploader], createAnimal)
router.get('/api/animal', [notToken], allAnimal)
router.get('/api/animal/:id_animal', [notToken], getAnimal)
router.get('/api/animal-index/', indexAnimal)
router.get('/api/animal-find/', findAnimal)
router.put('/api/animal/:id_animal', [notToken], updateAnimal)
router.delete('/api/animal/:id_animal', [notToken], deleteAnimal)

export default router;