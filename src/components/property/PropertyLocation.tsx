import Link from "next/link";
import { Property } from "@/types/property";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";

interface Props {
    property: Property;
}

export default function PropertyLocation({
    property,
}: Props) {
    if (!property.coordinates) return null;

    const { latitude, longitude } = property.coordinates;

    const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

    return (
        <Card className="rounded-3xl shadow-sm">
            <CardContent className="space-y-6 p-6">
                <div>
                    <h2 className="text-xl font-semibold">
                        Property Location
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        View the property's location on Google Maps.
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl border">
                    <iframe
                        title="Property Location"
                        src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
                        className="h-[350px] w-full border-0"
                        loading="lazy"
                    />
                </div>

                <div className="flex flex-col gap-4 rounded-2xl border bg-muted/30 p-5 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary" />

                        <div>
                            <p className="font-medium">
                                Coordinates
                            </p>

                            <p className="text-sm text-muted-foreground">
                                {latitude}, {longitude}
                            </p>
                        </div>
                    </div>

                    <Button asChild>
                        <Link
                            href={mapUrl}
                            target="_blank"
                        >
                            <Navigation className="mr-2 h-4 w-4" />
                            Open in Google Maps
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}