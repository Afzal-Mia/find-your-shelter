"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

import {
    Loader2,
    Send,
    CheckCircle2,
    Phone,
    ShieldCheck,
    Clock3,
} from "lucide-react";

import { InquiryFormData } from "@/types/inquiry";
import { useInquiry } from "@/hooks/useInquiry";

import InquirySuccess from "./InquirySuccess";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { inquiryCreateSchema } from "@/app/api/inquiry/inquiry.validation";

interface Props {
    propertyId?: string;
}

export default function InquiryForm({
    propertyId,
}: Props) {
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
            message: "Hello, I'm interested in knowing more about your rental properties. Please contact me at your earliest convenience.",
            propertyId,
        },
    });

    function onSubmit(values: InquiryFormData) {
        mutation.mutate(values, {
            onSuccess: (data) => {
                toast.success(data.message);

                setSubmitted(true);

                reset({
                    name: "",
                    email: "",
                    phone: "",
                    message: "Hello, I'm interested in knowing more about your rental properties. Please contact me at your earliest convenience.",
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
    }

    if (submitted) {
        return <InquirySuccess propertyId={propertyId} />;
    }

    return (
        <section className="overflow-hidden rounded-3xl border bg-card shadow-sm">

            <div className="grid lg:grid-cols-2">

                {/* LEFT */}

                <div className="bg-primary/5 p-10">

                    <div className="max-w-md">

                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                            <Phone className="h-7 w-7 text-primary" />
                        </div>

                        <h2 className="text-3xl font-bold">
                            Interested in this property?
                        </h2>

                        <p className="mt-4 leading-7 text-muted-foreground">
                            Fill in your details and our team will
                            contact you shortly to answer your
                            questions or schedule a property visit.
                        </p>

                        <div className="mt-10 space-y-5">

                            <Feature
                                icon={<Clock3 className="h-5 w-5" />}
                                title="Quick Response"
                                description="We usually respond within 24 hours."
                            />

                            <Feature
                                icon={<ShieldCheck className="h-5 w-5" />}
                                title="Trusted Assistance"
                                description="Our team will guide you through every step."
                            />

                            <Feature
                                icon={<CheckCircle2 className="h-5 w-5" />}
                                title="Schedule a Visit"
                                description="Book a property visit at your convenience."
                            />

                        </div>

                    </div>

                </div>

                {/* RIGHT */}

                <div className="p-10">

                    <h3 className="text-2xl font-semibold">
                        Send Inquiry
                    </h3>

                    <p className="mt-2 text-muted-foreground">
                        Complete the form below.
                    </p>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-8 space-y-6"
                    >

                        <div className="space-y-2">

                            <Label htmlFor="name">
                                Full Name
                            </Label>

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

                                <Label htmlFor="email">
                                    Email
                                </Label>

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

                                <Label htmlFor="phone">
                                    Phone Number
                                </Label>

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
                            <Label htmlFor="message">
                                Message
                            </Label>

                            <Textarea
                                id="message"
                                rows={6}
                                placeholder="Write your message..."
                                {...register("message")}
                                className="resize-none"
                            />

                            <p className="text-xs text-muted-foreground">
                                You can keep the default message or edit it before submitting.
                            </p>

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
                                    Send Inquiry
                                </>
                            )}
                        </Button>

                    </form>

                </div>

            </div>

        </section>
    );
}

interface FeatureProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

function Feature({
    icon,
    title,
    description,
}: FeatureProps) {
    return (
        <div className="flex gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {icon}
            </div>

            <div>

                <h4 className="font-semibold">
                    {title}
                </h4>

                <p className="mt-1 text-sm text-muted-foreground">
                    {description}
                </p>

            </div>

        </div>
    );
}