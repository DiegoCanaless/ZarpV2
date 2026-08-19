"use client"

import { apiFetch } from "@/lib/api"
import { useAuthStore } from "@/stores/authStore"
import type { User } from "@/types/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { loginSchema } from "shared"

const demoAccounts = [
    { role: "SUPERADMIN", email: "superadmin@zarp.com" },
    { role: "ADMIN", email: "admin@zarp.com" },
    { role: "PROPIETARIO", email: "juan@zarp.com" },
    { role: "CLIENTE", email: "maria@zarp.com" },
]

const page = () => {
    const router = useRouter()
    const setAuth = useAuthStore((state) => state.setAuth)
    const [formError, setFormError] = useState("")

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = handleSubmit(async (data) => {
        try {
            const res = await apiFetch<{ token: string; user: User }>("/api/auth/login", {
                method: "POST",
                body: JSON.stringify(data)
            })
            setAuth(res.token, res.user)
            router.push(res.user.role === "ADMIN" || res.user.role === "SUPERADMIN"
                ? "/admin"
                : "/dashboard")

        } catch (error) {
            setFormError((error as Error).message)
        }
    })

    return (
        <section className="min-h-dvh flex flex-wrap justify-center items-center gap-8 px-4 py-10 bg-gradient-to-br from-primary via-primary-soft to-[#0a1114]">
            {/* Card login */}
            <div className="w-[440px] max-w-full bg-surface flex flex-col items-center px-8 py-8 rounded-3xl">
                <Image src="/logo-badge.svg" alt="Zarp!" width={40} height={40} priority />
                <h1 className="font-bold text-[28px] text-primary mt-3">Iniciar sesión</h1>
                <p className="text-sm text-text-muted mt-1">Bienvenido de nuevo a Zarp!</p>

                <form onSubmit={onSubmit} className="flex flex-col gap-3 w-full mt-6">
                    <label htmlFor="email" className="hidden">Email</label>
                    <input
                        id="email"
                        {...register("email")}
                        className="h-[52px] w-full rounded-lg bg-bg px-4 text-[15px] text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/40"
                        type="email"
                        placeholder="tu@email.com"
                    />
                    {errors.email && <span className="text-danger text-xs">{errors.email.message}</span>}

                    <label htmlFor="password" className="hidden">Contraseña</label>
                    <input
                        id="password"
                        {...register("password")}
                        className="h-[52px] w-full rounded-lg bg-bg px-4 text-[15px] text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/40"
                        type="password"
                        placeholder="********"
                    />
                    {errors.password && <span className="text-danger text-xs">{errors.password.message}</span>}

                    {formError && <span className="text-danger text-xs">{formError}</span>}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-[52px] w-full rounded-full bg-accent text-text-on-accent text-base font-semibold hover:brightness-110 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
                    </button>
                </form>

                <p className="text-sm text-text-muted mt-5">
                    ¿No tienes cuenta?{" "}
                    <Link href="/auth/register" className="text-accent font-semibold hover:underline">
                        Registrate
                    </Link>
                </p>
            </div>

            {/* Nubecita con credenciales */}
            <div className="relative">
                <div className="bg-surface border border-border rounded-2xl px-5 py-4 shadow-lg w-[250px]">
                    <p className="text-xs font-bold text-primary">Cuentas de prueba</p>
                    <p className="text-[11px] text-text-muted mt-1 mb-3">
                        Contraseña: <span className="font-semibold text-primary">password123</span>
                    </p>
                    <div className="flex flex-col gap-2">
                        {demoAccounts.map((account) => (
                            <div key={account.role} className="flex items-center justify-between gap-3">
                                <span className="text-[11px] font-bold text-accent whitespace-nowrap">{account.role}</span>
                                <span className="text-[11px] text-primary">{account.email}</span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* colita del globo, apuntando a la card */}
                <div className="hidden md:block absolute -left-2 top-10 h-4 w-4 rotate-45 bg-surface border-l border-b border-border" />
            </div>
        </section>
    )
}

export default page
