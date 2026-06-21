import {
    BedDouble,
    Building2,
    Home,
    Landmark,
    IndianRupee,
    MapPin,
    CheckCircle2,
} from "lucide-react";

import { Property } from "@/types/property";

import { Card, CardContent } from "@/components/ui/card";

interface Props {
    property: Property;
}

export default function PropertyInformation({
    property,
}: Props) {
    return (
        <Card className="rounded-3xl shadow-sm">
            <CardContent className="p-8">

                <div className="mb-8">
                    <h2 className="text-2xl font-bold">
                        Property Information
                    </h2>

                    <p className="mt-2 text-muted-foreground">
                        Complete information about this property.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                    {/* Property Type */}
                    <InfoCard
                        icon={
                            property.type === "flat" ? (
                                <Building2 className="h-6 w-6 text-primary" />
                            ) : property.type === "villa" ? (
                                <Landmark className="h-6 w-6 text-primary" />
                            ) : (
                                <Home className="h-6 w-6 text-primary" />
                            )
                        }
                        label="Property Type"
                        value={property.type}
                    />

                    {/* BHK */}
                    {property.bhk !== undefined && (
                        <InfoCard
                            icon={
                                <BedDouble className="h-6 w-6 text-primary" />
                            }
                            label="Configuration"
                            value={`${property.bhk} BHK`}
                        />
                    )}

                    {/* Rent */}
                    {property.rent !== undefined && (
                        <InfoCard
                            icon={
                                <IndianRupee className="h-6 w-6 text-primary" />
                            }
                            label="Monthly Rent"
                            value={`₹${property.rent.toLocaleString()}`}
                        />
                    )}

                    {/* Booking */}
                    <InfoCard
                        icon={
                            <CheckCircle2 className="h-6 w-6 text-primary" />
                        }
                        label="Room Booking"
                        value={
                            property.allowRoomBooking
                                ? "Available"
                                : "Not Available"
                        }
                    />

                    {/* Status */}
                    {property.status && (
                        <InfoCard
                            icon={
                                <CheckCircle2 className="h-6 w-6 text-primary" />
                            }
                            label="Status"
                            value={property.status
                                .replaceAll("_", " ")
                                .replace(/\b\w/g, (l) => l.toUpperCase())}
                        />
                    )}

                    {/* Coordinates */}
                    {property.coordinates && (
                        <InfoCard
                            icon={<MapPin className="h-6 w-6 text-primary" />}
                            label="Coordinates"
                            value={`${property.coordinates.latitude.toFixed(
                                4
                            )}, ${property.coordinates.longitude.toFixed(4)}`}
                        />
                    )}

                </div>

            </CardContent>
        </Card>
    );
}

interface InfoCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

function InfoCard({
    icon,
    label,
    value,
}: InfoCardProps) {
    return (
        <div className="rounded-2xl border bg-muted/30 p-5 transition-all duration-300 hover:border-primary/20 hover:bg-primary/5">

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                {icon}
            </div>

            <p className="text-sm text-muted-foreground">
                {label}
            </p>

            <h3 className="mt-2 text-lg font-semibold capitalize">
                {value}
            </h3>

        </div>
    );
}