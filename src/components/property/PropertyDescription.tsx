"use client";

import { FileText } from "lucide-react";

import { Property } from "@/types/property";

import { Card, CardContent } from "@/components/ui/card";

interface Props {
    property: Property;
}

export default function PropertyDescription({
    property,
}: Props) {
    if (!property.description?.trim()) {
        return null;
    }

    return (
        <section className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold">
                    Description
                </h2>

                <p className="mt-2 text-muted-foreground">
                    Learn more about this property.
                </p>
            </div>

            <Card className="overflow-hidden rounded-2xl border shadow-sm">
                <CardContent className="p-8">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="rounded-xl bg-primary/10 p-3">
                            <FileText className="h-6 w-6 text-primary" />
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg">
                                Property Overview
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                Detailed information provided by the owner.
                            </p>
                        </div>
                    </div>

                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                        <p className="whitespace-pre-line leading-8 text-muted-foreground text-[15px]">
                            {property.description}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}