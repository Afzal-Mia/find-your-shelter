"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Property } from "@/types/property";

interface Props {
    property: Property;
}

export default function PropertyGallery({
    property,
}: Props) {
    const images =
        property.propertyImages?.length
            ? property.propertyImages
            : [{ url: "/images/no-image.jpg", publicId: "fallback" }];

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: images.length > 1,
        align: "center",
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

    return (
        <div className="space-y-5">

            {/* Carousel */}
            <div
                className="overflow-hidden rounded-3xl border"
                ref={emblaRef}
            >
                <div className="flex">
                    {images.map((image, index) => (
                        <div
                            key={image.publicId ?? index}
                            className="relative min-w-0 flex-[0_0_100%]"
                        >
                            <div className="group relative aspect-[16/10] overflow-hidden bg-muted">
                                <Image
                                    src={image.url}
                                    alt={`${property.title} ${index + 1}`}
                                    fill
                                    priority={index === 0}
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                                {/* Counter */}
                                {images.length > 1 && (
                                    <div className="absolute bottom-5 right-5 rounded-full bg-black/70 px-3 py-1 text-sm font-medium text-white backdrop-blur">
                                        {selectedIndex + 1} / {images.length}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Controls */}
            {images.length > 1 && (
                <div className="flex items-center justify-center gap-6">

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={scrollPrev}
                        className="rounded-full"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>

                    {/* Dots */}
                    <div className="flex gap-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => emblaApi?.scrollTo(index)}
                                className={`h-2.5 rounded-full transition-all duration-300 ${selectedIndex === index
                                    ? "w-8 bg-primary"
                                    : "w-2.5 bg-muted-foreground/30"
                                    }`}
                            />
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={scrollNext}
                        className="rounded-full"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>

                </div>
            )}
        </div>
    );
}