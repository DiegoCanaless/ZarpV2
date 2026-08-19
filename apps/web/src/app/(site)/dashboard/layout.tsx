import type { ReactNode } from "react";
import AuthGuard from "@/components/auth/AuthGuard";


export default function SiteLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <AuthGuard allowedRoles={["CLIENTE", "PROPIETARIO"]}>
                {children}
            </AuthGuard>

        </>
    );
}
