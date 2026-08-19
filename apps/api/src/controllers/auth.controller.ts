import { Request, Response } from "express";
import { loginSchema, registerSchema } from "shared";
import * as authService from "../services/auth.service"
import { prisma } from "../lib/prisma";




export async function register(req: Request, res: Response){

    const parsed = registerSchema.safeParse(req.body)
    
    if (!parsed.success){
        return res.status(400).json({
            error: parsed.error.issues[0].message
        })
    }

    try {
        const result = await authService.register(parsed.data)
        return res.status(201).json(result)
    } catch (error) {
        return res.status(409).json({ error: (error as Error).message})
    }
}


export async function login(req:Request, res: Response) {
    
    const parsed = loginSchema.safeParse(req.body)

    if(!parsed.success){
        return res.status(400).json({
            error: parsed.error.issues[0].message
        })
    }

    try {
        const result = await authService.login(parsed.data)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(401).json({ error: (error as Error).message})
    }
}

export async function me(req:Request, res:Response) {

    try {
        const  user = await prisma.user.findUnique({
            where: { id: req.user!.id }
        })

        if(!user){
            return res.status(404).json({ error: "Usuario no encontrado"})
        }

        const { password, ...safeUser} = user;

        return res.json(safeUser)
    } catch  {
        return res.status(500).json({ error: "Error del servicio"})
    }
    
}