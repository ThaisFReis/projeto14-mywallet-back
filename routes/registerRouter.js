import { Router } from "express";
import { registerController } from "../controllers/registerController.js";
import tokenMiddleware from "../middlewares/tokenMiddleware.js";

const registerRouter = Router();

registerRouter.use(tokenMiddleware);
registerRouter.get("/entries", tokenMiddleware, registerController);

export default registerRouter;