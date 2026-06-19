//@src/hooks/useProperties.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import {
    getProperties,
    PropertyFilters,
} from "@/services/property.service";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useProperties(filters: PropertyFilters) {
    return useQuery({
        queryKey: [QUERY_KEYS.properties, filters],
        queryFn: () => getProperties(filters),
    });
}