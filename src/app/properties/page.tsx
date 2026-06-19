"use client";

import { useProperties } from "@/hooks/useProperties";
import { useReviews } from "@/hooks/useReviews";

export default function PropertiesPage() {
    const { data: reviewsData, isLoading: reviewsLoading, error: reviewsError } = useReviews({
        page: 1,
        limit: 10,
    });

    const { data, isLoading, error } = useProperties({
        page: 1,
        limit: 10,
    });
    if (reviewsError) {
        return <div>Something went wrong.</div>;
    }
    if (reviewsLoading) {
        return <div>Loading reviews...</div>;
    }

    if (isLoading) {
        return <div>Loading properties...</div>;
    }

    if (error) {
        return <div>Something went wrong.</div>;
    }

    return (
        <>
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
            <p>***********************************************</p>
            <div>
                {reviewsData?.data.map((review) => (
                    <div
                        key={review._id}
                        className="border rounded-lg p-4"
                    >
                        <h2>{review.name}</h2>
                        <p>{review.rating}</p>
                        <p>{review.comment}</p>

                    </div>
                ))}
            </div>

        </>

    );
}