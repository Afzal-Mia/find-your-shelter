"use client";

import { useProperties } from "@/hooks/useProperties";

export default function PropertiesPage() {
    const { data, isLoading, error } = useProperties({
        page: 1,
        limit: 10,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Something went wrong.</div>;
    }

    return (
        <div className="p-8 space-y-4">
            {data?.data.map((property) => (
                <div
                    key={property._id}
                    className="border rounded-lg p-4"
                >
                    <h2>{property.title}</h2>
                    <p>₹ {property.rent}</p>
                    <p>{property.type}</p>
                </div>
            ))}
        </div>
    );
}