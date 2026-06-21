"use client";

import {
    Building2,
    Home,
    Landmark,
    BedDouble,
    IndianRupee,
    BadgeCheck,
    DoorOpen,
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
    const items = [];

    // Property Type
    items.push({
        title: "Property Type",
        value:
            property.type.charAt(0).toUpperCase() +
            property.type.slice(1),
        icon:
            property.type === "flat" ? (
                <Building2 className="h-6 w-6 text-sky-600" />
            ) : property.type === "villa" ? (
                <Landmark className="h-6 w-6 text-amber-600" />
            ) : (
                <Home className="h-6 w-6 text-emerald-600" />
            ),
    });

    // BHK
    if (property.bhk !== undefined) {
        items.push({
            title: "Configuration",
            value: `${property.bhk} BHK`,
            icon: (
                <BedDouble className="h-6 w-6 text-violet-600" />
            ),
        });
    }

    // Rent
    if (property.rent !== undefined) {
        items.push({
            title: "Monthly Rent",
            value: `₹${property.rent.toLocaleString()}`,
            icon: (
                <IndianRupee className="h-6 w-6 text-green-600" />
            ),
        });
    }

    // Status
    if (property.status) {
        items.push({
            title: "Availability",
            value: property.status
                .split("_")
                .map(
                    (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1)
                )
                .join(" "),
            icon: (
                <BadgeCheck className="h-6 w-6 text-blue-600" />
            ),
        });
    }

    // Room Booking
    if (property.allowRoomBooking) {
        items.push({
            title: "Booking Type",
            value: "Room-wise Booking",
            icon: (
                <DoorOpen className="h-6 w-6 text-orange-600" />
            ),
        });

        if (property.totalRooms !== undefined) {
            items.push({
                title: "Total Rooms",
                value: property.totalRooms.toString(),
                icon: (
                    <DoorOpen className="h-6 w-6 text-rose-600" />
                ),
            });
        }

        if (property.totalBookedRooms !== undefined) {
            items.push({
                title: "Booked Rooms",
                value: property.totalBookedRooms.toString(),
                icon: (
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                ),
            });
        }
    }

    return (
        <section className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold">
                    Property Information
                </h2>

                <p className="mt-2 text-muted-foreground">
                    Quick overview of this property.
                </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((item) => (
                    <Card
                        key={item.title}
                        className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                        <CardContent className="flex items-center gap-4 p-5">
                            <div className="rounded-xl bg-muted p-3">
                                {item.icon}
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    {item.title}
                                </p>

                                <h3 className="mt-1 font-semibold">
                                    {item.value}
                                </h3>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}