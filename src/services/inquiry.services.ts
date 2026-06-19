// src/services/inquiry.service.ts

import { InquiryFormData } from "@/types/inquiry";
import { InquiryResponse } from "@/types/api";
import api from "@/lib/api";

export async function createInquiry(
    payload: InquiryFormData
): Promise<InquiryResponse> {
    const { data } = await api.post<InquiryResponse>(
        "/inquiry",
        payload
    );

    return data;
}