import { Router } from 'express';

// Import the auth controller
import { login, register } from '../controllers/authController';

// Import middleware
import userMiddleware from '../middlewares/userMiddlewares';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/register', userMiddleware, register);

export default authRouter;