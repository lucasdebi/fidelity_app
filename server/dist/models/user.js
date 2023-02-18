var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from "../prisma/prisma.js";
import bcrypt from 'bcrypt';
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.client.findMany();
    });
}
function createUser(client) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, email, password, fname, lname, phone, DoB } = client;
        const hashedPassword = yield bcrypt.hash(password, 10);
        let existingUser = yield prisma.client.findFirst({
            where: {
                email
            }
        });
        if (existingUser === null) {
            return yield prisma.client.create({
                data: {
                    id: id,
                    email: email,
                    password: hashedPassword,
                    first_name: fname,
                    last_name: lname,
                    phone: phone,
                    DoB: DoB,
                }
            });
        }
        else {
            throw new Error("L'adresse que vous avez renseignée est déjà associée à un compte.");
        }
    });
}
function verifyUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield prisma.client.findFirst({
            where: {
                email
            }
        });
        if (users != null) {
            return false;
        }
        else
            return true;
    });
}
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let checkUser = yield prisma.client.findFirst({
            where: {
                id
            }
        });
        if (checkUser === null) {
            throw new Error("L'utilisateur renseigné n'existe pas.");
        }
        else
            return yield prisma.client.delete({
                where: {
                    id
                }
            });
    });
}
function updateUser(id, client) {
    return __awaiter(this, void 0, void 0, function* () {
        let checkUser = yield prisma.client.findFirst({
            where: {
                id
            }
        });
        if (checkUser === null) {
            throw new Error("L'utilisateur renseigné n'existe pas.");
        }
        const data = client;
        delete data.password;
        delete data.email;
        delete data.fidelity_points;
        delete data.admin;
        return yield prisma.client.update({
            where: {
                id
            },
            data
        });
    });
}
export { createUser, verifyUser, getAllUsers, deleteUser, updateUser };
