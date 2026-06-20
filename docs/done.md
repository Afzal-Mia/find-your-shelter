# Phase 1 — Project Setup
pnpm add @tanstack/react-query
pnpm add @tanstack/react-query-devtools
pnpm add react-hook-form
pnpm add @hookform/resolvers
pnpm add react-hot-toast
pnpm add axios
pnpm add lucide-react
pnpm add class-variance-authority clsx tailwind-merge
pnpm add embla-carousel-react

pnpm dlx shadcn@latest init

pnpm dlx shadcn@latest add \
button \
card \
input \
textarea \
select \
badge \
skeleton \
sheet \
separator \
avatar \
pagination \
form

pnpm dlx shadcn@latest add dialog dropdown-menu alert accordion tabs tooltip breadcrumb


# src/
└── providers/
    └── query-provider.tsx

# Wrap your application 

src/app/layout.tsx with query provider and react-hot-toast provider

update query-provider.tsx with ReactQueryDevtools 


# folder structure i would  use
src
│
├── app
│   ├── api
│   │
│   ├── page.tsx
│   ├── properties
│   │   ├── page.tsx
│   │   └── [id]
│   │
│   └── layout.tsx
│
├── components
│   ├── common
│   ├── home
│   ├── layout
│   ├── property
│   ├── inquiry
│   └── review
│
├── hooks
│
├── services
│
├── providers
│
├── lib
│   ├── api.ts
│   └── utils.ts
│
├── models
├── middleware
├── types
└── validations


// src/types/api.ts

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

// src/types/property.ts

import { propertyBaseSchema } from "@/app/api/property/property.validation";
import { z } from "zod";

export type Property = z.infer<typeof propertyBaseSchema> & {
    _id: string;
    createdAt: string;
    updatedAt: string;
};

//@/app/api/property/property.validation";
export const propertyBaseSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 5 characters' }),
  description: z.string().optional(),
  type: z.enum(['flat', 'house', 'villa']),
  bhk: z.number().int().nonnegative().optional(),
  allowRoomBooking: z.boolean().optional(),
  rent: z.number().nonnegative().optional(),
  coordinates: z.object({
    latitude: z.number(),
    longitude: z.number()
  }).optional(),
  totalRooms: z.number().int().nonnegative().optional(),
  totalBookedRooms: z.number().int().nonnegative().optional(),
  propertyImages: z.array(
    z.object({
      url: z.string().url(),
      publicId: z.string()
    })
  ).optional(),
  status: z.enum(['available', 'partially_booked', 'fully_booked']).optional()
});

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
        `/property/${id}`
    );

    return data;
}

//@src/constants/queryKeys.ts
export const QUERY_KEYS = {
  properties: "properties",
  property: "property",
} as const;

//@src/hooks/useProperties.ts
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
    });
}
////@src/types/review.ts
import { z } from "zod";
import { createReviewSchema } from "@/app/api/review/review.validation";

export type Review = Pick<
    z.infer<typeof createReviewSchema>,
    "name" | "rating" | "comment"
> & {
    _id: string;
    createdAt: string;
};

//@types/api.ts
import { Review } from "./review";

export interface ReviewListResponse {
  data: Review[];
  pagination: Pagination;
}

//@src/services/review.service.ts
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

//added this to @src/constants/queryKeys.ts
reviews: "reviews",

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

// src/types/inquiry.ts

import { z } from "zod";
import { inquiryCreateSchema } from "@/app/api/inquiry/inquiry.validation";

export type InquiryFormData = Omit<
  z.infer<typeof inquiryCreateSchema>,
  "status"
>;

//@src/types/api.ts
export interface InquiryResponse {
  message: string;
}

// src/services/inquiry.service.ts

import { api } from "@/lib/api";
import { InquiryFormData } from "@/types/inquiry";
import { InquiryResponse } from "@/types/api";

export async function createInquiry(
  payload: InquiryFormData
): Promise<InquiryResponse> {
  const { data } = await api.post<InquiryResponse>(
    "/inquiry",
    payload
  );

  return data;
}

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

//@scr/hooks/useInquiry.ts
"use client";

"use client";

import { createInquiry } from "@/services/inquiry.services";
import { useMutation } from "@tanstack/react-query";

export function useInquiry() {
    return useMutation({
        mutationFn: createInquiry,
    });
}

// src/components/common/Container.tsx
// src/components/layout/Logo.tsx
// src/components/layout/Navbar.tsx
// src/components/layout/Footer.tsx
//src/components/common/Heading.tsx
//define globle.css 
//src/components/home/Hero.tsx
//src/components/property/PropertyCard.tsx
src/components/property/PropertyCardSkeleton.tsx
src/components/property/PropertyGridkeleton.tsx
src/components/property/PropertyGrid.tsx
src/components/common/EmptyState.tsx
src/components/common/ErrorState.tsx
src/components/common/SectionHeader.tsx