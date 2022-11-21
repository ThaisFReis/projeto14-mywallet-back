import db from "../db.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

// Import Schema
import { userSchema, loginSchema } from "../schemas/userSchema.js";

export async function login( req, res){
    
    try{
        const user = req.body;
        const validation = loginSchema.validate(user);
        if (validation.error) {
            return res.sendStatus(400);
        }

        // Check if user exists
        const userExists = await db.collection("users").findOne({ email: user.email });
        if (!userExists) {
            return res.sendStatus(401);
        }

        // Decrypt password
        const passwordMatch = await bcrypt.compare(user.password, userExists.password);

        if (!passwordMatch) {
            const token = uuid();
            await db.collection("sessions").insertOne({ token, userId: userExists._id });

            res.status(200).send({ token, name: userExists.name });
        } else {
            res.sendStatus(401);
        }

        res.status(200)

    } catch (error) {
        console.log(error);
        res.sendStatus(500);


    }
}

export async function register(req, res) {
    const newUser = req.body;
    const validation = userSchema.validate(newUser);

    if (validation.error) {
        return res.sendStatus(400);
    }

    try {
        const userExists = await db.collection("users").
        findOne
        ({ email: newUser.email });

        if (userExists) {         
            return res.sendStatus(409);
        }

        const passwordHash = await bcrypt.hash(newUser.password, 10);

        await db.collection("users").insertOne({
            name: newUser.name,
            email: newUser.email,
            password: passwordHash,
        });

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
