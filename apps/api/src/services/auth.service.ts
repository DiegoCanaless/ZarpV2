import { env } from "../config/env"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"


export function hashPassword(password: string){
    return bcrypt.hash(password, 10)
}

export function comparePassword(password: string, hash: string){
    return bcrypt.compare(password, hash)
}

export function signToken(payload: object){
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d"});
}

