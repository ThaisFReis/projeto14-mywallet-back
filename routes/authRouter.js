import { Router } from 'express';

// Import the auth controller
import { login, singup } from '../controllers/authControllers.js';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/singup', singup);

export default authRouter;