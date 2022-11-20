import db from "../db.js";

export default async function registerController(req, res) {
    const user = req.locals.user;

    try {
        const entries = await db.collection("entries").find({ userId: user._id}).toArray();
        res.send(...user, entries);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}