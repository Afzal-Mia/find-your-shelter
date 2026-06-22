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
        <section className="space-y-6 sm:space-y-8">
            {/* Header */}

            <div>
                <h2 className="text-2xl font-bold sm:text-3xl">
                    Description
                </h2>

                <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                    Learn more about this property.
                </p>
            </div>

            {/* Card */}

            <Card className="overflow-hidden rounded-2xl border shadow-sm">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                    {/* Top */}

                    <div className="mb-5 flex items-start gap-3 sm:mb-6 sm:items-center">
                        <div className="rounded-lg bg-primary/10 p-2.5 sm:rounded-xl sm:p-3">
                            <FileText className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                        </div>

                        <div className="min-w-0">
                            <h3 className="text-base font-semibold sm:text-lg">
                                Property Overview
                            </h3>

                            <p className="text-xs text-muted-foreground sm:text-sm">
                                Detailed information provided by the owner.
                            </p>
                        </div>
                    </div>

                    {/* Description */}

                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                        <p className="whitespace-pre-line break-words text-sm leading-7 text-muted-foreground sm:text-[15px] sm:leading-8 lg:text-base lg:leading-8">
                            {property.description}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}