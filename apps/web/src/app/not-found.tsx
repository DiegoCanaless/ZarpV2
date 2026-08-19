"use client"

import Button from "@/components/ui/Button"
import { useAuthStore } from "@/stores/authStore"
import { useEffect } from "react"

const NotFound = () => {


    const user = useAuthStore((state) => state.user)
    const token = useAuthStore((state) => state.token)
    const hydrate = useAuthStore((state) => state.hydrate)

    let volver: string

    useEffect(() => {
        hydrate()
    }, [hydrate])


    if (!token) {
        volver = "/"
    } else if (user?.role === "CLIENTE" || user?.role === "PROPIETARIO") {
        volver = "/dashboard"
    } else {
        volver = "/admin"
    }

    return (
        <section className="flex flex-col gap-2.5 justify-center items-center h-dvh">
            <h1 className="font-black text-7xl md:text-9xl">404</h1>
            <h2 className="text-lg">¡Uy! Esta página no existe</h2>
            <p className="text-text-muted text-xs sm:text-lg">Parece que te perdiste en el mar. Volve al inicio</p>
            <Button children="Volver al inicio" href={volver}></Button>
        </section>

    )
}

export default NotFound