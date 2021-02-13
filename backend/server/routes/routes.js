import { register, login } from '../controllers/users.controllers'
import express from 'express';

const router = express.Router();

router.post('/api/register', register)
router.post('/api/login', login)

export default router;