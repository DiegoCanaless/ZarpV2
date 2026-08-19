import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import type { Role } from "db";

export function verifyToken(req: Request, res: Response, next: NextFunction){
    
    const header = req.headers.authorization;

    if(!header?.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token no proporcionado"})
    }

    const token = header.split(" ")[1]
    
    try {
        const payload = jwt.verify(token, env.JWT_SECRET) as { id: string; role: Role}
        req.user = { id: payload.id , role: payload.role}
        next()
    } catch {
        return res.status(401).json({ error: "Token inválido"})
    }
}