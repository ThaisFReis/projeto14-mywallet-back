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
            return res.status(401).send("Usuário inválidos");
        }

        // Decrypt password
        const passwordMatch = await bcrypt.compare(user.password, userExists.password);

        if (passwordMatch) {
            const token = uuid();
            await db.collection("sessions").insertOne({ token, userId: userExists._id });

            res.status(200).send({ token, name: userExists.name });
        } else {
            return res.status(401).send("senha inválidos");
        }

        res.status(200)

    } catch (error) {
        console.log(error);
        res.sendStatus(500);


    }
}

export async function singup(req, res) {
    const { name, email, password, passwordConfirmation } = req.body;

    const validation = userSchema.validate({ 
        name, 
        email, 
        password,
        passwordConfirmation
     });

    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);       
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const userExists = await db.collection("users").
        findOne
        ({ email, 
            name, 
            password: encryptedPassword,
            passwordConfirmation: encryptedPassword
         });

        if (userExists) {
            return res.sendStatus(409);
        }

        const result = await db.collection("users").insertOne({ 
            name, 
            email, 
            password: encryptedPassword ,
            passwordConfirmation: encryptedPassword
        });

        res.status(201).send({ id: result.insertedId, name, email });

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}