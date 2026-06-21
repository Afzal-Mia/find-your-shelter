import { Property } from "@/types/property";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BedDouble, CheckCircle2 } from "lucide-react";

interface Props {
    property: Property;
}

export default function PropertyBookingProgress({
    property,
}: Props) {
    const booked = property.totalBookedRooms ?? 0;
    const total = property.totalRooms ?? 0;

    const percentage =
        total === 0 ? 0 : Math.min((booked / total) * 100, 100);

    const full = booked >= total;

    return (
        <Card className="rounded-3xl shadow-sm">
            <CardContent className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold">
                            Room Booking Progress
                        </h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Current room availability for this property.
                        </p>
                    </div>

                    <Badge variant={full ? "destructive" : "default"}>
                        {full ? "Fully Booked" : "Available"}
                    </Badge>
                </div>

                <div className="rounded-2xl border bg-muted/30 p-5">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <BedDouble className="h-5 w-5 text-primary" />

                            <span className="font-medium">
                                Rooms Booked
                            </span>
                        </div>

                        <span className="text-lg font-semibold">
                            {booked} / {total}
                        </span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-muted">
                        <div
                            className={`h-full transition-all duration-500 ${full ? "bg-destructive" : "bg-primary"
                                }`}
                            style={{
                                width: `${percentage}%`,
                            }}
                        />
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-4 text-center">
                        <div className="rounded-xl bg-background p-4">
                            <p className="text-2xl font-bold">
                                {total}
                            </p>

                            <p className="text-sm text-muted-foreground">
                                Total Rooms
                            </p>
                        </div>

                        <div className="rounded-xl bg-background p-4">
                            <p className="text-2xl font-bold text-primary">
                                {booked}
                            </p>

                            <p className="text-sm text-muted-foreground">
                                Booked
                            </p>
                        </div>

                        <div className="rounded-xl bg-background p-4">
                            <p className="text-2xl font-bold text-green-600">
                                {Math.max(total - booked, 0)}
                            </p>

                            <p className="text-sm text-muted-foreground">
                                Available
                            </p>
                        </div>
                    </div>

                    {!full && (
                        <div className="mt-5 flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 p-3 text-sm text-primary">
                            <CheckCircle2 className="h-4 w-4" />

                            Rooms are currently available for booking.
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}