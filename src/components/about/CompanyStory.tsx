"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
    Building2,
    ShieldCheck,
    HeartHandshake,
    Search,
} from "lucide-react";

const features = [
    {
        icon: Search,
        title: "Verified Listings",
        description:
            "Every property is carefully reviewed to help you browse with complete confidence and transparency.",
    },
    {
        icon: ShieldCheck,
        title: "Trusted Experience",
        description:
            "We focus on accurate information, verified properties, and a seamless rental journey.",
    },
    {
        icon: HeartHandshake,
        title: "Customer First",
        description:
            "Everything we build is designed to make finding your next home simple, secure, and stress-free.",
    },
];

export default function CompanyStory() {
    return (
        <section className="py-16 sm:py-20 lg:py-24">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-12 lg:gap-16 xl:grid-cols-2">
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
                            amount: 0.3,
                        }}
                        transition={{
                            duration: 0.7,
                        }}
                        className="order-1"
                    >
                        <div className="relative overflow-hidden rounded-2xl border bg-background shadow-xl sm:rounded-3xl">
                            <Image
                                src="/images/Hero.jpg"
                                alt="Modern Apartment"
                                width={900}
                                height={700}
                                className="h-72 w-full object-cover sm:h-96 lg:h-[520px] transition-transform duration-700 hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                            {/* Floating Card */}
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                }}
                                transition={{
                                    delay: 0.3,
                                    duration: 0.5,
                                }}
                                className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto"
                            >
                                <div className="rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur-lg sm:p-5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                            <Building2 className="h-6 w-6 text-primary" />
                                        </div>

                                        <div>
                                            <h3 className="text-base font-semibold sm:text-lg">
                                                Find Your Shelter
                                            </h3>

                                            <p className="text-sm text-muted-foreground">
                                                Helping people find homes they
                                                truly love.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
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
                            amount: 0.3,
                        }}
                        transition={{
                            duration: 0.7,
                        }}
                        className="order-2"
                    >
                        <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                            Our Story
                        </span>

                        <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                            Making Home Search
                            <span className="mt-2 block text-primary">
                                Easier for Everyone
                            </span>
                        </h2>

                        <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                            Finding the right home should never feel
                            complicated. Find Your Shelter was created to
                            simplify the rental experience by bringing verified
                            property listings, transparent information, and a
                            seamless inquiry process into one place.
                        </p>

                        <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                            Whether you're a student, working professional, or a
                            family searching for your next home, our platform is
                            designed to help you discover quality rental
                            properties quickly, safely, and confidently.
                        </p>

                        {/* Features */}
                        <div className="mt-10 space-y-4 sm:space-y-5">
                            {features.map((feature, index) => {
                                const Icon = feature.icon;

                                return (
                                    <motion.div
                                        key={feature.title}
                                        initial={{
                                            opacity: 0,
                                            y: 20,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        viewport={{
                                            once: true,
                                        }}
                                        transition={{
                                            delay: index * 0.15,
                                            duration: 0.45,
                                        }}
                                        className="group flex items-start gap-4 rounded-2xl border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg sm:p-5"
                                    >
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary">
                                            <Icon className="h-6 w-6 text-primary transition-colors duration-300 group-hover:text-white" />
                                        </div>

                                        <div>
                                            <h3 className="text-base font-semibold sm:text-lg">
                                                {feature.title}
                                            </h3>

                                            <p className="mt-1 text-sm leading-6 text-muted-foreground sm:text-[15px]">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}