import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyDetailSkeleton() {
    return (
        <main className="py-16">
            <div className="mx-auto max-w-7xl px-6">
                {/* Top Section */}
                <div className="grid gap-10 lg:grid-cols-3">
                    {/* Gallery */}
                    <div className="space-y-4 lg:col-span-2">
                        <Skeleton className="aspect-video w-full rounded-3xl" />

                        <div className="grid grid-cols-4 gap-4">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    className="aspect-square rounded-2xl"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="space-y-4 rounded-3xl border p-6">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-5/6" />

                        <div className="space-y-3 pt-4">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    className="h-12 rounded-xl"
                                />
                            ))}
                        </div>

                        <Skeleton className="mt-6 h-12 rounded-xl" />
                    </div>
                </div>

                {/* Description */}
                <div className="mt-14 rounded-3xl border p-6">
                    <Skeleton className="mb-6 h-7 w-56" />

                    <div className="space-y-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                className="h-4 w-full"
                            />
                        ))}
                    </div>
                </div>

                {/* Information */}
                <div className="mt-10 rounded-3xl border p-6">
                    <Skeleton className="mb-6 h-7 w-48" />

                    <div className="grid gap-4 md:grid-cols-2">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                className="h-16 rounded-xl"
                            />
                        ))}
                    </div>
                </div>

                {/* Inquiry */}
                <div className="mt-14 rounded-3xl border p-8">
                    <Skeleton className="mb-8 h-8 w-64" />

                    <div className="space-y-6">
                        <Skeleton className="h-11 rounded-xl" />

                        <div className="grid gap-6 md:grid-cols-2">
                            <Skeleton className="h-11 rounded-xl" />
                            <Skeleton className="h-11 rounded-xl" />
                        </div>

                        <Skeleton className="h-36 rounded-xl" />

                        <Skeleton className="h-12 rounded-xl" />
                    </div>
                </div>
            </div>
        </main>
    );
}