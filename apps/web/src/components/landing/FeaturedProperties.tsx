import CardProperty from "../ui/CardProperty"

const featured = [
    {
        img: "/landing/casa1.webp",
        title: "Casa en la montaña",
        location: "Bariloche, Río Negro",
        price: 85,
        scores: 4.9,
        reviews: 128,
    },
    {
        img: "/landing/casa2.webp",
        title: "Departamento frente al mar",
        location: "Villa Gesell, Buenos Aires",
        price: 120,
        scores: 4.7,
        reviews: 94,
    },
    {
        img: "/landing/casa3.webp",
        title: "Cabaña rústica",
        location: "El Bolsón, Río Negro",
        price: 65,
        scores: 4.8,
        reviews: 76,
    },
]

export const FeaturedProperties = () => {
    return (
        <section className="px-4 py-16">
            <div className="mx-auto max-w-6xl">
                <div className="mb-10 text-center sm:text-start">
                    <h2 className="text-2xl font-bold text-on-dark md:text-3xl">
                        Propiedades destacadas
                    </h2>
                    <p className="mt-2 text-md text-text-muted">
                        Los favoritos de nuestros huéspedes este mes
                    </p>
                </div>

                <div className="gap-6 flex flex-col md:flex-row">
                    {featured.map((p) => (
                        <CardProperty key={p.title} {...p} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FeaturedProperties
