import api from "@/lib/api";
import { ReviewListResponse } from "@/types/api";

export interface ReviewFilters {
    page?: number;
    limit?: number;
}

export async function getReviews(
    filters: ReviewFilters
): Promise<ReviewListResponse> {
    const { data } = await api.get<ReviewListResponse>("/review/get", {
        params: {
            ...filters,
            status: "approved",
        },
    });

    return data;
}