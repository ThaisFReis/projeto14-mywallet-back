import db from "../db.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import alert from 'alert'

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
            res.status(401).send("Usuário ou senha inválidos");
            alert("Usuário ou senha inválidos");
            return;
        }

        // Decrypt password
        const passwordMatch = await bcrypt.compare(user.password, userExists.password);

        if (passwordMatch) {
            const token = uuid();
            await db.collection("sessions").insertOne({ token, userId: userExists._id });

            res.status(200).send({ token, name: userExists.name });
        } else {
            res.status(401).send("Usuário ou senha inválidos");
            alert("Usuário ou senha inválidos");
            return
        }

        res.status(200)

    } catch (error) {
        console.log(error);
        res.status(500).send("Erro no servidor");
        alert("Erro no servidor");
        return
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

     // Check if password and passwordConfirmation are the same
    if (password !== passwordConfirmation) {
        res.status(400).send("As senhas não são iguais");
        alert("As senhas não são iguais");
        return 
    }

    if (validation.error) {
        res.status(400).send("Formato inválido");
        alert("Formato inválido");
        return    
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
            res.status(409).send("Usuário já cadastrado");
            alert("Usuário já cadastrado");
            return
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
        res.status(500).send("Erro no servidor");
        alert("Erro no servidor");
        return
    }
}