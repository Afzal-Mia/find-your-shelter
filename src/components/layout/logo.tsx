// src/components/layout/Logo.tsx
import Link from "next/link";
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    iconClassName?: string;
    textClassName?: string;
}

export default function Logo({
    className,
    iconClassName,
    textClassName,
}: LogoProps) {
    return (
        <Link
            href="/"
            aria-label="Find Your Shelter Home"
            className={cn(
                "inline-flex items-center gap-3 transition-opacity hover:opacity-90",
                className
            )}
        >
            <div
                className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md",
                    iconClassName
                )}
            >
                <Home className="h-5 w-5" />
            </div>

            <div className="flex flex-col leading-none">
                <span
                    className={cn(
                        "text-lg font-bold tracking-tight text-slate-900",
                        textClassName
                    )}
                >
                    Find Your Shelter
                </span>

                <span className="text-xs text-slate-500">
                    Verified Rentals
                </span>
            </div>
        </Link>
    );
}