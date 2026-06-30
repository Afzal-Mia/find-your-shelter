// src/components/property/PropertyCard.tsx

import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    BedDouble,
    Home,
    Building2,
    Landmark,
} from "lucide-react";

import { Property } from "@/types/property";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";

interface PropertyCardProps {
    property: Property;
}

const statusVariant = {
    available: "default",
    partially_booked: "secondary",
    fully_booked: "destructive",
} as const;

export default function PropertyCard({
    property,
}: PropertyCardProps) {
    const image =
        property.propertyImages?.[0]?.url ??
        "/images/no-image.png";

    const statusText =
        property.status
            ?.split("_")
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() +
                    word.slice(1)
            )
            .join(" ");

    return (
        <Link
            href={`/properties/${property._id}`}
            className="block h-full"
        >
            <Card className="group flex h-full flex-col p-0 gap-0 overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                {/* Image */}
                <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                        src={image}
                        alt={property.title}
                        fill

                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />



                    {/* Status */}
                    {property.status && (
                        <div className="absolute right-4 top-4">
                            <Badge
                                variant={
                                    statusVariant[property.status]
                                }
                            >
                                {statusText}
                            </Badge>
                        </div>
                    )}
                </div>

                <CardContent className="flex flex-1 flex-col p-4">
                    <div className="space-y-3">
                        {/* Title */}
                        <h3 className="line-clamp-1 text-lg font-semibold">
                            {property.title}
                        </h3>

                        {/* Description */}
                        {property.description && (
                            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                                {property.description}
                            </p>
                        )}
                    </div>

                    <div className="mt-auto space-y-3 pt-3">
                        {/* Room Booking Progress */}
                        {property.allowRoomBooking && (
                            <div className={`flex flex-col gap-2 rounded-xl border p-2.5 ${property.status === 'fully_booked' ? 'border-destructive/10 bg-destructive/5' : 'border-primary/10 bg-primary/5'}`}>
                                <div className="flex items-center justify-between">
                                    <span className={`flex items-center gap-1.5 text-sm font-medium ${property.status === 'fully_booked' ? 'text-destructive' : 'text-primary'}`}>
                                        <BedDouble className="h-4 w-4" />
                                        Room-wise Booking
                                    </span>
                                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${property.status === 'fully_booked' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                                        {property.totalBookedRooms ?? 0} / {property.totalRooms ?? 0} Booked
                                    </span>
                                </div>
                                <div className={`h-1.5 w-full overflow-hidden rounded-full ${property.status === 'fully_booked' ? 'bg-destructive/10' : 'bg-primary/10'}`}>
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${property.status === 'fully_booked' ? 'bg-destructive' : 'bg-primary'}`}
                                        style={{
                                            width: `${Math.min(
                                                ((property.totalBookedRooms ?? 0) /
                                                    Math.max(property.totalRooms ?? 1, 1)) *
                                                100,
                                                100
                                            )}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                        {/* Property Info */}
                        <div className="grid grid-cols-2 gap-3 rounded-xl bg-muted/40 p-2.5">
                            {property.bhk && (
                                <div className="flex items-center gap-2">
                                    <BedDouble className="h-4 w-4 text-primary" />

                                    <span className="text-sm font-medium">
                                        {property.bhk} BHK
                                    </span>
                                </div>
                            )}

                            <div className="flex items-center gap-2">
                                {property.type === 'flat' ? (
                                    <Building2 className="h-4 w-4 text-primary" />
                                ) : property.type === 'villa' ? (
                                    <Landmark className="h-4 w-4 text-primary" />
                                ) : (
                                    <Home className="h-4 w-4 text-primary" />
                                )}

                                <span className="text-sm font-medium capitalize">
                                    {property.type}
                                </span>
                            </div>
                        </div>

                        {/* Rent */}
                        {property.rent !== undefined && (
                            <p className="text-2xl font-bold text-primary">
                                ₹{property.rent.toLocaleString()}

                                <span className="ml-1 text-xs font-normal text-muted-foreground">
                                    / month
                                </span>
                            </p>
                        )}


                    </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                    <Button
                        className="h-9 w-full text-sm"
                        tabIndex={-1}
                    >
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}