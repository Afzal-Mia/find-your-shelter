import { Property } from "@/types/property";
import PropertyCard from "./PropertyCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PropertyGridProps {
    properties: Property[];
}

export default function PropertyGrid({
    properties,
}: PropertyGridProps) {
    return (
        <div className="space-y-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
                {properties.map((property) => (
                    <PropertyCard
                        key={property._id}
                        property={property}
                    />
                ))}
            </div>

            <div className="flex justify-center">
                <Button asChild size="lg" className="rounded-full px-8">
                    <Link href="/properties">
                        Explore More Properties
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}