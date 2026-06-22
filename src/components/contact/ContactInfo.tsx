"use client";

import { motion } from "framer-motion";
import { PhoneCall, Mail, ArrowUpRight } from "lucide-react";

interface ContactInfoProps {
    phone?: string;
    email?: string;
}

export default function ContactInfo({
    phone = "+91 98765 43210",
    email = "support@findyourshelter.com",
}: ContactInfoProps) {
    return (
        <section className="py-20">
            <div className="container mx-auto max-w-7xl px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                        Contact Information
                    </span>

                    <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
                        We're Always Happy to Help
                    </h2>

                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        Choose the contact method that's most convenient for
                        you. Whether you call or email, we'll respond as soon
                        as possible.
                    </p>
                </div>

                <div className="mt-14 grid gap-8 md:grid-cols-2">

                    {/* Phone */}

                    <motion.a
                        href={`tel:${phone.replace(/\s+/g, "")}`}
                        whileHover={{
                            y: -8,
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                        className="group rounded-3xl border bg-card p-8 shadow-sm transition-all hover:border-primary/30 hover:shadow-xl"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <PhoneCall className="h-8 w-8" />
                            </div>

                            <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </div>

                        <h3 className="mt-8 text-2xl font-semibold">
                            Call Us
                        </h3>

                        <p className="mt-3 leading-7 text-muted-foreground">
                            Speak directly with our team for quick assistance
                            regarding available properties and bookings.
                        </p>

                        <div className="mt-8 text-xl font-bold text-primary">
                            {phone}
                        </div>
                    </motion.a>

                    {/* Email */}

                    <motion.a
                        href={`mailto:${email}`}
                        whileHover={{
                            y: -8,
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                        className="group rounded-3xl border bg-card p-8 shadow-sm transition-all hover:border-primary/30 hover:shadow-xl"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <Mail className="h-8 w-8" />
                            </div>

                            <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </div>

                        <h3 className="mt-8 text-2xl font-semibold">
                            Email Us
                        </h3>

                        <p className="mt-3 leading-7 text-muted-foreground">
                            Send us your questions anytime and we'll get back
                            to you with the information you need.
                        </p>

                        <div className="mt-8 break-all text-xl font-bold text-primary">
                            {email}
                        </div>
                    </motion.a>

                </div>
            </div>
        </section>
    );
}