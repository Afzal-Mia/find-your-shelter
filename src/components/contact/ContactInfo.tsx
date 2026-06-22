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
        <section className="py-14 sm:py-16 lg:py-24">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary sm:text-sm">
                        Contact Information
                    </span>

                    <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                        We're Always Happy to Help
                    </h2>

                    <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                        Choose the contact method that's most convenient for
                        you. Whether you call or email, we'll respond as soon
                        as possible.
                    </p>
                </motion.div>

                {/* Contact Cards */}
                <div className="mt-10 grid gap-6 sm:mt-14 lg:grid-cols-2 lg:gap-8">
                    {/* Phone */}
                    <motion.a
                        href={`tel:${phone.replace(/\s+/g, "")}`}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        whileHover={{
                            y: -8,
                            scale: 1.02,
                        }}
                        className="group rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl sm:rounded-3xl sm:p-8"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:h-16 sm:w-16">
                                <PhoneCall className="h-7 w-7 sm:h-8 sm:w-8" />
                            </div>

                            <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </div>

                        <h3 className="mt-6 text-xl font-semibold sm:mt-8 sm:text-2xl">
                            Call Us
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                            Speak directly with our team for quick assistance
                            regarding available properties and bookings.
                        </p>

                        <div className="mt-6 text-lg font-bold text-primary sm:mt-8 sm:text-2xl">
                            {phone}
                        </div>
                    </motion.a>

                    {/* Email */}
                    <motion.a
                        href={`mailto:${email}`}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        whileHover={{
                            y: -8,
                            scale: 1.02,
                        }}
                        className="group rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl sm:rounded-3xl sm:p-8"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:h-16 sm:w-16">
                                <Mail className="h-7 w-7 sm:h-8 sm:w-8" />
                            </div>

                            <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </div>

                        <h3 className="mt-6 text-xl font-semibold sm:mt-8 sm:text-2xl">
                            Email Us
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                            Send us your questions anytime and we'll get back
                            to you with the information you need.
                        </p>

                        <div className="mt-6 break-all text-lg font-bold text-primary sm:mt-8 sm:text-2xl">
                            {email}
                        </div>
                    </motion.a>
                </div>
            </div>
        </section>
    );
}