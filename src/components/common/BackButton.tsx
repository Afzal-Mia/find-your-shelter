"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

interface BackButtonProps {
    label?: string;
}

export default function BackButton({
    label = "Back",
}: BackButtonProps) {
    const router = useRouter();

    return (
        <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6 gap-2 rounded-xl px-3"
        >
            <ArrowLeft className="h-4 w-4" />
            {label}
        </Button>
    );
}