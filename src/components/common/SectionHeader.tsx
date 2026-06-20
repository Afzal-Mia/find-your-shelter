import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
    title: string;
    description: string;
    actionLabel?: string;
    actionHref?: string;
}

export default function SectionHeader({
    title,
    description,
    actionLabel,
    actionHref,
}: SectionHeaderProps) {
    return (
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
                <h2 className="section-title">{title}</h2>

                <p className="section-description">
                    {description}
                </p>
            </div>

            {actionLabel && actionHref && (
                <Link
                    href={actionHref}
                    className="inline-flex items-center gap-2 font-medium text-primary transition hover:gap-3"
                >
                    {actionLabel}
                    <ArrowRight className="h-4 w-4" />
                </Link>
            )}
        </div>
    );
}