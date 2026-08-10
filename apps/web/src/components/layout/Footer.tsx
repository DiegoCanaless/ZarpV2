import Image from "next/image"
import Link from "next/link"

const explorar = [
    { label: "Propiedades", href: "/propiedades" },
    { label: "Destinos", href: "/destinos" },
    { label: "Para propietarios", href: "/propietarios" },
    { label: "Contacto", href: "/contacto" },
]

const compania = [
    { label: "Sobre nosotros", href: "/sobre-nosotros" },
    { label: "Cómo funciona", href: "/como-funciona" },
    { label: "Términos y condiciones", href: "/terminos" },
    { label: "Política de privacidad", href: "/privacidad" },
]

export const Footer = () => {
    return (
        <footer className="bg-primary px-6 py-12 md:px-[80px] md:py-16">
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col gap-10 md:flex-row md:gap-20">
                    {/* Logo + tagline */}
                    <div className="flex flex-col gap-3 md:max-w-[350px]">
                        <div className="flex items-center gap-3">
                            <Image
                                src="/logo-badge.svg"
                                alt="Zarp!"
                                width={40}
                                height={40}
                            />
                            <span className="text-[30px] font-bold text-cream">
                                Zarp!
                            </span>
                        </div>
                        <p className="text-sm text-gray-500">
                            Alquileres temporales verificados en toda Argentina.
                        </p>
                    </div>

                    {/* Explorar */}
                    <div className="flex flex-col gap-3">
                        <h4 className="text-base font-semibold text-[#ddd]">
                            Explorar
                        </h4>
                        <nav className="flex flex-col gap-4">
                            {explorar.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm text-gray-500 transition-colors hover:text-cream"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Compañía */}
                    <div className="flex flex-col gap-3">
                        <h4 className="text-base font-semibold text-[#ddd]">
                            Compañía
                        </h4>
                        <nav className="flex flex-col gap-4">
                            {compania.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm text-gray-500 transition-colors hover:text-cream"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 border-t border-primary-soft pt-6 md:mt-14">
                    <p className="text-[13px] text-gray-600">
                        © 2026 Zarp. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
