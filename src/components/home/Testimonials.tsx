"use client";

import { MessageSquareQuote } from "lucide-react";

import { useReviews } from "@/hooks/useReviews";

import TestimonialCard from "./TestimonialCard";
import TestimonialsSkeleton from "./TestimonialsSkeleton";

import ErrorState from "@/components/common/ErrorState";

export default function Testimonials() {
    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useReviews({
        page: 1,
        limit: 6,
    });

    if (isLoading) {
        return (
            <section className="bg-background py-14 sm:py-16 lg:py-24">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary sm:px-4 sm:py-2 sm:text-sm">
                            Testimonials
                        </span>

                        <h2 className="mt-4 text-2xl font-bold tracking-tight sm:mt-5 sm:text-3xl lg:text-4xl xl:text-5xl">
                            What Our Customers Say
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-muted-foreground sm:mt-5 sm:text-base lg:text-lg">
                            Hear from renters who found their perfect home
                            through Find Your Shelter.
                        </p>
                    </div>

                    <div className="mt-10 sm:mt-12 lg:mt-16">
                        <TestimonialsSkeleton />
                    </div>
                </div>
            </section>
        );
    }

    if (isError) {
        return (
            <section className="py-14 sm:py-16 lg:py-24">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                    <ErrorState
                        title="Failed to load testimonials"
                        description="Please try again."
                        onRetry={refetch}
                    />
                </div>
            </section>
        );
    }

    const reviews = data?.data ?? [];

    const defaultReviews = [
        {
            _id: "default-1",
            name: "Rahul Sharma",
            rating: 5,
            comment:
                "I found my rental apartment within a week. The property details were accurate, and the entire process was smooth and hassle-free. Highly recommended!",
        },
        {
            _id: "default-2",
            name: "Priya Patel",
            rating: 5,
            comment:
                "The team was extremely helpful and responsive. I loved the verified property listings and the transparent communication throughout.",
        },
        {
            _id: "default-3",
            name: "Amit Verma",
            rating: 4,
            comment:
                "A great platform for finding quality rental homes. The booking experience was easy, and customer support answered all my questions quickly.",
        },
        {
            _id: "default-4",
            name: "Sneha Kulkarni",
            rating: 5,
            comment:
                "As someone relocating for work, this platform made house hunting stress-free. I found a great home much faster than expected.",
            createdAt: new Date().toISOString(),
        },
        {
            _id: "default-5",
            name: "Arjun Mehta",
            rating: 5,
            comment:
                "The room booking feature was very useful. I could clearly see availability before contacting the owner, which saved a lot of time.",
        },
        {
            _id: "default-6",
            name: "Neha Singh",
            rating: 4,
            comment:
                "A clean interface with verified listings. The team guided me throughout the process, and I moved into my new apartment without any hassle.",
        },
    ];

    const displayReviews =
        reviews.length > 0 ? reviews : defaultReviews;

    return (
        <section className="bg-background py-14 sm:py-16 lg:py-24">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                {/* Heading */}
                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary sm:px-4 sm:py-2 sm:text-sm">
                        <MessageSquareQuote className="h-4 w-4" />
                        Testimonials
                    </span>

                    <h2 className="mt-4 text-2xl font-bold tracking-tight sm:mt-5 sm:text-3xl lg:text-4xl xl:text-5xl">
                        What Our Customers Say
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-muted-foreground sm:mt-5 sm:text-base lg:text-lg lg:leading-8">
                        Read genuine experiences from renters who trusted{" "}
                        <span className="font-semibold text-foreground">
                            Find Your Shelter
                        </span>{" "}
                        to discover their next home.
                    </p>
                </div>

                {/* Testimonials */}
                <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 xl:mt-16 xl:grid-cols-3">
                    {displayReviews.map((review) => (
                        <TestimonialCard
                            key={review._id}
                            review={review}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}