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
import { registerSchema } from "shared"
import { z } from "zod"

const registerFormSchema = registerSchema
  .extend({
    repeatPassword: z.string().min(1, "Repetí tu contraseña")
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Las contraseñas no coinciden",
    path: ["repeatPassword"]
  })

const page = () => {
  const router = useRouter()
  const setAuth = useAuthStore((state) => state.setAuth)
  const [formError, setFormError] = useState("")



  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerFormSchema)
  })

  const onSubmit = handleSubmit(async (data) => {

    const { repeatPassword, ...payload } = data

    try {
      const res = await apiFetch<{ token: string; user: User }>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(payload)
      })
      setAuth(res.token, res.user)
      router.push("/dashboard")

    } catch (error) {
      setFormError((error as Error).message)
    }
  })

  return (
    <section className="min-h-dvh flex justify-center items-center px-4 py-10 bg-gradient-to-br from-primary via-primary-soft to-[#0a1114]">
      <div className="w-[440px] max-w-full bg-surface flex flex-col items-center px-8 py-8 rounded-3xl">
        <Image src="/logo-badge.svg" alt="Zarp!" width={40} height={40} priority />
        <h1 className="font-bold text-[28px] text-primary mt-3">Crear cuenta</h1>
        <p className="text-sm text-text-muted mt-1">Sumate a Zarp y empezá a viajar</p>

        <form onSubmit={onSubmit} className="flex flex-col gap-3 w-full mt-6">
          <label htmlFor="name_complete" className="hidden">Nombre Completo</label>
          <input
            id="name_complete"
            {...register("name_Complete")}
            className="h-[52px] w-full rounded-lg bg-bg px-4 text-[15px] text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/40"
            type="text"
            placeholder="Martin Sanchez"
          />
          {errors.name_Complete && <span className="text-danger text-xs">{errors.name_Complete.message}</span>}

          <label htmlFor="email" className="hidden">Correo Electronico</label>
          <input
            id="email"
            {...register("email")}
            className="h-[52px] w-full rounded-lg bg-bg px-4 text-[15px] text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/40"
            type="email"
            placeholder="correo@gmail.com"
          />
          {errors.email && <span className="text-danger text-xs">{errors.email.message}</span>}

          <label htmlFor="password" className="hidden">Contraseña</label>
          <input
            id="password"
            {...register("password")}
            className="h-[52px] w-full rounded-lg bg-bg px-4 text-[15px] text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/40"
            type="password"
            placeholder="*******"
          />
          {errors.password && <span className="text-danger text-xs">{errors.password.message}</span>}

          <label htmlFor="repeatPassword" className="hidden">Repetir Contraseña</label>
          <input
            id="repeatPassword"
            {...register("repeatPassword")}
            className="h-[52px] w-full rounded-lg bg-bg px-4 text-[15px] text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/40"
            type="password"
            placeholder="*******"
          />
          {errors.repeatPassword && <span className="text-danger text-xs">{errors.repeatPassword.message}</span>}

          {formError && <span className="text-danger text-xs">{formError}</span>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-[52px] w-full rounded-full bg-accent text-text-on-accent text-base font-semibold hover:brightness-110 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Ingresando..." : "Registrarse"}
          </button>
        </form>

        <p className="text-sm text-text-muted mt-5">
          ¿Ya tienes cuenta?{" "}
          <Link href="/auth/login" className="text-accent font-semibold hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </section>
  )
}

export default page
