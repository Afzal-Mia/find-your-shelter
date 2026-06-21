import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TestimonialSkeleton() {
    return (
        <Card className="h-full border-border/60">
            <CardContent className="flex h-full flex-col p-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-14 w-14 rounded-full" />

                        <div className="space-y-2">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-3 w-20" />
                        </div>
                    </div>

                    <Skeleton className="h-7 w-20 rounded-full" />
                </div>

                {/* Rating */}
                <div className="mt-6 flex gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-5 w-5 rounded"
                        />
                    ))}
                </div>

                {/* Comment */}
                <div className="mt-5 space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[95%]" />
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-4 w-[70%]" />
                </div>
            </CardContent>
        </Card>
    );
}