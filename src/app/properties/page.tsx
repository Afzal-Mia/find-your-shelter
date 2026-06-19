"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { useProperties } from "@/hooks/useProperties";
import { useReviews } from "@/hooks/useReviews";
import { useInquiry } from "@/hooks/useInquiry";

export default function PropertiesPage() {
    const { data, isLoading, error } = useProperties({
        page: 1,
        limit: 10,
    });

    const {
        data: reviewsData,
        isLoading: reviewsLoading,
        error: reviewsError,
    } = useReviews({
        page: 1,
        limit: 10,
    });

    const inquiryMutation = useInquiry();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    if (isLoading || reviewsLoading) {
        return (
            <div className="flex h-screen items-center justify-center text-xl">
                Loading...
            </div>
        );
    }

    if (error || reviewsError) {
        return (
            <div className="flex h-screen items-center justify-center text-red-500">
                Something went wrong.
            </div>
        );
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        inquiryMutation.mutate(
            {
                propertyId: data?.data[0]?._id,
                name,
                email,
                phone,
                message,
            },
            {
                onSuccess: (response) => {
                    toast.success(response.message);

                    setName("");
                    setEmail("");
                    setPhone("");
                    setMessage("");
                },
                onError: () => {
                    toast.error("Failed to submit inquiry");
                },
            }
        );
    };

    return (
        <div className="min-h-screen bg-slate-100 py-10">
            <div className="mx-auto max-w-6xl space-y-10">

                {/* Properties */}

                <section className="rounded-xl bg-white p-6 shadow">
                    <h1 className="mb-6 text-3xl font-bold">
                        Properties
                    </h1>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {data?.data.map((property) => (
                            <div
                                key={property._id}
                                className="rounded-lg border p-5"
                            >
                                <h2 className="text-xl font-semibold">
                                    {property.title}
                                </h2>

                                <p className="mt-2">
                                    ₹ {property.rent}
                                </p>

                                <p className="capitalize text-gray-500">
                                    {property.type}
                                </p>

                                <p className="mt-2 rounded bg-green-100 px-2 py-1 inline-block text-sm">
                                    {property.status}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Reviews */}

                <section className="rounded-xl bg-white p-6 shadow">
                    <h2 className="mb-6 text-3xl font-bold">
                        Reviews
                    </h2>

                    <div className="grid gap-4 md:grid-cols-2">
                        {reviewsData?.data.map((review) => (
                            <div
                                key={review._id}
                                className="rounded-lg border p-5"
                            >
                                <h3 className="font-semibold">
                                    {review.name}
                                </h3>

                                <p className="mt-2 text-yellow-500">
                                    ⭐ {review.rating}/5
                                </p>

                                <p className="mt-3 text-gray-600">
                                    {review.comment}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Inquiry */}

                <section className="rounded-xl bg-white p-6 shadow">
                    <h2 className="mb-6 text-3xl font-bold">
                        Send Inquiry
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                        />

                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                        />

                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone"
                            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                        />

                        <textarea
                            rows={5}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Message"
                            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                        />

                        <button
                            type="submit"
                            disabled={inquiryMutation.isPending}
                            className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 disabled:opacity-50"
                        >
                            {inquiryMutation.isPending
                                ? "Submitting..."
                                : "Submit Inquiry"}
                        </button>
                    </form>
                </section>

            </div>
        </div>
    );
}