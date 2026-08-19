"use client"

import { useAuthStore } from "@/stores/authStore"
import { Role } from "@/types/auth"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"


interface AuthGuardProps {
    allowedRoles: Role[]
    children: ReactNode
}

export default function AuthGuard({ allowedRoles, children }: AuthGuardProps) {
    const router = useRouter()
    const token = useAuthStore((state) => state.token)
    const user = useAuthStore((state) => state.user)
    const hydrate = useAuthStore((state) => state.hydrate)

    const [hydrated, setHydrated] = useState<boolean>(false)

    useEffect(() => {
        hydrate()
        setHydrated(true)
    }, [hydrate])


    useEffect(() => {
        if (!hydrated) return

        if (!token || !user) {
            router.replace("/auth/login")
            return
        }

        if (!allowedRoles.includes(user.role)) {
            const isAdmin = user.role === "ADMIN" || user.role === "SUPERADMIN"
            router.replace(isAdmin ? "/admin" : "/dashboard")
        }
    }, [hydrated, token, user, allowedRoles, router])


    if (!hydrated || !token || !user) return null
    if (!allowedRoles.includes(user.role)) return null

    return (
        <>
            {children}
        </>
    )
}
