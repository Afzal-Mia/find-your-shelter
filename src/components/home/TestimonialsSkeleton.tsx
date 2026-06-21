import TestimonialSkeleton from "./TestimonialSkeleton";

export default function TestimonialsSkeleton() {
    return (
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
                <TestimonialSkeleton key={index} />
            ))}
        </div>
    );
}