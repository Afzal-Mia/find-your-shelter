//@src/hooks/useReviews.ts
"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getReviews, ReviewFilters } from "@/services/review.service";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useReviews(filters: ReviewFilters) {
    return useQuery({
        queryKey: [QUERY_KEYS.reviews, filters],
        queryFn: () => getReviews(filters),
        staleTime: 1000 * 60 * 10,
    });
}