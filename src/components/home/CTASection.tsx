"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";

import { Button } from "@/components/ui/button";

const containerVariants = {
    hidden: {
        opacity: 0,
        y: 50,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            staggerChildren: 0.12,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 25,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

export default function CTASection() {
    return (
        <section className="py-14 sm:py-16 lg:py-24">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.3,
                    }}
                    className="relative overflow-hidden rounded-2xl bg-primary px-5 py-12 text-center shadow-2xl sm:rounded-3xl sm:px-8 sm:py-14 lg:px-16 lg:py-20"
                >
                    {/* Decorative Circles */}
                    <motion.div
                        animate={{
                            y: [0, -15, 0],
                        }}
                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute -left-12 -top-12 h-32 w-32 rounded-full bg-white/10 sm:h-40 sm:w-40"
                    />

                    <motion.div
                        animate={{
                            y: [0, 20, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute -bottom-20 -right-20 h-44 w-44 rounded-full bg-white/10 sm:h-56 sm:w-56"
                    />

                    <div className="relative z-10 mx-auto max-w-3xl">
                        <motion.div
                            variants={itemVariants}
                            className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 sm:mb-6 sm:h-16 sm:w-16"
                            whileHover={{
                                scale: 1.1,
                                rotate: 10,
                            }}
                        >
                            <Building2 className="h-7 w-7 text-white sm:h-8 sm:w-8" />
                        </motion.div>

                        <motion.span
                            variants={itemVariants}
                            className="inline-flex rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white sm:px-4 sm:py-2 sm:text-sm"
                        >
                            Start Your Journey
                        </motion.span>

                        <motion.h2
                            variants={itemVariants}
                            className="mt-5 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:mt-6 lg:text-5xl"
                        >
                            Ready to Find Your Dream Home?
                        </motion.h2>

                        <motion.p
                            variants={itemVariants}
                            className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:mt-5 sm:text-base lg:mt-6 lg:text-lg lg:leading-8"
                        >
                            Browse verified flats, houses, and villas with
                            transparent pricing and connect directly with
                            property owners.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4"
                        >
                            <motion.div
                                whileHover={{
                                    scale: 1.04,
                                }}
                                whileTap={{
                                    scale: 0.97,
                                }}
                            >
                                <Button
                                    asChild
                                    size="lg"
                                    className="h-11 w-full min-w-full sm:h-12 sm:min-w-[220px]"
                                    variant="secondary"
                                >
                                    <Link href="/properties">
                                        Browse Properties
                                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                                    </Link>
                                </Button>
                            </motion.div>

                            <motion.div
                                whileHover={{
                                    scale: 1.04,
                                }}
                                whileTap={{
                                    scale: 0.97,
                                }}
                            >
                                <Button
                                    asChild
                                    size="lg"
                                    variant="outline"
                                    className="h-11 w-full min-w-full border-white bg-transparent text-white hover:bg-white hover:text-primary sm:h-12 sm:min-w-[220px]"
                                >
                                    <Link href="/contact">
                                        Contact Us
                                    </Link>
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}