import db from "../db.js";
import dayjs from "dayjs";

//Import Schema
import entriesSchema from "../schemas/entriesSchema.js";

async function registerController(req, res) {
    const user = req.locals.user;

    try {
        const entries = await db.collection("entries").find({ userId: user._id}).toArray();
        res.send(...user, entries);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function addNewEntries(req, res){
    const { value, description, type } = req.body;
    
    const validation = entriesSchema.validate(req.body);

    if (validation.error) {
        return res.sendStatus(400);
    }

    try{
        const { user } = res.locals;

        await db.collection("entries").insertOne({
            userId: user._id,
            value,
            description,
            type,
            date: dayjs().format("DD/MM/YYYY"),
        });

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { registerController, addNewEntries };