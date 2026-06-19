// src/types/inquiry.ts

import { z } from "zod";
import { inquiryCreateSchema } from "@/app/api/inquiry/inquiry.validation";

export type InquiryFormData = Omit<
    z.infer<typeof inquiryCreateSchema>,
    "status"
>;