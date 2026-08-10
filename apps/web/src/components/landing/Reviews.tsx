import Image from "next/image"
import StarsRating from "../ui/StarRating"

const Reviews = () => {

    const reviews = [
        { punctuation: 5, comment: "La atención de los anfitriones fue excepcional.", name: "María Fernández", img: "/users/userphoto.webp" },
        { punctuation: 4, comment: "Perfecta para desconectar. El jacuzzi con vista al lago es un sueño.", name: "Joaquín Pérez", img: "/users/userphoto2.webp" },
        { punctuation: 2, comment: "Muy lindo lugar y excelente comunicación. Recomendado para familias.", name: "Sofía López", img: "/users/userphoto3.webp" },
    ]

    return (
        <section className="px-4 py-16">
            <div className="mx-auto max-w-6xl">
                <h3 className="text-2xl font-bold text-on-dark md:text-3xl">
                    Lo que dicen nuestros viajeros
                </h3>

                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {reviews.map((card) => (
                        <div key={card.name} className="flex flex-col gap-3 rounded-2xl bg-surface p-6 shadow-md">
                            <StarsRating score={card.punctuation} />
                            <p className="text-md font-medium text-text-muted">"{card.comment}"</p>
                            <div className="mt-auto flex items-center  gap-4">
                                <Image src={card.img} alt={card.name} width={40} height={40} className="rounded-full" />
                                <span className="text-md font-bold text-on-dark">{card.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Reviews
