//@src/hooks/useReviews.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { getReviews, ReviewFilters } from "@/services/review.service";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useReviews(filters: ReviewFilters) {
    return useQuery({
        queryKey: [QUERY_KEYS.reviews, filters],
        queryFn: () => getReviews(filters),
    });
}