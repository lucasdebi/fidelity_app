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
import bcrypt from "bcrypt";
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.client.findFirst({
            where: {
                email
            }
        });
        if (!user)
            throw new Error("L'adresse mail renseignée ne correspond à aucun compte.");
        const checkPass = yield bcrypt.compare(password, user === null || user === void 0 ? void 0 : user.password);
        if (!checkPass)
            throw new Error("Le mot de passe entré est invalide.");
    });
}
export { login };
