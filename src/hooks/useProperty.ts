//@src/hooks/useProperty.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { getProperty } from "@/services/property.service";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useProperty(id: string) {
    return useQuery({
        queryKey: [QUERY_KEYS.property, id],
        queryFn: () => getProperty(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5, // 5 min
    });
}