"use client";

import {
    BadgeCheck,
    BedDouble,
    Building2,
    Home,
    Landmark,
    IndianRupee,
    ArrowDown,
} from "lucide-react";

import { Property } from "@/types/property";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    const statusText =
        property.status
            ?.split("_")
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() +
                    word.slice(1)
            )
            .join(" ");

    const bookingPercent =
        property.allowRoomBooking &&
            property.totalRooms &&
            property.totalRooms > 0
            ? Math.min(
                ((property.totalBookedRooms ?? 0) /
                    property.totalRooms) *
                100,
                100
            )
            : 0;

    return (
        <aside className="sticky top-24 rounded-3xl border bg-card p-6 shadow-lg">

            {/* Title */}

            <h1 className="text-3xl font-bold leading-tight">
                {property.title}
            </h1>

            {/* Status */}

            {property.status && (
                <Badge
                    className="mt-4"
                    variant={statusVariant[property.status]}
                >
                    <BadgeCheck className="mr-1 h-4 w-4" />
                    {statusText}
                </Badge>
            )}

            {/* Rent */}

            {property.rent !== undefined && (
                <div className="mt-8 rounded-2xl border bg-primary/5 p-5">

                    <p className="text-sm text-muted-foreground">
                        Monthly Rent
                    </p>

                    <div className="mt-2 flex items-center">

                        <IndianRupee className="mr-1 h-7 w-7 text-primary" />

                        <span className="text-4xl font-bold text-primary">
                            {property.rent.toLocaleString()}
                        </span>

                    </div>
                </div>
            )}

            {/* Quick Info */}

            <div className="mt-8 space-y-4">

                <div className="flex items-center gap-3">

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

                {property.bhk !== undefined && (
                    <div className="flex items-center gap-3">

                        <BedDouble className="h-5 w-5 text-primary" />

                        <span className="font-medium">
                            {property.bhk} BHK
                        </span>

                    </div>
                )}

            </div>

            {/* Booking */}

            {property.allowRoomBooking && (
                <div className="mt-8 rounded-2xl border bg-muted/30 p-5">

                    <div className="mb-3 flex items-center justify-between">

                        <span className="font-medium">
                            Room Booking
                        </span>

                        <span className="text-sm text-muted-foreground">
                            {property.totalBookedRooms ?? 0} /{" "}
                            {property.totalRooms ?? 0}
                        </span>

                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-muted">

                        <div
                            className="h-full rounded-full bg-primary transition-all duration-700"
                            style={{
                                width: `${bookingPercent}%`,
                            }}
                        />

                    </div>

                </div>
            )}

            {/* CTA */}

            <Button
                className="mt-8 w-full rounded-xl"
                size="lg"
                onClick={() =>
                    document
                        .getElementById("inquiry-form")
                        ?.scrollIntoView({
                            behavior: "smooth",
                        })
                }
            >
                Submit Inquiry

                <ArrowDown className="ml-2 h-4 w-4" />
            </Button>

        </aside>
    );
}