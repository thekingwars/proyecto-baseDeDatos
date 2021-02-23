import { register, login, google, verifyEmail, resetPassword } from '../controllers/users.controllers'
import express from 'express';
import { notToken } from '../middlewares/auth.middlewares'

const router = express.Router();

//login y registro de usuarios
router.post('/api/register', register)
router.post('/api/login', login)
router.post('/api/login/google', google)
router.post('/api/forgout-password', verifyEmail)
router.put('/api/reset-password/:token', resetPassword)

export default router;