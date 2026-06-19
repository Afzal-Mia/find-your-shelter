// src/types/property.ts

import { propertyBaseSchema } from "@/app/api/property/property.validation";
import { z } from "zod";

export type Property = z.infer<typeof propertyBaseSchema> & {
    _id: string;
    createdAt: string;
    updatedAt: string;
};