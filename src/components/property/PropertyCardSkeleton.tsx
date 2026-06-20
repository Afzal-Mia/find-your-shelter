import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyCardSkeleton() {
    return (
        <Card className="overflow-hidden p-0 gap-0 rounded-2xl flex flex-col">
            {/* Image */}
            <Skeleton className="aspect-video w-full" />

            <CardContent className="space-y-3 p-4">
                {/* Title */}
                <Skeleton className="h-5 w-3/4" />

                {/* Rent skeleton and Room booking skeleton */}
                <Skeleton className="h-16 w-full rounded-xl" />

                {/* Property Info skeleton */}
                <Skeleton className="h-12 w-full rounded-xl" />

                {/* Rent */}
                <Skeleton className="h-8 w-1/3" />
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Skeleton className="h-9 w-full rounded-md" />
            </CardFooter>
        </Card>
    );
}