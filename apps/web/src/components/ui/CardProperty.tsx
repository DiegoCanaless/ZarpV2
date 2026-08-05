import Image from "next/image"
import { HiMiniStar } from "react-icons/hi2"

interface PropsCardProperty {
    img: string,
    title: string,
    location: string,
    price: number,
    scores: number,
    reviews: number
}

export default function CardProperty({
    img,
    title,
    location,
    price,
    scores,
    reviews
}: PropsCardProperty) {
    return (
        <article className="relative w-full overflow-hidden rounded-2xl bg-surface shadow-md">
            {/* Imagen */}
            <div className="relative h-[200px]">
                <Image
                    alt={title}
                    src={img}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>

            {/* Contenido debajo de la imagen */}
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-on-dark">{title}</h3>
                    <div className="flex items-center gap-1 text-sm">
                        <HiMiniStar className="text-[#F59E0B]" />
                        <span className="font-medium">{scores}</span>
                        <span className="text-text-muted">({reviews})</span>
                    </div>
                </div>
                <p className="text-sm text-text-muted">{location}</p>
                <p className="mt-2 font-bold text-accent">
                    USD {price} <span className="font-normal text-text-muted">/ noche</span>
                </p>
            </div>
        </article>
    )
}
