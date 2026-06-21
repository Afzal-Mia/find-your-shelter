import { LucideIcon, Home } from "lucide-react";

interface EmptyStateProps {
    title: string;
    description?: string;
    icon?: LucideIcon;
}

export default function EmptyState({
    title,
    description,
    icon: Icon = Home,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed p-16 text-center">
            <Icon className="mb-6 h-14 w-14 text-slate-300" />

            <h3 className="text-2xl font-semibold">{title}</h3>

            {description && (
                <p className="mt-2 max-w-md text-muted-foreground">
                    {description}
                </p>
            )}
        </div>
    );
}