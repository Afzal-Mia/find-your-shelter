"use client";

import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import {
    getProperties,
    PropertyFilters,
} from "@/services/property.service";

import { QUERY_KEYS } from "@/constants/queryKeys";

export function useInfiniteProperties(
    filters: Omit<PropertyFilters, "page">
) {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.properties, filters],

        initialPageParam: 1,

        queryFn: ({ pageParam }) =>
            getProperties({
                ...filters,
                page: pageParam,
            }),

        getNextPageParam: (lastPage) => {
            return lastPage.pagination.hasNextPage
                ? lastPage.pagination.page + 1
                : undefined;
        },
        staleTime: 1000 * 60 * 10,//10 min
    });
}