import express from 'express';
import { verifyToken } from '../middlewares/auth.js';
import { getUser, UserLogin, UserRegister } from '../controllers/UserController.js';

const router = express.Router();

//Route for register
router.post('/register', UserRegister);
//Route for login
router.post('/login', UserLogin);

//route to get user Data
router.get('/me', verifyToken, getUser);

export default router;