import {
    BedDouble,
    Building2,
    Home,
    Landmark,
} from "lucide-react";

import { Property } from "@/types/property";

import { Badge } from "@/components/ui/badge";

interface Props {
    property: Property;
}

const statusVariant = {
    available: "default",
    partially_booked: "secondary",
    fully_booked: "destructive",
} as const;

export default function PropertySummary({
    property,
}: Props) {
    const statusText = property.status
        ?.split("_")
        .map(
            (word) =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
        )
        .join(" ");

    return (
        <section className="mt-6 rounded-2xl border bg-card p-4 shadow-sm sm:mt-8 sm:rounded-3xl sm:p-6 lg:p-8">
            {/* Top */}

            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <h1 className="break-words text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                            {property.title}
                        </h1>

                        {property.status && (
                            <Badge
                                variant={statusVariant[property.status]}
                                className="text-xs sm:text-sm"
                            >
                                {statusText}
                            </Badge>
                        )}
                    </div>

                    {property.description && (
                        <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                            {property.description}
                        </p>
                    )}
                </div>

                {property.rent !== undefined && (
                    <div className="w-full rounded-2xl border bg-primary/5 px-5 py-4 text-center lg:w-auto lg:min-w-[220px] lg:px-6 lg:py-5">
                        <p className="text-sm text-muted-foreground">
                            Monthly Rent
                        </p>

                        <p className="mt-2 text-3xl font-bold text-primary sm:text-4xl">
                            ₹{property.rent.toLocaleString()}
                        </p>
                    </div>
                )}
            </div>

            {/* Features */}

            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
                {property.bhk && (
                    <div className="flex items-center gap-2 rounded-xl border bg-muted/40 px-4 py-2.5 sm:px-5 sm:py-3">
                        <BedDouble className="h-4 w-4 text-primary sm:h-5 sm:w-5" />

                        <span className="text-sm font-medium sm:text-base">
                            {property.bhk} BHK
                        </span>
                    </div>
                )}

                <div className="flex items-center gap-2 rounded-xl border bg-muted/40 px-4 py-2.5 sm:px-5 sm:py-3">
                    {property.type === "flat" ? (
                        <Building2 className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                    ) : property.type === "villa" ? (
                        <Landmark className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                    ) : (
                        <Home className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                    )}

                    <span className="text-sm font-medium capitalize sm:text-base">
                        {property.type}
                    </span>
                </div>

                {property.allowRoomBooking && (
                    <Badge
                        variant="outline"
                        className="rounded-xl px-4 py-2 text-xs sm:px-5 sm:py-3 sm:text-sm"
                    >
                        Room-wise Booking Available
                    </Badge>
                )}
            </div>
        </section>
    );
}