import { Router } from "express";

import { registerController, addNewEntries } from "../controllers/entriesControllers.js";
import userMiddlewares from "../middlewares/userMiddlewares.js";

const entriesRouter = Router();

entriesRouter.get("/entries", userMiddlewares, registerController);
entriesRouter.post("/entries", userMiddlewares, addNewEntries);

export default entriesRouter;