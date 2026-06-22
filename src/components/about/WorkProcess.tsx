"use client";

import { motion } from "framer-motion";
import {
    Search,
    Eye,
    Send,
    Home,
} from "lucide-react";

const steps = [
    {
        number: "01",
        icon: Search,
        title: "Search Properties",
        description:
            "Browse verified rental properties that match your preferences and budget.",
    },
    {
        number: "02",
        icon: Eye,
        title: "View Details",
        description:
            "Explore photos, amenities, pricing, room availability, and complete property information.",
    },
    {
        number: "03",
        icon: Send,
        title: "Send Inquiry",
        description:
            "Submit an inquiry directly through the platform and connect with the property owner.",
    },
    {
        number: "04",
        icon: Home,
        title: "Move Into Your Home",
        description:
            "Complete the process and move into a place you'll love to call home.",
    },
];

export default function WorkProcess() {
    return (
        <section className="py-16 sm:py-20 lg:py-24">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.6,
                    }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                        How It Works
                    </span>

                    <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                        Renting Made
                        <span className="mt-2 block text-primary">
                            Simple & Hassle-Free
                        </span>
                    </h2>

                    <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                        Finding your next home takes just a few simple steps.
                        We've made the rental journey straightforward from
                        discovery to move-in.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative mt-12 lg:mt-16">
                    {/* Connector Line (Desktop Only) */}
                    <div className="absolute left-0 right-0 top-10 hidden h-0.5 bg-border xl:block" />

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-8">
                        {steps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <motion.div
                                    key={step.number}
                                    initial={{
                                        opacity: 0,
                                        y: 40,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    viewport={{
                                        once: true,
                                        amount: 0.3,
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.15,
                                    }}
                                    whileHover={{
                                        y: -8,
                                    }}
                                    className="group relative rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-xl sm:p-8"
                                >
                                    {/* Step Number */}
                                    <span className="absolute right-5 top-5 text-5xl font-black text-primary/10 sm:text-6xl">
                                        {step.number}
                                    </span>

                                    {/* Icon */}
                                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary sm:h-16 sm:w-16">
                                        <Icon className="h-7 w-7 text-primary transition-colors duration-300 group-hover:text-white sm:h-8 sm:w-8" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="mt-6 text-xl font-semibold sm:mt-8">
                                        {step.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="mt-3 text-sm leading-7 text-muted-foreground sm:mt-4 sm:text-base">
                                        {step.description}
                                    </p>

                                    {/* Bottom Accent */}
                                    <div className="mt-6 h-1 w-14 rounded-full bg-primary/20 transition-all duration-300 group-hover:w-24 group-hover:bg-primary" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}