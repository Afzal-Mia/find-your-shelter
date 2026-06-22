"use client";

import { useState } from "react";

import { useInfiniteProperties } from "@/hooks/useInfiniteProperties";
import { useDebounce } from "@/hooks/useDebounce";

import SearchFilters, {
    PropertyFilters,
} from "@/components/property/SearchFilters";

import PropertyGrid from "@/components/property/PropertyGrid";
import PropertyGridSkeleton from "@/components/property/PropertyGridSkeleton";

import EmptyState from "@/components/common/EmptyState";
import ErrorState from "@/components/common/ErrorState";
import LoadMoreButton from "@/components/common/LoadMoreButton";

export default function PropertiesPage() {
    const [filters, setFilters] = useState<PropertyFilters>({
        search: "",
        type: "all",
        status: "all",
    });

    const debouncedSearch = useDebounce(filters.search, 500);

    const {
        data,
        isLoading,
        isError,
        refetch,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteProperties({
        limit: 10,
        search: debouncedSearch || undefined,
        type:
            filters.type === "all"
                ? undefined
                : (filters.type as "flat" | "house" | "villa"),
        status:
            filters.status === "all"
                ? undefined
                : (filters.status as
                    | "available"
                    | "partially_booked"
                    | "fully_booked"),
    });

    const properties =
        data?.pages.flatMap((page) => page.data) ?? [];

    const total =
        data?.pages[0]?.pagination.total ?? 0;

    return (
        <main className="py-8 sm:py-10 lg:py-14 xl:py-20">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                {/* Header */}
                <div className="mb-8 text-center sm:mb-10 lg:mb-12">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                        Browse Properties
                    </h1>

                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base lg:text-lg">
                        Explore verified flats, houses, and villas that
                        match your budget and lifestyle. Use the filters
                        below to quickly find your perfect rental home.
                    </p>


                </div>

                {/* Filters */}
                <SearchFilters
                    filters={filters}
                    onChange={setFilters}
                />

                {/* Results */}
                <div className="mt-8 sm:mt-10">
                    {isLoading ? (
                        <PropertyGridSkeleton count={10} />
                    ) : isError ? (
                        <ErrorState
                            title="Failed to load properties"
                            description="Something went wrong while loading properties. Please try again."
                            onRetry={refetch}
                        />
                    ) : properties.length > 0 ? (
                        <div className="space-y-8 sm:space-y-10">
                            <PropertyGrid
                                properties={properties}
                            />

                            <LoadMoreButton
                                hasNextPage={!!hasNextPage}
                                isLoading={isFetchingNextPage}
                                onLoadMore={() => fetchNextPage()}
                            />
                        </div>
                    ) : (
                        <EmptyState
                            title="No Properties Found"
                            description="Try changing your search keywords or filters to discover more properties."
                        />
                    )}
                </div>
            </div>
        </main>
    );
}