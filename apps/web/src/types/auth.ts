export type Role = "CLIENTE" | "PROPIETARIO" | "ADMIN" | "SUPERADMIN";

export interface User {
    id: string;
    name_Complete: string;
    email: string;
    role: Role;
    photo: string | null;
    verification_Email: boolean;
}