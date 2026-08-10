export const Process = () => {

    const steps = [
        { number: 1, title: "Buscá", subtitle: "Explorá propiedades verificadas con reseñas reales." },
        { number: 2, title: "Reservá", subtitle: "Elegí fechas y confirmá con disponibilidad en tiempo real." },
        { number: 3, title: "Viajá", subtitle: "Pagá seguro y recibí el check-in sin vueltas." }
    ]

    return (
        <section className="px-4 py-16">
            <div className="mx-auto max-w-6xl">
                <div className="mb-10 text-center sm:text-start">
                    <h3 className="text-2xl font-bold text-on-dark md:text-3xl">
                        ¿Cómo funciona?
                    </h3>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {steps.map((card) => (
                        <div key={card.number} className="rounded-2xl bg-surface p-6 shadow-md">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                                <span className="text-2xl font-bold text-text-on-accent">{card.number}</span>
                            </div>
                            <h5 className="mt-7 text-2xl font-bold text-on-dark">{card.title}</h5>
                            <p className="mt-2 text-md text-text-muted">{card.subtitle}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
