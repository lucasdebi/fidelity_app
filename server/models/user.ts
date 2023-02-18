import prisma from "../prisma/prisma.js";
import bcrypt from 'bcrypt';
import { client } from '@prisma/client';

async function getAllUsers(){
    return await prisma.client.findMany();
}

type CreateUser = {
    id: number;
    email: string;
    password: string;
    fname: string;
    lname: string;
    phone: number;
    DoB: Date;
    fidelity_points: number;
    admin : boolean;
}

async function createUser(client: CreateUser) {
    const {id, email, password, fname, lname, phone, DoB} = client;
    const hashedPassword = await bcrypt.hash(password,10);
    let existingUser = await prisma.client.findFirst({
        where : {
            email
        }
    });
    if (existingUser === null){
        return await prisma.client.create({
            data: {
                id: id,
                email: email,
                password: hashedPassword,
                first_name: fname,
                last_name: lname,
                phone: phone,
                DoB: DoB,
            }
        })
    }
    else{
        throw new Error ("L'adresse que vous avez renseignée est déjà associée à un compte.")
    }
}
async function verifyUser(email:string){
    const users = await prisma.client.findFirst({
        where:{
            email
        }
    })
    if (users != null){
        return false
    }
    else return true
}
async function deleteUser(id: number){
    let checkUser = await prisma.client.findFirst({
        where: {
            id
        }
    })
    if (checkUser === null){
        throw new Error ("L'utilisateur renseigné n'existe pas.")
    }
    else return await prisma.client.delete({
        where:{
            id
        }
    })
}

async function updateUser(id: number, client: Partial<client>){
    let checkUser = await prisma.client.findFirst({
        where: {
            id
        }
    })
    if (checkUser === null){
        throw new Error("L'utilisateur renseigné n'existe pas.")
    }
    const data = client;
    delete data.password;
    delete data.email;
    delete data.fidelity_points;
    delete data.admin;
    return await prisma.client.update({
        where : {
            id
        },
        data
    });
}

export {
    createUser,
    verifyUser,
    getAllUsers,
    deleteUser,
    updateUser
}
