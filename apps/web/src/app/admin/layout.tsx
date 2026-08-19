import AuthGuard from "@/components/auth/AuthGuard";


export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard allowedRoles={["ADMIN" , "SUPERADMIN"]}>
            {children}
        </AuthGuard>
    )
}

