import express from "express";
import { login } from "../models/login.js";

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await login(email, password);
        return res.json({user: result});
    } catch(err) {
        return res.json(500).send((err as Error).message);
    }
});
export default loginRouter