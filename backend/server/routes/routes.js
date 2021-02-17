import { register, login } from '../controllers/users.controllers'
import express from 'express';
import { notToken } from '../middlewares/auth.middlewares'

const router = express.Router();

//login y registro de usuarios
router.post('/api/register', register)
router.post('/api/login', login)

export default router;