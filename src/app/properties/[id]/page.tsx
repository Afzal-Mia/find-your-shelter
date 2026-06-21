"use client";

import { useParams } from "next/navigation";
import { SearchX } from "lucide-react";

import { useProperty } from "@/hooks/useProperty";
import BackButton from "@/components/common/BackButton";

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
        <main className="pb-20">

            {/* Hero Gallery */}
            <section className="container mx-auto max-w-7xl px-6 pt-10">
                <BackButton label="Back to Properties" />

                <PropertyGallery property={property} />
            </section>

            {/* Summary */}
            <section className="container mx-auto max-w-7xl px-6">
                <PropertySummary property={property} />
            </section>

            {/* Booking Progress */}
            {property.allowRoomBooking && (
                <section className="container mx-auto mt-10 max-w-7xl px-6">
                    <PropertyBookingProgress property={property} />
                </section>
            )}

            {/* Description */}
            <section className="container mx-auto mt-10 max-w-7xl px-6">
                <PropertyDescription property={property} />
            </section>

            {/* Information */}
            <section className="container mx-auto mt-10 max-w-7xl px-6">
                <PropertyInformation property={property} />
            </section>

            {/* Location */}
            {property.coordinates && (
                <section className="container mx-auto mt-10 max-w-7xl px-6">
                    <PropertyLocation property={property} />
                </section>
            )}

            {/* Inquiry */}
            <section className="container mx-auto mt-14 max-w-7xl px-6">
                <InquiryForm propertyId={property._id} />
            </section>

        </main>
    );
}