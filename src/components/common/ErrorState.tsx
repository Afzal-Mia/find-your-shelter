"use client";

import { Button } from "@/components/ui/button";

interface ErrorStateProps {
    title: string;
    description: string;
    onRetry?: () => void;
}

export default function ErrorState({
    title,
    description,
    onRetry,
}: ErrorStateProps) {
    const handleRetry = () => {
        if (onRetry) {
            onRetry();
            return;
        }

        window.location.reload();
    };

    return (
        <div className="flex flex-col items-center py-20 text-center">
            <h3 className="text-2xl font-semibold">
                {title}
            </h3>

            <p className="mt-3 mb-6 max-w-md text-muted-foreground">
                {description}
            </p>

            <Button onClick={handleRetry}>
                Try Again
            </Button>
        </div>
    );
}