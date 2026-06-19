// src/types/api.ts

import { Review } from "./review";
import { Property } from "./property";

export interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface PropertyListResponse {
    data: Property[];
    pagination: Pagination;
}

export interface PropertyResponse {
    property: Property;
}


export interface ReviewListResponse {
    data: Review[];
    pagination: Pagination;
}