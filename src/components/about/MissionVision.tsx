"use client";

import { motion } from "framer-motion";
import {
    Target,
    Eye,
    ArrowRight,
} from "lucide-react";

export default function MissionVision() {
    const items = [
        {
            title: "Our Mission",
            icon: Target,
            description:
                "Our mission is to simplify the home rental experience by connecting people with verified properties through a transparent, reliable, and user-friendly platform. We strive to make finding the perfect home faster, easier, and stress-free.",
            gradient: "from-primary/10 to-primary/5",
        },
        {
            title: "Our Vision",
            icon: Eye,
            description:
                "We envision becoming one of India's most trusted property rental platforms by delivering exceptional user experiences, innovative technology, and quality listings that help everyone find a place they can truly call home.",
            gradient: "from-emerald-500/10 to-emerald-500/5",
        },
    ];

    return (
        <section className="py-24 bg-muted/20">
            <div className="container mx-auto max-w-7xl px-6">

                {/* Heading */}

                <div className="mx-auto max-w-3xl text-center">

                    <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                        Mission & Vision
                    </span>

                    <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                        Building Trust,
                        <span className="block text-primary">
                            One Home at a Time
                        </span>
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        Everything we do is driven by our commitment to making
                        property discovery simple, transparent, and accessible
                        for everyone.
                    </p>

                </div>

                {/* Cards */}

                <div className="mt-16 grid gap-8 lg:grid-cols-2">

                    {items.map((item, index) => (
                        <motion.div
                            key={item.title}
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
                            }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.2,
                            }}
                            className={`group relative overflow-hidden rounded-3xl border bg-gradient-to-br ${item.gradient} p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
                        >
                            {/* Decorative Circle */}

                            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/30 blur-2xl" />

                            {/* Icon */}

                            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">

                                <item.icon className="h-8 w-8" />

                            </div>

                            {/* Title */}

                            <h3 className="relative mt-8 text-3xl font-bold">
                                {item.title}
                            </h3>

                            {/* Description */}

                            <p className="relative mt-5 leading-8 text-muted-foreground">
                                {item.description}
                            </p>

                            {/* Footer */}

                            <div className="relative mt-8 flex items-center gap-2 font-medium text-primary">

                                Learn More

                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

                            </div>

                        </motion.div>
                    ))}

                </div>

            </div>
        </section>
    );
}