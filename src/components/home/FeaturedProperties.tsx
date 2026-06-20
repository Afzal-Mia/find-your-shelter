"use client";

import Container from "@/components/common/container";
import EmptyState from "@/components/common/EmptyState";
import ErrorState from "@/components/common/ErrorState";
import SectionHeader from "@/components/common/SectionHeader";
import PropertyGrid from "@/components/property/PropertyGrid";
import { useProperties } from "@/hooks/useProperties";
import PropertyCardSkeleton from "@/components/property/PropertyCardSkeleton";

export default function FeaturedProperties() {
    const {
        data,
        isLoading,
        isError,
    } = useProperties({
        page: 1,
        limit: 6,
    });

    return (
        <section className="section bg-secondary">
            <Container>
                <SectionHeader
                    title="Featured Properties"
                    description="Discover our latest verified flats, houses, and villas available for rent. Every listing is carefully reviewed to help you find your next home with confidence."
                    actionLabel="See More Properties"
                    actionHref="/properties"
                />

                {isLoading ? (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <PropertyCardSkeleton key={index} />
                        ))}
                    </div>
                ) : isError ? (
                    <ErrorState
                        title="Failed to Load Properties"
                        description="Something went wrong while loading properties. Please try again."
                    />
                ) : !data || data.data.length === 0 ? (
                    <EmptyState
                        title="No Properties Found"
                        description="There are currently no featured properties available."
                    />
                ) : (
                    <PropertyGrid properties={data.data} />
                )}
            </Container>
        </section>
    );
}