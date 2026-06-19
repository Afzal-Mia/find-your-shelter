"use client";

import { createInquiry } from "@/services/inquiry.services";
import { useMutation } from "@tanstack/react-query";

export function useInquiry() {
    return useMutation({
        mutationFn: createInquiry,
    });
}