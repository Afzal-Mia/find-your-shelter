"use client";

import { useInfiniteProperties } from "@/hooks/useInfiniteProperties";
import { useDebounce } from "@/hooks/useDebounce";

import { useState } from "react";

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
        <main className="py-20">
            <div className="container mx-auto max-w-7xl px-6">
                {/* Heading */}
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold">
                        Browse Properties
                    </h1>

                    <p className="mt-3 text-muted-foreground">
                        Find verified rental properties that suit your
                        needs.
                    </p>
                </div>

                {/* Filters */}
                <SearchFilters
                    filters={filters}
                    onChange={setFilters}
                />

                {/* Results */}
                <div className="mt-10">
                    {isLoading ? (
                        <PropertyGridSkeleton count={6} />
                    ) : isError ? (
                        <ErrorState
                            title="Failed to load properties"
                            description="Something went wrong. Please try again."
                            onRetry={refetch}
                        />
                    ) : properties.length ? (
                        <>

                            <PropertyGrid
                                properties={properties}
                            />

                            <LoadMoreButton
                                hasNextPage={!!hasNextPage}
                                isLoading={isFetchingNextPage}
                                onLoadMore={() => fetchNextPage()}
                            />
                        </>
                    ) : (
                        <EmptyState
                            title="No Properties Found"
                            description="Try changing your search or filters."
                        />
                    )}
                </div>
            </div>
        </main>
    );
}