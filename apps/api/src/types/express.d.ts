import type { Role } from "db";



declare global {
    namespace Express {
        interface Request {
            user?: { id: string, role: Role }
        }
    }
}