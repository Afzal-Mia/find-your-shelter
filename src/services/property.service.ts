//@src/services/property.service.ts
import api from "@/lib/api";
import {
    PropertyListResponse,
    PropertyResponse,
} from "@/types/api";

export interface PropertyFilters {
    page?: number;
    limit?: number;
    search?: string;
    type?: "flat" | "house" | "villa";
    status?: "available" | "partially_booked" | "fully_booked";
}

export async function getProperties(
    filters: PropertyFilters
): Promise<PropertyListResponse> {
    const { data } = await api.get<PropertyListResponse>(
        "/property/get",
        {
            params: filters,
        }
    );

    return data;
}

export async function getProperty(
    id: string
): Promise<PropertyResponse> {
    const { data } = await api.get<PropertyResponse>(
        `/property/get/${id}`
    );

    return data;
}

//src/constants/queryKeys.ts