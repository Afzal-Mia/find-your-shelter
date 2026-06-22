"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
    Building2,
    ShieldCheck,
    HeartHandshake,
    Search,
} from "lucide-react";

export default function CompanyStory() {
    const features = [
        {
            icon: Search,
            title: "Verified Listings",
            description:
                "Every property is reviewed to help you browse with confidence.",
        },
        {
            icon: ShieldCheck,
            title: "Trusted Experience",
            description:
                "We focus on transparency and reliable information for every listing.",
        },
        {
            icon: HeartHandshake,
            title: "Customer First",
            description:
                "Our goal is to make finding your next home simple and stress-free.",
        },
    ];

    return (
        <section className="py-24">
            <div className="container mx-auto max-w-7xl px-6">
                <div className="grid items-center gap-16 lg:grid-cols-2">

                    {/* Image */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -40,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.6,
                        }}
                    >
                        <div className="relative overflow-hidden rounded-3xl border shadow-xl">

                            <Image
                                src="/images/Hero.jpg"
                                alt="Modern Apartment"
                                width={900}
                                height={700}
                                className="h-[500px] w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                            <div className="absolute bottom-6 left-6 rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-xl bg-primary/10 p-3">
                                        <Building2 className="h-6 w-6 text-primary" />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">
                                            Find Your Shelter
                                        </h3>

                                        <p className="text-sm text-muted-foreground">
                                            Helping people find homes they love.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>

                    {/* Content */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: 40,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.6,
                        }}
                    >

                        <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                            Our Story
                        </span>

                        <h2 className="mt-6 text-4xl font-bold tracking-tight">
                            Making Home Search
                            <span className="block text-primary">
                                Easier for Everyone
                            </span>
                        </h2>

                        <p className="mt-6 leading-8 text-muted-foreground">
                            Finding the right home should never feel complicated.
                            Find Your Shelter was created to simplify the rental
                            experience by bringing verified property listings,
                            clear information, and an easy inquiry process into
                            one place.
                        </p>

                        <p className="mt-5 leading-8 text-muted-foreground">
                            Whether you're a student, working professional,
                            or a family searching for your next home,
                            our platform is designed to help you discover
                            quality properties quickly and confidently.
                        </p>

                        <div className="mt-10 space-y-5">

                            {features.map((feature) => (
                                <div
                                    key={feature.title}
                                    className="flex items-start gap-4 rounded-2xl border p-5 transition-all hover:shadow-md"
                                >
                                    <div className="rounded-xl bg-primary/10 p-3">
                                        <feature.icon className="h-6 w-6 text-primary" />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">
                                            {feature.title}
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}

                        </div>

                    </motion.div>

                </div>
            </div>
        </section>
    );
}