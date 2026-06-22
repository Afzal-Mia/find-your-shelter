"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Building2,
    ArrowRight,
    Home,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const stats = [
    {
        value: "250+",
        label: "Properties Listed",
    },
    {
        value: "500+",
        label: "Happy Renters",
    },
    {
        value: "98%",
        label: "Customer Satisfaction",
    },
    {
        value: "24/7",
        label: "Customer Support",
    },
];

export default function AboutHero() {
    return (
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 via-background to-background">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute left-[-80px] top-[-80px] h-72 w-72 rounded-full bg-primary/10 blur-3xl sm:h-96 sm:w-96" />

                <div className="absolute bottom-[-120px] right-[-120px] h-80 w-80 rounded-full bg-primary/10 blur-3xl sm:h-[420px] sm:w-[420px]" />
            </div>

            <div className="container relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:py-28 xl:py-32">
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 40,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.7,
                    }}
                    className="mx-auto max-w-5xl text-center"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.9,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        transition={{
                            delay: 0.15,
                        }}
                        className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm"
                    >
                        <Building2 className="h-4 w-4 text-primary" />

                        <span className="text-xs font-semibold sm:text-sm">
                            About Find Your Shelter
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 0.25,
                        }}
                        className="mt-6 text-4xl font-extrabold tracking-tight sm:mt-8 sm:text-5xl lg:text-6xl xl:text-7xl"
                    >
                        Helping You Find

                        <span className="mt-2 block text-primary">
                            Your Perfect Home
                        </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        transition={{
                            delay: 0.35,
                        }}
                        className="mx-auto mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:mt-8 sm:text-lg sm:leading-8 lg:text-xl"
                    >
                        Find Your Shelter is built to make renting homes
                        simple, transparent, and stress-free. We connect
                        people with verified properties, helping renters
                        discover comfortable homes with complete confidence.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 0.45,
                        }}
                        className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4"
                    >
                        <Button
                            size="lg"
                            asChild
                            className="w-full sm:w-auto"
                        >
                            <Link href="/properties">
                                Browse Properties

                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            asChild
                            className="w-full sm:w-auto"
                        >
                            <Link href="/contact">
                                <Home className="mr-2 h-4 w-4" />

                                Contact Us
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Statistics */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 0.6,
                        }}
                        className="mt-14 grid grid-cols-2 gap-4 sm:mt-16 sm:gap-6 lg:mt-20 lg:grid-cols-4"
                    >
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-2xl border bg-background/70 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6"
                            >
                                <h2 className="text-2xl font-bold text-primary sm:text-3xl">
                                    {stat.value}
                                </h2>

                                <p className="mt-2 text-xs leading-5 text-muted-foreground sm:text-sm">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}