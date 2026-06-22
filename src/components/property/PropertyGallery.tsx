"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Property } from "@/types/property";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props {
    property: Property;
}

const statusVariant = {
    available: "default",
    partially_booked: "secondary",
    fully_booked: "destructive",
} as const;

export default function PropertyGallery({
    property,
}: Props) {
    const images =
        property.propertyImages?.length
            ? property.propertyImages
            : [
                {
                    url: "/images/no-image.jpg",
                    publicId: "fallback",
                },
            ];

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: images.length > 1,
    });

    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;

        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        onSelect();

        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);

        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    const statusText = property.status
        ?.split("_")
        .map(
            (word) =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
        )
        .join(" ");

    return (
        <section className="space-y-5">

            {/* Hero Image */}
            <div
                className="relative overflow-hidden rounded-3xl border shadow-sm"
                ref={emblaRef}
            >
                <div className="flex">
                    {images.map((image, index) => (
                        <div
                            key={image.publicId ?? index}
                            className="relative min-w-0 flex-[0_0_100%]"
                        >
                            <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden bg-muted">

                                <Image
                                    src={image.url}
                                    alt={property.title}
                                    fill
                                    priority={index === 0}
                                    className="object-cover transition-transform duration-700 hover:scale-105"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                                {/* Status */}
                                {property.status && (
                                    <div className="absolute right-6 top-6">
                                        <Badge
                                            variant={statusVariant[property.status]}
                                        >
                                            {statusText}
                                        </Badge>
                                    </div>
                                )}

                            </div>
                        </div>
                    ))}
                </div>

                {/* Floating Buttons */}
                {images.length > 1 && (
                    <>
                        <Button
                            size="icon"
                            variant="secondary"
                            onClick={scrollPrev}
                            className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>

                        <Button
                            size="icon"
                            variant="secondary"
                            onClick={scrollNext}
                            className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex justify-center gap-3 no-scrollbar overflow-x-auto  pb-2">

                    {images.map((image, index) => (
                        <button
                            key={image.publicId}
                            onClick={() => emblaApi?.scrollTo(index)}
                            className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${selectedIndex === index
                                ? "border-primary"
                                : "border-transparent opacity-70 hover:opacity-100"
                                }`}
                        >
                            <Image
                                src={image.url}
                                alt=""
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}

                </div>
            )}
        </section>
    );
}