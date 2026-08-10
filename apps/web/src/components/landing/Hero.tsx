"use client"

import { HiMiniStar, HiMiniMagnifyingGlass } from "react-icons/hi2";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useState } from "react";


export const Hero = () => {

    const[query, setQuery] = useState<string>("")

    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/propiedades?q=${query}`)
    }

    return (
        <section className="relative flex min-h-[calc(100dvh-72px)] flex-col bg-primary px-4 py-8 text-surface md:min-h-[calc(100dvh-68px)] md:px-15 md:py-10">
            <div className="relative md:mx-auto md:flex md:min-h-[340px] md:w-full md:max-w-[1200px] md:flex-1 md:items-center">
            <div className="flex flex-col gap-3 md:w-[52%] md:gap-4">
                <h1 className="text-4xl font-bold text-text-on-dark md:text-5xl xl:text-6xl">Viví cada destino como en casa.</h1>
                <p className="max-w-[464px] text-base text-[#a6a6a6] md:text-xl">Alquileres temporales verificados en todo el país. Reservá seguro, viajá tranquilo.</p>

                <div className="md:absolute md:right-0 md:top-1/2 md:w-[40%] md:-translate-y-1/2 lg:w-[42%] lg:max-w-[560px]">
                    <div className="relative h-[200px] overflow-hidden rounded-2xl md:h-[340px]">
                    <div className=" shadow-md absolute z-10 left-4 top-4 bg-surface text-primary px-3 py-1.5 rounded-full gap-1.5 flex items-center">
                        <HiMiniStar size={16} color="#f59e0b" />
                        <p className="font-body text-sm font-semibold">4.9</p>
                    </div>
                    <div className="absolute inset-0 bg-primary-soft" />
                    <Image src="/landing/casa1.webp" alt="Propiedad Ejemplo" fill className="object-cover" sizes="80vw" />
                    <div className="absolute bottom-0 left-0 w-full z-10 text-start p-5 text-surface bg-black/55">
                        <h2 className="text-xl md:text-2xl font-bold">Casa en la montaña</h2>
                        <p className="mt-0.5 text-sm md:text-base text-[#cccccc]">Bariloche, Río Negro</p>
                        <p className="mt-1.5 text-lg md:text-xl font-bold text-cream">USD 85 / noche</p>
                    </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="relative">
                <button type="submit" aria-label="Buscar" className="absolute left-1.5 top-1/2 -translate-y-1/2 grid size-8 place-items-center rounded-full bg-accent text-text-on-accent transition-colors hover:brightness-110" >
                    <HiMiniMagnifyingGlass size={16} />
                </button>
                <input type="search" aria-label="Buscar propiedades" placeholder="¿A dónde vas?" value={query} onChange={(e) => setQuery(e.target.value)} className="bg-surface text-text rounded-2xl w-full pl-12 pr-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary" />
                </form>

            </div>
            </div>

            <div className="mt-8 grid w-full grid-cols-3 place-items-center rounded-2xl bg-[#3D4A33] px-4 py-3 text-center md:mx-auto md:mt-10 md:max-w-10/12 md:px-6">
                <div>
                    <p className="font-bold text-2xl">2,500+</p>
                    <p className="text-xs font-medium">Propiedades verificadas</p>
                </div>
                <div>
                    <p className="font-bold text-2xl">18k</p>
                    <p className="text-xs font-medium">Viajeros felices</p>
                </div>
                <div>
                    <p className="font-bold text-2xl">4.9★</p>
                    <p className="text-xs font-medium">Valoración promedio</p>
                </div>
            </div>

        </section>
    )
}

export default Hero
