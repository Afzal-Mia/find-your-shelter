import { BedDouble, CheckCircle2, XCircle } from "lucide-react";

import { Property } from "@/types/property";

import { Card, CardContent } from "@/components/ui/card";

interface Props {
    property: Property;
}

export default function PropertyBookingProgress({
    property,
}: Props) {
    const booked = property.totalBookedRooms ?? 0;
    const total = property.totalRooms ?? 0;

    const available = Math.max(total - booked, 0);

    const percentage =
        total === 0
            ? 0
            : Math.min((booked / total) * 100, 100);

    const isFullyBooked =
        property.status === "fully_booked";

    return (
        <Card className="overflow-hidden rounded-3xl border-0 shadow-sm">

            <CardContent className="p-8">

                {/* Heading */}

                <div className="mb-8">

                    <h2 className="text-2xl font-bold">
                        Room-wise Booking
                    </h2>

                    <p className="mt-2 text-muted-foreground">
                        Current booking status of all rooms in this property.
                    </p>

                </div>

                {/* Booking Card */}

                <div
                    className={`rounded-3xl border p-6 transition-colors ${isFullyBooked
                        ? "border-destructive/10 bg-destructive/5"
                        : "border-primary/10 bg-primary/5"
                        }`}
                >
                    {/* Top */}

                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                        <div className="flex items-center gap-3">

                            <div
                                className={`rounded-xl p-3 ${isFullyBooked
                                    ? "bg-destructive/10"
                                    : "bg-primary/10"
                                    }`}
                            >
                                <BedDouble
                                    className={`h-6 w-6 ${isFullyBooked
                                        ? "text-destructive"
                                        : "text-primary"
                                        }`}
                                />
                            </div>

                            <div>

                                <h3 className="text-lg font-semibold">
                                    Room Booking Status
                                </h3>

                                <p className="text-sm text-muted-foreground">
                                    Live occupancy information
                                </p>

                            </div>

                        </div>

                        <div
                            className={`rounded-full px-4 py-2 text-sm font-semibold ${isFullyBooked
                                ? "bg-destructive/10 text-destructive"
                                : "bg-primary/10 text-primary"
                                }`}
                        >
                            {Math.round(percentage)}% Occupied
                        </div>

                    </div>

                    {/* Progress */}

                    <div className="mt-8">

                        <div
                            className={`h-4 overflow-hidden rounded-full ${isFullyBooked
                                ? "bg-destructive/10"
                                : "bg-primary/10"
                                }`}
                        >
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${isFullyBooked
                                    ? "bg-destructive"
                                    : "bg-primary"
                                    }`}
                                style={{
                                    width: `${percentage}%`,
                                }}
                            />
                        </div>

                    </div>

                    {/* Stats */}

                    <div className="mt-8 grid gap-4 md:grid-cols-3">

                        <div className="rounded-2xl border bg-background p-5">

                            <p className="text-sm text-muted-foreground">
                                Total Rooms
                            </p>

                            <p className="mt-2 text-3xl font-bold">
                                {total}
                            </p>

                        </div>

                        <div className="rounded-2xl border bg-background p-5">

                            <p className="text-sm text-muted-foreground">
                                Rooms Booked
                            </p>

                            <p
                                className={`mt-2 text-3xl font-bold ${isFullyBooked
                                    ? "text-destructive"
                                    : "text-primary"
                                    }`}
                            >
                                {booked}
                            </p>

                        </div>

                        <div className="rounded-2xl border bg-background p-5">

                            <p className="text-sm text-muted-foreground">
                                Rooms Available
                            </p>

                            <p className="mt-2 text-3xl font-bold text-green-600">
                                {available}
                            </p>

                        </div>

                    </div>

                    {/* Bottom Message */}

                    <div
                        className={`mt-8 flex items-center gap-3 rounded-2xl border p-4 ${isFullyBooked
                            ? "border-destructive/10 bg-destructive/5 text-destructive"
                            : "border-primary/10 bg-primary/5 text-primary"
                            }`}
                    >
                        {isFullyBooked ? (
                            <XCircle className="h-5 w-5 shrink-0" />
                        ) : (
                            <CheckCircle2 className="h-5 w-5 shrink-0" />
                        )}

                        <span className="font-medium">
                            {isFullyBooked
                                ? "All rooms are currently booked."
                                : `${available} room${available === 1 ? "" : "s"
                                } available for booking.`}
                        </span>

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}