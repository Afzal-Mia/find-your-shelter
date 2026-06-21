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
        <section className="mt-8 rounded-3xl border bg-card p-8 shadow-sm">

            {/* Top */}
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                <div className="space-y-4">

                    <div className="flex flex-wrap items-center gap-3">

                        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                            {property.title}
                        </h1>

                        {property.status && (
                            <Badge variant={statusVariant[property.status]}>
                                {statusText}
                            </Badge>
                        )}

                    </div>

                    {property.description && (
                        <p className="max-w-3xl text-muted-foreground leading-7">
                            {property.description}
                        </p>
                    )}

                </div>

                {property.rent !== undefined && (
                    <div className="rounded-2xl border bg-primary/5 px-6 py-5 text-center">

                        <p className="text-sm text-muted-foreground">
                            Monthly Rent
                        </p>

                        <p className="mt-1 text-4xl font-bold text-primary">
                            ₹{property.rent.toLocaleString()}
                        </p>

                    </div>
                )}

            </div>

            {/* Features */}

            <div className="mt-8 flex flex-wrap gap-4">

                {property.bhk && (
                    <div className="flex items-center gap-2 rounded-xl border bg-muted/40 px-5 py-3">

                        <BedDouble className="h-5 w-5 text-primary" />

                        <span className="font-medium">
                            {property.bhk} BHK
                        </span>

                    </div>
                )}

                <div className="flex items-center gap-2 rounded-xl border bg-muted/40 px-5 py-3">

                    {property.type === "flat" ? (
                        <Building2 className="h-5 w-5 text-primary" />
                    ) : property.type === "villa" ? (
                        <Landmark className="h-5 w-5 text-primary" />
                    ) : (
                        <Home className="h-5 w-5 text-primary" />
                    )}

                    <span className="capitalize font-medium">
                        {property.type}
                    </span>

                </div>

                {property.allowRoomBooking && (
                    <Badge
                        variant="outline"
                        className="rounded-xl px-5 py-3 text-sm"
                    >
                        Room-wise Booking Available
                    </Badge>
                )}

            </div>

        </section>
    );
}