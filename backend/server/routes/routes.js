import { register, login, google, verifyEmail, resetPassword } from '../controllers/users.controllers'
import { contactMe, allContact, getContact } from '../controllers/contact.controller'
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
router.get('/api/contacto/:id', getContact)

export default router;