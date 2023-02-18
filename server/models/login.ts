import prisma from "../prisma/prisma.js";
import bcrypt from "bcrypt";

async function login(email: string, password: string) {
    const user = await prisma.client.findFirst({
        where: {
            email
        }
    });
    if (!user) throw new Error ("L'adresse mail renseignée ne correspond à aucun compte.")
    const checkPass = await bcrypt.compare(password, user?.password);
    if (!checkPass) throw new Error ("Le mot de passe entré est invalide.")
}
export {login};