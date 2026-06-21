"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inquiryCreateSchema } from "@/app/api/inquiry/inquiry.validation";
import { InquiryFormData } from "@/types/inquiry";
import { useInquiry } from "@/hooks/useInquiry";
import toast from "react-hot-toast";

import InquirySuccess from "./InquirySuccess";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { Loader2, Send } from "lucide-react";

interface Props {
    propertyId: string;
}

export default function InquiryForm({ propertyId }: Props) {
    const [submitted, setSubmitted] = useState(false);

    const mutation = useInquiry();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<InquiryFormData>({
        resolver: zodResolver(inquiryCreateSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
            propertyId,
        },
    });

    const onSubmit = (values: InquiryFormData) => {
        mutation.mutate(values, {
            onSuccess: (data) => {
                toast.success(data.message);

                setSubmitted(true);

                reset({
                    name: "",
                    email: "",
                    phone: "",
                    message: "",
                    propertyId,
                });
            },

            onError: (error: any) => {
                toast.error(
                    error?.response?.data?.error ??
                    "Failed to submit inquiry."
                );
            },
        });
    };

    if (submitted) {
        return <InquirySuccess />;
    }

    return (
        <div className="rounded-3xl border bg-card p-8 shadow-sm">
            <div className="mb-8">
                <h2 className="text-2xl font-bold">
                    Interested in this property?
                </h2>

                <p className="mt-2 text-muted-foreground">
                    Fill out the form below and we'll get back to you shortly.
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>

                    <Input
                        id="name"
                        placeholder="John Doe"
                        {...register("name")}
                    />

                    {errors.name && (
                        <p className="text-sm text-destructive">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            {...register("email")}
                        />

                        {errors.email && (
                            <p className="text-sm text-destructive">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>

                        <Input
                            id="phone"
                            placeholder="+91 9876543210"
                            {...register("phone")}
                        />

                        {errors.phone && (
                            <p className="text-sm text-destructive">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>

                    <Textarea
                        id="message"
                        rows={5}
                        placeholder="I'm interested in this property. Please contact me."
                        {...register("message")}
                    />

                    {errors.message && (
                        <p className="text-sm text-destructive">
                            {errors.message.message}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending Inquiry...
                        </>
                    ) : (
                        <>
                            <Send className="mr-2 h-4 w-4" />
                            Submit Inquiry
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
}