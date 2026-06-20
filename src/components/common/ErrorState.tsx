"use client";

import { Button } from "@/components/ui/button";

interface Props {
    title: string;
    description: string;
}

export default function ErrorState({
    title,
    description,
}: Props) {
    return (
        <div className="flex flex-col items-center py-20 text-center">
            <h3 className="text-2xl font-semibold">
                {title}
            </h3>

            <p className="mt-3 mb-6 max-w-md text-muted-foreground">
                {description}
            </p>

            <Button
                onClick={() => window.location.reload()}
            >
                Try Again
            </Button>
        </div>
    );
}