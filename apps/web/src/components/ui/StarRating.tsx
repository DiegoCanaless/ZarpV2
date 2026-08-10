import { HiMiniStar } from "react-icons/hi2"
import { HiOutlineStar } from "react-icons/hi2"

interface Props {
    score: number
    max?: number
}

export default function StarsRating({ score, max = 5 }: Props) {
    const filled = Math.round(score)

    return (
        <span className="flex items-center gap-0.5 text-[#F59E0B]">
            {Array.from({ length: max }, (_, i) =>
                i < filled ? (
                    <HiMiniStar key={i} size={24} />
                ) : (
                    <HiOutlineStar key={i} size={24} />
                )
            )}
        </span>
    )
}
