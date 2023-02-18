import express from 'express';
import {createUser, getAllUsers, verifyUser, deleteUser, updateUser} from "../models/user.js";


const userRouter = express.Router();

userRouter.get("/", async (_req, res) => {
    return res.json({user: await getAllUsers()});
});

userRouter.post("/", async (req, res) => {
    const {email} = req.body;
    const checkRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!checkRegex.test(email)){
        return res.status(400).send("L'adresse mail entrée n'est pas valide.")
    }
    else if (await verifyUser(email)){
        const createdUser = await createUser(req.body);
        return res.json({client: createdUser});
    }
    else return res.status(409).send("L'adresse email entrée est déjà associée à un autre compte.");
})

userRouter.delete("/:id", async (req,res) => {
    try {
        const userToDelete = await deleteUser(Number(req.params.id));
        return res.json({user: userToDelete})
    }
    catch (err){
        return res.status(500).send((err as Error).message)
    }
})

userRouter.patch("/:id", async (req,res) => {
    try {
        const body = req.body;
        const updatedUser = await updateUser(Number(req.params.id), body);
        return res.json({user: updatedUser})
    }
    catch (err){
        return res.status(500).send((err as Error).message)
    }
})
export default userRouter;