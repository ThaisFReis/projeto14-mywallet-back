import { Router } from 'express';

// Import the auth controller
import { login, register } from '../controllers/authControllers.js';

// Import middlewares
import userMiddlewares from '../middlewares/userMiddlewares.js';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/register', userMiddlewares, register);

export default authRouter;