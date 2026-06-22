"use client";

import { motion } from "framer-motion";
import {
    Target,
    Eye,
    ArrowRight,
} from "lucide-react";

const items = [
    {
        title: "Our Mission",
        icon: Target,
        description:
            "Our mission is to simplify the home rental experience by connecting people with verified properties through a transparent, reliable, and user-friendly platform. We strive to make finding the perfect home faster, easier, and stress-free.",
        gradient: "from-primary/10 via-primary/5 to-background",
    },
    {
        title: "Our Vision",
        icon: Eye,
        description:
            "We envision becoming one of India's most trusted property rental platforms by delivering exceptional user experiences, innovative technology, and quality listings that help everyone find a place they can truly call home.",
        gradient: "from-emerald-500/10 via-emerald-500/5 to-background",
    },
];

export default function MissionVision() {
    return (
        <section className="bg-muted/20 py-16 sm:py-20 lg:py-24">
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
                        Mission & Vision
                    </span>

                    <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                        Building Trust,
                        <span className="mt-2 block text-primary">
                            One Home at a Time
                        </span>
                    </h2>

                    <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                        Everything we do is driven by our commitment to making
                        property discovery simple, transparent, and accessible
                        for everyone.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8">
                    {items.map((item, index) => {
                        const Icon = item.icon;

                        return (
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
                                    amount: 0.3,
                                }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.15,
                                }}
                                whileHover={{
                                    y: -8,
                                }}
                                className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br ${item.gradient} p-6 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-2xl sm:rounded-3xl sm:p-8`}
                            >
                                {/* Decorative Blur */}
                                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/30 blur-3xl" />

                                {/* Icon */}
                                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16">
                                    <Icon className="h-7 w-7 text-primary-foreground sm:h-8 sm:w-8" />
                                </div>

                                {/* Title */}
                                <h3 className="relative mt-6 text-2xl font-bold sm:mt-8 sm:text-3xl">
                                    {item.title}
                                </h3>

                                {/* Description */}
                                <p className="relative mt-4 text-sm leading-7 text-muted-foreground sm:mt-5 sm:text-base sm:leading-8">
                                    {item.description}
                                </p>

                                {/* Footer */}
                                <div className="relative mt-6 flex items-center gap-2 font-medium text-primary sm:mt-8">
                                    <span>Learn More</span>

                                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}