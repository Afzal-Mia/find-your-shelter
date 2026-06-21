import PropertyCardSkeleton from "./PropertyCardSkeleton";

interface PropertyGridSkeletonProps {
    count?: number;
}

export default function PropertyGridSkeleton({
    count = 10,
}: PropertyGridSkeletonProps) {
    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: count }).map((_, index) => (
                <PropertyCardSkeleton key={index} />
            ))}
        </div>
    );
}