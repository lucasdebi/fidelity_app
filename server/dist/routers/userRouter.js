var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { createUser, getAllUsers, verifyUser, deleteUser, updateUser } from "../models/user.js";
const userRouter = express.Router();
userRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({ user: yield getAllUsers() });
}));
userRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const checkRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!checkRegex.test(email)) {
        return res.status(400).send("L'adresse mail entrée n'est pas valide.");
    }
    else if (yield verifyUser(email)) {
        const createdUser = yield createUser(req.body);
        return res.json({ client: createdUser });
    }
    else
        return res.status(409).send("L'adresse email entrée est déjà associée à un autre compte.");
}));
userRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userToDelete = yield deleteUser(Number(req.params.id));
        return res.json({ user: userToDelete });
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}));
userRouter.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const updatedUser = yield updateUser(Number(req.params.id), body);
        return res.json({ user: updatedUser });
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}));
export default userRouter;
