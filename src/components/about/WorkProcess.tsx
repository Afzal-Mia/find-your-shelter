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
            "Explore photos, amenities, pricing, room availability, and property information.",
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
        <section className="py-24">
            <div className="container mx-auto max-w-7xl px-6">

                <div className="mx-auto max-w-3xl text-center">

                    <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                        How It Works
                    </span>

                    <h2 className="mt-6 text-4xl font-bold sm:text-5xl">
                        Renting Made
                        <span className="block text-primary">
                            Simple & Hassle-Free
                        </span>
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        Finding your next home takes just a few simple steps.
                    </p>

                </div>

                <div className="relative mt-20 grid gap-10 md:grid-cols-2 xl:grid-cols-4">

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
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
                                duration: 0.5,
                                delay: index * 0.15,
                            }}
                            className="group relative rounded-3xl border bg-card p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                        >
                            <div className="absolute right-6 top-6 text-5xl font-black text-primary/10">
                                {step.number}
                            </div>

                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary">
                                <step.icon className="h-8 w-8 text-primary group-hover:text-white" />
                            </div>

                            <h3 className="mt-8 text-xl font-semibold">
                                {step.title}
                            </h3>

                            <p className="mt-4 leading-7 text-muted-foreground">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}

                </div>

            </div>
        </section>
    );
}