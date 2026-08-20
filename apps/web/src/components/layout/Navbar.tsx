"use client";

import { Menu, X } from "lucide";
import { MorphIcon } from "morphicons/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { Role } from "@/types/auth";


export const Navbar = () => {
    const [open, setOpen] = useState(false);

    const router = useRouter()

    const token = useAuthStore((state) => state.token)
    const user = useAuthStore((state) => state.user)
    const hydrate = useAuthStore((state) => state.hydrate)
    const logout = useAuthStore((state) => state.logout)

    useEffect(() => {
        hydrate()
    }, [hydrate])

    const handleLogout = () => {
        logout()
        router.push("/")
    }

    const NAV_LINKS_BY_ROLE: Record<Role, { href: string; label: string }[]> = {
        CLIENTE: [
            { href: "/home", label: "Propiedades" },
            { href: "/message", label: "Mensajes" },
            { href: "/reservations", label: "Reservas" },
        ],
        PROPIETARIO: [
            { href: "/home", label: "Propiedades" },
            { href: "/properties", label: "Propiedades" },
            { href: "/reservations", label: "Reservas" },
            { href: "/message", label: "Mensajes" },
        ],
        ADMIN: [],
        SUPERADMIN: [],
    }

    const navLinks = user ? NAV_LINKS_BY_ROLE[user.role] : []

    return (
        <>
            <nav className="relative z-50 flex w-full items-center justify-between bg-primary p-4">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/logo-badge.svg" alt="Zarp!" width={36} height={36} priority />
                    <span className="text-cream font-bold">Zarp!</span>
                </Link>

                <ul className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link href={link.href} className="text-text-on-dark/70 text-sm transition-colors hover:text-cream" >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="hidden items-center gap-3 md:flex">
                    {token && user ? (
                        <>
                            {user.role !== "PROPIETARIO" ? (
                                <Button variant="secondary" className="rounded-full px-5 py-2 cursor-pointer">
                                    Convierte en propietario
                                </Button>
                            ) : ("")}
                            {user.photo ? (
                                <Link  href={"profile"}>
                                    <img src={user.photo} alt={user.name_Complete} className="size-9 rounded-full object-cover cursor-pointer transition-opacity hover:opacity-80" />

                                </Link>
                            ) : (
                                <div className="grid size-9 place-items-center rounded-full bg-accent text-sm font-bold text-white cursor-pointer transition-opacity hover:opacity-80">
                                    {user.name_Complete[0]}
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <Button variant="secondary" href="/auth/login" className="rounded-full px-5 py-2">
                                Iniciar sesión
                            </Button>
                            <Button href="/auth/register" className="rounded-full px-5 py-2">
                                Registrarme
                            </Button>
                        </>
                    )

                    }

                </div>

                <button
                    onClick={() => setOpen((o) => !o)}
                    aria-expanded={open}
                    aria-label={open ? "Cerrar menú" : "Abrir menú"}
                    className="grid size-10 place-items-center rounded-full text-text-on-dark cursor-pointer transition-colors hover:bg-primary-soft md:hidden">
                    <MorphIcon icon={open ? X : Menu} size={24} spring="snappy" />
                </button>
            </nav>

            {open && (
                <>
                    <div className="fixed inset-0 z-60 bg-black/60 md:hidden" onClick={() => setOpen(false)} aria-hidden="true" />

                    <div className="fixed inset-y-0 right-0 z-70 flex w-[280px] flex-col bg-surface shadow-xl md:hidden">
                        {/* Header del panel */}
                        <div className="flex items-center justify-between px-5 py-4">
                            <div className="flex items-center gap-3">
                                <Image
                                    src="/logo-badge.svg"
                                    alt="Zarp!"
                                    width={36}
                                    height={36}
                                />
                                <span className="text-primary font-heading text-xl font-bold">
                                    Zarp!
                                </span>
                            </div>

                            <button onClick={() => setOpen(false)} aria-label="Cerrar menú" className="text-primary grid size-10 place-items-center rounded-full transition-colors hover:bg-border/50" >
                                <MorphIcon icon={X} size={22} spring="snappy" />
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="mx-5 h-px bg-border" />

                        {/* Links de navegación */}
                        <nav className="flex flex-col gap-1 px-5 pt-4">
                            {navLinks.map((link, i) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className={`py-3 text-base transition-colors hover:text-accent ${i === 0
                                        ? "text-primary font-semibold"
                                        : "text-primary/80 font-normal"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        <div className="mx-5 mt-auto h-px bg-border" />

                        <div className="flex flex-col gap-3 px-5 py-5">
                            {token && user ? (
                                <>
                                    {/* 1. Identidad del usuario */}
                                    <div className="flex items-center gap-3">
                                        {user.photo ? (
                                            <Link href={"profile"}>
                                                <img src={user.photo} alt={user.name_Complete} className="size-10 rounded-full object-cover cursor-pointer transition-opacity hover:opacity-80" />
                                            </Link>
                                        ) : (
                                            <div className="grid size-10 place-items-center rounded-full bg-accent text-sm font-bold text-white cursor-pointer transition-opacity hover:opacity-80">
                                                {user.name_Complete[0]}
                                            </div>
                                        )}
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-primary">{user.name_Complete}</span>
                                            <span className="text-xs text-text-muted capitalize">{user.role.toLowerCase()}</span>
                                        </div>
                                    </div>

                                    {/* 2. CTA */}
                                    {user.role !== "PROPIETARIO" && (
                                        <Button variant="secondary" className="w-full rounded-full px-5 py-2 cursor-pointer">
                                            Convierte en propietario
                                        </Button>
                                    )}

                                    {/* 3. Logout (abajo) */}
                                    <button
                                        onClick={handleLogout}
                                        className="w-full rounded-full px-5 py-2 bg-danger text-text-on-accent text-sm font-semibold cursor-pointer hover:brightness-110 transition-colors"
                                    >
                                        Cerrar Sesión
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Button variant="secondary" href="/auth/login" className="rounded-full px-5 py-2">
                                        Iniciar sesión
                                    </Button>
                                    <Button href="/auth/register" className="rounded-full px-5 py-2">
                                        Registrarme
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Navbar;
