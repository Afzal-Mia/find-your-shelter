"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Home } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ContactCTA() {
    return (
        <section className="py-24">
            <div className="container mx-auto max-w-7xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden rounded-3xl border bg-primary px-8 py-16 text-primary-foreground shadow-xl lg:px-16"
                >
                    {/* Background decoration */}
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -left-16 bottom-0 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

                    <div className="relative mx-auto max-w-3xl text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
                            <Home className="h-8 w-8" />
                        </div>

                        <h2 className="mt-8 text-3xl font-bold sm:text-4xl">
                            Ready to Find Your Next Home?
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-primary-foreground/90">
                            Explore our collection of verified rental properties
                            and discover a place that feels like home. Whether
                            you're looking for a flat, house, or villa, we're
                            here to help you every step of the way.
                        </p>

                        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                            <Button
                                asChild
                                size="lg"
                                variant="secondary"
                            >
                                <Link href="/properties">
                                    Browse Properties
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>

                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="border-white/30 bg-transparent text-white hover:bg-white hover:text-primary"
                            >
                                <Link href="/about">
                                    Learn More About Us
                                </Link>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}