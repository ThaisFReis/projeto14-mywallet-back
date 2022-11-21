import { Router } from "express";

import { addNewEntries }from "../controllers/entriesControllers.js";
import userMiddlewares from "../middlewares/userMiddlewares.js";

const entriesRouter = Router();

entriesRouter.post("/entries", userMiddlewares, addNewEntries);

export default entriesRouter;