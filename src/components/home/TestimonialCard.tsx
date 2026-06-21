"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, BadgeCheck } from "lucide-react";
import { Review } from "@/types/review";

interface TestimonialCardProps {
    review: Review;
}

function getInitials(name: string) {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("");
}

export default function TestimonialCard({
    review,
}: TestimonialCardProps) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 40,
                scale: 0.95,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
            }}
            viewport={{
                once: false,
                amount: 0.3,
            }}
            transition={{
                duration: 0.6,
                ease: "easeOut",
            }}
        >
            <Card className="group h-full border-border/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                <CardContent className="flex h-full flex-col p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                                {getInitials(review.name)}
                            </div>

                            <div>
                                <h3 className="font-semibold text-foreground">
                                    {review.name}
                                </h3>
                            </div>
                        </div>

                        <Badge
                            variant="secondary"
                            className="gap-1 rounded-full"
                        >
                            <BadgeCheck className="h-3.5 w-3.5 text-emerald-600" />
                            Verified
                        </Badge>
                    </div>

                    {/* Rating */}
                    <div className="mt-6 flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                                key={index}
                                className={`h-5 w-5 ${index < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Comment */}
                    <p className="mt-5 flex-1 leading-7 text-muted-foreground">
                        "{review.comment}"
                    </p>
                </CardContent>
            </Card>
        </motion.div>
    );
}