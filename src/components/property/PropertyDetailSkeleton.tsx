import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyDetailSkeleton() {
    return (
        <main className="pb-20">

            {/* Hero Gallery */}
            <section className="container mx-auto max-w-7xl px-6 pt-10">

                {/* Back Button */}
                <Skeleton className="mb-6 h-10 w-40 rounded-xl" />

                {/* Hero Image */}
                <Skeleton className="h-[250px] w-full rounded-3xl sm:h-[350px] md:h-[450px] lg:h-[550px]" />

                {/* Thumbnails */}
                <div className="mt-5 flex justify-center gap-3">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-20 w-28 rounded-xl"
                        />
                    ))}
                </div>
            </section>

            {/* Property Summary */}
            <section className="container mx-auto mt-8 max-w-7xl px-6">
                <div className="rounded-3xl border p-8">

                    <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">

                        <div className="flex-1 space-y-4">

                            <Skeleton className="h-10 w-3/5" />

                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-11/12" />
                            <Skeleton className="h-5 w-3/4" />

                        </div>

                        <Skeleton className="h-28 w-56 rounded-2xl" />

                    </div>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <Skeleton className="h-12 w-32 rounded-xl" />
                        <Skeleton className="h-12 w-32 rounded-xl" />
                        <Skeleton className="h-12 w-56 rounded-xl" />
                    </div>

                </div>
            </section>

            {/* Booking Progress */}
            <section className="container mx-auto mt-10 max-w-7xl px-6">
                <div className="rounded-3xl border p-8">

                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="mt-3 h-5 w-96" />

                    <div className="mt-8 rounded-3xl border p-6">

                        <div className="flex items-center justify-between">

                            <div className="flex items-center gap-4">
                                <Skeleton className="h-14 w-14 rounded-xl" />

                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-44" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                            </div>

                            <Skeleton className="h-10 w-32 rounded-full" />

                        </div>

                        <Skeleton className="mt-8 h-4 w-full rounded-full" />

                        <div className="mt-8 grid gap-4 md:grid-cols-3">

                            <Skeleton className="h-28 rounded-2xl" />
                            <Skeleton className="h-28 rounded-2xl" />
                            <Skeleton className="h-28 rounded-2xl" />

                        </div>

                        <Skeleton className="mt-8 h-16 rounded-2xl" />

                    </div>

                </div>
            </section>

            {/* Description */}
            <section className="container mx-auto mt-10 max-w-7xl px-6">
                <div className="rounded-3xl border p-8">

                    <Skeleton className="mb-6 h-8 w-56" />

                    <div className="space-y-4">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-11/12" />
                        <Skeleton className="h-5 w-10/12" />
                        <Skeleton className="h-5 w-8/12" />
                    </div>

                </div>
            </section>

            {/* Property Information */}
            <section className="container mx-auto mt-10 max-w-7xl px-6">
                <div className="rounded-3xl border p-8">

                    <Skeleton className="mb-3 h-8 w-60" />
                    <Skeleton className="mb-8 h-5 w-80" />

                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="rounded-2xl border p-5"
                            >
                                <Skeleton className="h-12 w-12 rounded-xl" />
                                <Skeleton className="mt-5 h-4 w-28" />
                                <Skeleton className="mt-3 h-6 w-40" />
                            </div>
                        ))}

                    </div>

                </div>
            </section>

            {/* Location */}
            <section className="container mx-auto mt-10 max-w-7xl px-6">
                <div className="rounded-3xl border p-8">

                    <Skeleton className="mb-3 h-8 w-44" />
                    <Skeleton className="mb-8 h-5 w-72" />

                    <Skeleton className="h-[400px] w-full rounded-2xl" />

                </div>
            </section>

            {/* Inquiry */}
            <section className="container mx-auto mt-14 max-w-7xl px-6">

                <div className="overflow-hidden rounded-3xl border">

                    <div className="grid lg:grid-cols-2">

                        {/* Left */}
                        <div className="space-y-6 p-10">

                            <Skeleton className="h-14 w-14 rounded-2xl" />

                            <Skeleton className="h-10 w-72" />

                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-11/12" />

                            <div className="space-y-5 pt-4">

                                {Array.from({ length: 3 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-4"
                                    >
                                        <Skeleton className="h-11 w-11 rounded-xl" />

                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-5 w-40" />
                                            <Skeleton className="h-4 w-full" />
                                        </div>
                                    </div>
                                ))}

                            </div>

                        </div>

                        {/* Right */}
                        <div className="space-y-6 p-10">

                            <Skeleton className="h-8 w-52" />

                            <Skeleton className="h-5 w-48" />

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

            </section>

        </main>
    );
}