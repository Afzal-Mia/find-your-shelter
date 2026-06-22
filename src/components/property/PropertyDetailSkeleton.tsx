import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyDetailSkeleton() {
    return (
        <main className="pb-12 sm:pb-16 lg:pb-20">
            {/* Hero Gallery */}
            <section className="container mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-10">
                {/* Back Button */}
                <Skeleton className="mb-4 h-9 w-36 rounded-xl sm:mb-6 sm:h-10 sm:w-40" />

                {/* Hero Image */}
                <Skeleton className="h-[220px] w-full rounded-2xl sm:h-[320px] sm:rounded-3xl md:h-[420px] lg:h-[550px]" />

                {/* Thumbnails */}
                <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto pb-2 sm:mt-5 sm:justify-center">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-16 w-24 shrink-0 rounded-xl sm:h-20 sm:w-28"
                        />
                    ))}
                </div>
            </section>

            {/* Property Summary */}
            <section className="container mx-auto mt-6 max-w-7xl px-4 sm:mt-8 sm:px-6 lg:px-8">
                <div className="rounded-2xl border p-4 sm:rounded-3xl sm:p-6 lg:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
                        <div className="flex-1 space-y-4">
                            <Skeleton className="h-8 w-4/5 sm:h-10 sm:w-3/5" />

                            <Skeleton className="h-4 w-full sm:h-5" />
                            <Skeleton className="h-4 w-11/12 sm:h-5" />
                            <Skeleton className="h-4 w-3/4 sm:h-5" />
                        </div>

                        <Skeleton className="h-24 w-full rounded-2xl lg:h-28 lg:w-56" />
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
                        <Skeleton className="h-10 w-28 rounded-xl sm:h-12 sm:w-32" />
                        <Skeleton className="h-10 w-28 rounded-xl sm:h-12 sm:w-32" />
                        <Skeleton className="h-10 w-44 rounded-xl sm:h-12 sm:w-56" />
                    </div>
                </div>
            </section>

            {/* Booking Progress */}
            <section className="container mx-auto mt-6 max-w-7xl px-4 sm:mt-8 sm:px-6 lg:mt-10 lg:px-8">
                <div className="rounded-2xl border p-4 sm:rounded-3xl sm:p-6 lg:p-8">
                    <Skeleton className="h-7 w-44 sm:h-8 sm:w-64" />
                    <Skeleton className="mt-3 h-4 w-3/4 sm:h-5 sm:w-96" />

                    <div className="mt-6 rounded-2xl border p-4 sm:mt-8 sm:rounded-3xl sm:p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <Skeleton className="h-12 w-12 rounded-xl sm:h-14 sm:w-14" />

                                <div className="space-y-2">
                                    <Skeleton className="h-5 w-36 sm:h-6 sm:w-44" />
                                    <Skeleton className="h-4 w-28 sm:w-32" />
                                </div>
                            </div>

                            <Skeleton className="h-10 w-full rounded-full sm:w-32" />
                        </div>

                        <Skeleton className="mt-6 h-3 w-full rounded-full sm:mt-8 sm:h-4" />

                        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-3">
                            <Skeleton className="h-24 rounded-2xl sm:h-28" />
                            <Skeleton className="h-24 rounded-2xl sm:h-28" />
                            <Skeleton className="h-24 rounded-2xl sm:h-28" />
                        </div>

                        <Skeleton className="mt-6 h-14 rounded-2xl sm:mt-8 sm:h-16" />
                    </div>
                </div>
            </section>

            {/* Description */}
            <section className="container mx-auto mt-6 max-w-7xl px-4 sm:mt-8 sm:px-6 lg:mt-10 lg:px-8">
                <div className="rounded-2xl border p-4 sm:rounded-3xl sm:p-6 lg:p-8">
                    <Skeleton className="mb-5 h-7 w-40 sm:mb-6 sm:h-8 sm:w-56" />

                    <div className="space-y-3 sm:space-y-4">
                        <Skeleton className="h-4 w-full sm:h-5" />
                        <Skeleton className="h-4 w-full sm:h-5" />
                        <Skeleton className="h-4 w-11/12 sm:h-5" />
                        <Skeleton className="h-4 w-10/12 sm:h-5" />
                        <Skeleton className="h-4 w-8/12 sm:h-5" />
                    </div>
                </div>
            </section>

            {/* Property Information */}
            <section className="container mx-auto mt-6 max-w-7xl px-4 sm:mt-8 sm:px-6 lg:mt-10 lg:px-8">
                <div className="rounded-2xl border p-4 sm:rounded-3xl sm:p-6 lg:p-8">
                    <Skeleton className="mb-3 h-7 w-44 sm:h-8 sm:w-60" />
                    <Skeleton className="mb-6 h-4 w-3/4 sm:mb-8 sm:h-5 sm:w-80" />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="rounded-2xl border p-4 sm:p-5"
                            >
                                <Skeleton className="h-10 w-10 rounded-xl sm:h-12 sm:w-12" />
                                <Skeleton className="mt-4 h-4 w-24 sm:mt-5 sm:w-28" />
                                <Skeleton className="mt-3 h-5 w-32 sm:h-6 sm:w-40" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Location */}
            <section className="container mx-auto mt-6 max-w-7xl px-4 sm:mt-8 sm:px-6 lg:mt-10 lg:px-8">
                <div className="rounded-2xl border p-4 sm:rounded-3xl sm:p-6 lg:p-8">
                    <Skeleton className="mb-3 h-7 w-36 sm:h-8 sm:w-44" />
                    <Skeleton className="mb-6 h-4 w-2/3 sm:mb-8 sm:h-5 sm:w-72" />

                    <Skeleton className="h-[250px] w-full rounded-2xl sm:h-[320px] lg:h-[400px]" />
                </div>
            </section>

            {/* Inquiry */}
            <section className="container mx-auto mt-8 max-w-7xl px-4 sm:mt-10 sm:px-6 lg:mt-14 lg:px-8">
                <div className="overflow-hidden rounded-2xl border sm:rounded-3xl">
                    <div className="grid lg:grid-cols-2">
                        {/* Left */}
                        <div className="space-y-5 p-5 sm:space-y-6 sm:p-6 lg:p-10">
                            <Skeleton className="h-12 w-12 rounded-2xl sm:h-14 sm:w-14" />

                            <Skeleton className="h-8 w-52 sm:h-10 sm:w-72" />

                            <Skeleton className="h-4 w-full sm:h-5" />
                            <Skeleton className="h-4 w-11/12 sm:h-5" />

                            <div className="space-y-4 pt-2 sm:space-y-5 sm:pt-4">
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-3 sm:gap-4"
                                    >
                                        <Skeleton className="h-10 w-10 rounded-xl sm:h-11 sm:w-11" />

                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-32 sm:h-5 sm:w-40" />
                                            <Skeleton className="h-4 w-full" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right */}
                        <div className="space-y-5 border-t p-5 sm:space-y-6 sm:p-6 lg:border-l lg:border-t-0 lg:p-10">
                            <Skeleton className="h-7 w-40 sm:h-8 sm:w-52" />

                            <Skeleton className="h-4 w-36 sm:h-5 sm:w-48" />

                            <Skeleton className="h-11 rounded-xl" />

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                                <Skeleton className="h-11 rounded-xl" />
                                <Skeleton className="h-11 rounded-xl" />
                            </div>

                            <Skeleton className="h-32 rounded-xl sm:h-36" />

                            <Skeleton className="h-12 rounded-xl" />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}