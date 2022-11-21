import db from "../db.js";
import dayjs from "dayjs";

//Import Schema
import entriesSchema from "../schemas/entriesSchema.js";

async function registerController(req, res) {
    const { user } = res.locals;

    try {
        const entries = await db.collection("entries").find({ userId: user._id}).toArray();
        res.status(200).send(entries);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function addNewEntries(req, res){
    const { value, description, type } = req.body;
    
    const validation = entriesSchema.validate(req.body);

    if (validation.error) {
        return res.status(400).send("erro aqui");
    }

    try{
        const { user } = res.locals;

        await db.collection("entries").insertOne({
            userId: user._id,
            value,
            description,
            type,
            date: dayjs().format("DD/MM/YY"),
        });

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { registerController, addNewEntries };