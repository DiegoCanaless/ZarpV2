import Link from "next/link"
import { type ButtonHTMLAttributes } from "react"

interface PropsButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline"
    href?: string
    className?: string
    children: React.ReactNode
}

export default function Button({ variant = "primary", href, className = "", children, ...props }: PropsButton) {
    const base = "inline-flex items-center px-8 py-2 justify-center rounded-2xl text-md font-semibold whitespace-nowrap transition-colors"

    const variants = {
        primary: "bg-accent text-text-on-accent hover:brightness-110",
        secondary: "bg-secondary text-[#ddd] hover:brightness-110",
        outline: "border border-border-strong text-primary hover:bg-border/30",
    }

    const classes = `${base} ${variants[variant]} ${className}`

    if (href) {
        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        )
    }

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    )
}
