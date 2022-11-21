import db from "../db.js";
import dayjs from "dayjs";
import alert from 'alert'

//Import Schema
import entriesSchema from "../schemas/entriesSchema.js";

async function registerController(req, res) {
    const { user } = res.locals;

    try {
        const entries = await db.collection("entries").find({ userId: user._id}).toArray();
        res.status(200).send(entries);
        return
    } catch (error) {
        console.log(error);
        res.status(500).send("Erro no servidor");
        alert("Erro no servidor");
        return
    }
}

async function addNewEntries(req, res){
    const { value, description, type } = req.body;
    
    const validation = entriesSchema.validate(req.body);

    if (validation.error) {
        res.status(400).send("Formato inválido");
        alert("Formato inválido");
        return
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
        alert("Entrada registrada com sucesso");
        return
    } catch (error) {
        res.status(500).send("Erro no servidor");
        alert("Erro no servidor");
        return
    }
}

export { registerController, addNewEntries };