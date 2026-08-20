import type { Role } from "db";
import { Request, Response, NextFunction } from "express";



export function authorize(...roles: Role[]) {
    
    return (req: Request, res: Response, next: NextFunction) => {

        if(!req.user){
            return res.status(401).json({ error: "No autenticado"})
        }

        if(!roles.includes(req.user.role)){
            return res.status(403).json({ error: "No tenés permisos para esta acción"})
        }

        next()
    }
}