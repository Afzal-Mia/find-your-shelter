"use client";

import { MessageSquareQuote } from "lucide-react";

import { useReviews } from "@/hooks/useReviews";

import TestimonialCard from "./TestimonialCard";
import TestimonialsSkeleton from "./TestimonialsSkeleton";

import EmptyState from "@/components/common/EmptyState";
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
            <section className="py-24 bg-background">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                            Testimonials
                        </span>

                        <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                            What Our Customers Say
                        </h2>

                        <p className="mt-5 text-lg text-muted-foreground">
                            Hear from renters who found their perfect home through Find Your Shelter.
                        </p>
                    </div>

                    <TestimonialsSkeleton />
                </div>
            </section>
        );
    }

    if (isError) {
        return (
            <section className="py-24">
                <div className="container mx-auto max-w-7xl px-6">
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

    return (
        <section className="bg-background py-24">
            <div className="container mx-auto max-w-7xl px-6">
                {/* Heading */}

                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                        <MessageSquareQuote className="h-4 w-4" />
                        Testimonials
                    </span>

                    <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                        What Our Customers Say
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-muted-foreground">
                        Read genuine experiences from renters who trusted
                        <span className="font-medium text-foreground">
                            {" "}
                            Find Your Shelter
                        </span>{" "}
                        to discover their next home.
                    </p>
                </div>

                {/* Empty */}

                {reviews.length === 0 ? (
                    <div className="mt-16">
                        <EmptyState
                            title="No Reviews Yet"
                            description="Be the first person to share your experience."
                        />
                    </div>
                ) : (
                    <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {reviews.map((review) => (
                            <TestimonialCard
                                key={review._id}
                                review={review}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}