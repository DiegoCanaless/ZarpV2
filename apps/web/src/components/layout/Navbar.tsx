"use client";

import { Menu, X } from "lucide";
import { MorphIcon } from "morphicons/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
    { href: "/", label: "Inicio" },
    { href: "/propiedades", label: "Propiedades" },
    { href: "/sobre-nosotros", label: "Sobre nosotros" },
    { href: "/contacto", label: "Contacto" },
];

export const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <nav className="relative z-50 flex w-full items-center justify-between bg-primary p-4">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo-badge.svg"
                        alt="Zarp!"
                        width={36}
                        height={36}
                        priority
                    />
                    <span className="text-cream font-bold">Zarp!</span>
                </Link>

                <ul className="hidden items-center gap-8 md:flex">
                    {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                            <Link href={link.href} className="text-text-on-dark/70 text-sm transition-colors hover:text-cream" >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <Link href="/auth/registro" className="bg-accent text-text-on-accent hidden rounded-lg px-5 py-2 text-sm font-semibold transition-colors hover:brightness-110 md:block" >
                    Crear cuenta
                </Link>

                <button
                    onClick={() => setOpen((o) => !o)}
                    aria-expanded={open}
                    aria-label={open ? "Cerrar menú" : "Abrir menú"}
                    className="grid size-10 place-items-center rounded-full text-text-on-dark transition-colors hover:bg-primary-soft md:hidden"
                >
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
                            {NAV_LINKS.map((link, i) => (
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
                            <Link href="/auth/login" onClick={() => setOpen(false)} className="border-border-strong text-primary flex h-12 items-center justify-center rounded-xl border text-sm font-medium transition-colors hover:bg-border/30" >
                                Iniciar sesión
                            </Link>
                            <Link href="/auth/registro" onClick={() => setOpen(false)} className="bg-accent text-text-on-accent flex h-12 items-center justify-center rounded-xl text-sm font-semibold transition-colors hover:brightness-110" >
                                Crear cuenta
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Navbar;
