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
        <Card className="rounded-2xl shadow-sm sm:rounded-3xl">
            <CardContent className="p-4 sm:p-6 lg:p-8">
                {/* Header */}

                <div className="mb-6 sm:mb-8">
                    <h2 className="text-xl font-bold sm:text-2xl">
                        Property Information
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                        Complete information about this property.
                    </p>
                </div>

                {/* Information Grid */}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
                    {/* Property Type */}

                    <InfoCard
                        icon={
                            property.type === "flat" ? (
                                <Building2 className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                            ) : property.type === "villa" ? (
                                <Landmark className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                            ) : (
                                <Home className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                            )
                        }
                        label="Property Type"
                        value={property.type}
                    />

                    {/* Configuration */}

                    {property.bhk !== undefined && (
                        <InfoCard
                            icon={
                                <BedDouble className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                            }
                            label="Configuration"
                            value={`${property.bhk} BHK`}
                        />
                    )}

                    {/* Rent */}

                    {property.rent !== undefined && (
                        <InfoCard
                            icon={
                                <IndianRupee className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                            }
                            label="Monthly Rent"
                            value={`₹${property.rent.toLocaleString()}`}
                        />
                    )}

                    {/* Booking */}

                    <InfoCard
                        icon={
                            <CheckCircle2 className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
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
                                <CheckCircle2 className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
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
                            icon={
                                <MapPin className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                            }
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
        <div className="rounded-xl border bg-muted/30 p-4 transition-all duration-300 hover:border-primary/20 hover:bg-primary/5 sm:rounded-2xl sm:p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 sm:mb-4 sm:h-12 sm:w-12 sm:rounded-xl">
                {icon}
            </div>

            <p className="text-xs text-muted-foreground sm:text-sm">
                {label}
            </p>

            <h3 className="mt-2 break-words text-base font-semibold capitalize leading-snug sm:text-lg">
                {value}
            </h3>
        </div>
    );
}