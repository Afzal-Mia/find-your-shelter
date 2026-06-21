"use client";

import { useParams } from "next/navigation";

import PropertyGallery from "@/components/property/PropertyGallery";
import PropertySummary from "@/components/property/PropertySummary";
import PropertyDescription from "@/components/property/PropertyDescription";
import PropertyInformation from "@/components/property/PropertyInformation";
import PropertyLocation from "@/components/property/PropertyLocation";
import PropertyBookingProgress from "@/components/property/PropertyBookingProgress";
import PropertyDetailSkeleton from "@/components/property/PropertyDetailSkeleton";
import InquiryForm from "@/components/inquiry/InquiryForm";

import EmptyState from "@/components/common/EmptyState";
import ErrorState from "@/components/common/ErrorState";

import { useProperty } from "@/hooks/useProperty";

import { SearchX } from "lucide-react";

export default function PropertyDetailsPage() {
    const params = useParams();

    const id = params.id as string;

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useProperty(id);

    if (isLoading) {
        return <PropertyDetailSkeleton />;
    }

    if (isError) {
        return (
            <main className="container mx-auto max-w-7xl px-6 py-20">
                <ErrorState
                    title="Failed to Load Property"
                    description="We couldn't load the property details. Please check your internet connection and try again."
                    onRetry={refetch}
                />
            </main>
        );
    }

    if (!data?.property) {
        return (
            <main className="container mx-auto max-w-7xl px-6 py-20">
                <EmptyState
                    icon={SearchX}
                    title="Property Not Found"
                    description="The property you're looking for doesn't exist or may have been removed."
                />
            </main>
        );
    }

    const property = data.property;

    return (
        <main className="py-16">
            <div className="container mx-auto max-w-7xl px-6">
                {/* Top Section */}
                <div className="grid gap-10 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <PropertyGallery property={property} />
                    </div>

                    {/* <div>
                        <PropertySummary property={property} />
                    </div> */}
                </div>

                <div className="mt-14">
                    <PropertyDescription property={property} />
                </div>

                <div className="mt-10">
                    <PropertyInformation property={property} />
                </div>

                {property.allowRoomBooking && (
                    <div className="mt-10">
                        <PropertyBookingProgress property={property} />
                    </div>
                )}

                {property.coordinates && (
                    <div className="mt-10">
                        <PropertyLocation property={property} />
                    </div>
                )}

                <div className="mt-14">
                    <InquiryForm propertyId={property._id} />
                </div>
            </div>
        </main>
    );
}