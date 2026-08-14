import { env } from "../config/env"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { prisma } from "../lib/prisma"


export function hashPassword(password: string){
    return bcrypt.hash(password, 10)
}

export function comparePassword(password: string, hash: string){
    return bcrypt.compare(password, hash)
}

export function signToken(payload: object){
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d"});
}


export async function register(data: { name_Complete: string, password: string, email: string}) {
    
    const existingUser = await prisma.user.findUnique({
        where: { email: data.email}
    })

    if (existingUser) {
        throw new Error("El email ya está registrado");
    }

    const hashed = await hashPassword(data.password)

    const user = await prisma.user.create({
        data: {
            name_Complete: data.name_Complete,
            email: data.email,
            password: hashed,
        }
    })

    const token = signToken({ id: user.id, role: user.role});

    const { password, ...safeUser } = user
    
    return { token, user:safeUser}
}


export async function login(data: { email: string, password: string}){

    const user = await prisma.user.findUnique({
        where: { email: data.email}
    })

    if(!user){
        throw new Error("Credenciales Inválidas")
    }

    const  passwordMatches = await comparePassword(data.password, user.password)

    if(!passwordMatches){
        throw new Error("Credenciales Inválidas")
    }

    const token = signToken({ id: user.id,  role: user.role});

    const {password, ...safeUser} = user
    return{ token, user: safeUser}
}
