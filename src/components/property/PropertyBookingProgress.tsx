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
        total === 0 ? 0 : Math.min((booked / total) * 100, 100);

    const isFullyBooked =
        property.status === "fully_booked";

    return (
        <Card className="overflow-hidden rounded-2xl border-0 shadow-sm sm:rounded-3xl">
            <CardContent className="p-4 sm:p-6 lg:p-8">
                {/* Heading */}

                <div className="mb-6 sm:mb-8">
                    <h2 className="text-xl font-bold sm:text-2xl">
                        Room-wise Booking
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                        Current booking status of all rooms in this property.
                    </p>
                </div>

                {/* Booking Card */}

                <div
                    className={`rounded-2xl border p-4 transition-colors sm:rounded-3xl sm:p-6 ${isFullyBooked
                        ? "border-destructive/10 bg-destructive/5"
                        : "border-primary/10 bg-primary/5"
                        }`}
                >
                    {/* Top */}

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                            <div
                                className={`rounded-xl p-2.5 sm:p-3 ${isFullyBooked
                                    ? "bg-destructive/10"
                                    : "bg-primary/10"
                                    }`}
                            >
                                <BedDouble
                                    className={`h-5 w-5 sm:h-6 sm:w-6 ${isFullyBooked
                                        ? "text-destructive"
                                        : "text-primary"
                                        }`}
                                />
                            </div>

                            <div>
                                <h3 className="text-base font-semibold sm:text-lg">
                                    Room Booking Status
                                </h3>

                                <p className="text-xs text-muted-foreground sm:text-sm">
                                    Live occupancy information
                                </p>
                            </div>
                        </div>

                        <div
                            className={`w-full rounded-full px-4 py-2 text-center text-sm font-semibold sm:w-auto ${isFullyBooked
                                ? "bg-destructive/10 text-destructive"
                                : "bg-primary/10 text-primary"
                                }`}
                        >
                            {Math.round(percentage)}% Occupied
                        </div>
                    </div>

                    {/* Progress */}

                    <div className="mt-6 sm:mt-8">
                        <div
                            className={`h-3 overflow-hidden rounded-full sm:h-4 ${isFullyBooked
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

                    <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-3">
                        <div className="rounded-2xl border bg-background p-4 sm:p-5">
                            <p className="text-sm text-muted-foreground">
                                Total Rooms
                            </p>

                            <p className="mt-2 text-2xl font-bold sm:text-3xl">
                                {total}
                            </p>
                        </div>

                        <div className="rounded-2xl border bg-background p-4 sm:p-5">
                            <p className="text-sm text-muted-foreground">
                                Rooms Booked
                            </p>

                            <p
                                className={`mt-2 text-2xl font-bold sm:text-3xl ${isFullyBooked
                                    ? "text-destructive"
                                    : "text-primary"
                                    }`}
                            >
                                {booked}
                            </p>
                        </div>

                        <div className="rounded-2xl border bg-background p-4 sm:p-5">
                            <p className="text-sm text-muted-foreground">
                                Rooms Available
                            </p>

                            <p className="mt-2 text-2xl font-bold text-green-600 sm:text-3xl">
                                {available}
                            </p>
                        </div>
                    </div>

                    {/* Bottom Message */}

                    <div
                        className={`mt-6 flex items-start gap-3 rounded-2xl border p-4 sm:mt-8 sm:items-center ${isFullyBooked
                            ? "border-destructive/10 bg-destructive/5 text-destructive"
                            : "border-primary/10 bg-primary/5 text-primary"
                            }`}
                    >
                        {isFullyBooked ? (
                            <XCircle className="mt-0.5 h-5 w-5 shrink-0 sm:mt-0" />
                        ) : (
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 sm:mt-0" />
                        )}

                        <span className="text-sm font-medium leading-relaxed sm:text-base">
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