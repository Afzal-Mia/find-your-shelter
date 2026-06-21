"use client";

import Container from "@/components/common/container";
import EmptyState from "@/components/common/EmptyState";
import ErrorState from "@/components/common/ErrorState";
import SectionHeader from "@/components/common/SectionHeader";
import PropertyGrid from "@/components/property/PropertyGrid";
import { useProperties } from "@/hooks/useProperties";
import PropertyGridSkeleton from "../property/PropertyGridSkeleton";

export default function FeaturedProperties() {
    const {
        data,
        isLoading,
        isError,
        refetch
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
                    <PropertyGridSkeleton />
                ) : isError ? (
                    <ErrorState
                        title="Failed to Load Properties"
                        description="Something went wrong while loading properties. Please try again."
                        onRetry={refetch}
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