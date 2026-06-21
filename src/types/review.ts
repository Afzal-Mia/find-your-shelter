//@src/types/review.ts
import { z } from "zod";
import { createReviewSchema } from "@/app/api/review/review.validation";

export type Review = Pick<
    z.infer<typeof createReviewSchema>,
    "name" | "rating" | "comment"
> & {
    _id: string;
};