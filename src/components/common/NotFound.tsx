import Link from "next/link";
import { Home, SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";

interface NotFoundProps {
    title?: string;
    description?: string;
    buttonText?: string;
    buttonHref?: string;
}

export default function NotFound({
    title = "Page Not Found",
    description = "The page you're looking for doesn't exist or may have been moved.",
    buttonText = "Back to Home",
    buttonHref = "/",
}: NotFoundProps) {
    return (
        <section className="flex min-h-[70vh] items-center justify-center px-6">
            <div className="mx-auto max-w-xl text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                    <SearchX className="h-12 w-12 text-primary" />
                </div>

                <h1 className="mt-8 text-4xl font-bold tracking-tight">
                    {title}
                </h1>

                <p className="mt-4 text-muted-foreground">
                    {description}
                </p>

                <Button
                    asChild
                    size="lg"
                    className="mt-8"
                >
                    <Link href={buttonHref}>
                        <Home className="mr-2 h-4 w-4" />
                        {buttonText}
                    </Link>
                </Button>
            </div>
        </section>
    );
}