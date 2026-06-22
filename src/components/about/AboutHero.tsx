"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Building2,
    ArrowRight,
    Home,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function AboutHero() {
    return (
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 via-background to-background">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
            </div>

            <div className="container relative mx-auto max-w-7xl px-6 py-24 lg:py-32">

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.6,
                    }}
                    className="mx-auto max-w-4xl text-center"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
                        <Building2 className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">
                            About Find Your Shelter
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="mt-8 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl">
                        Helping You Find
                        <span className="block text-primary">
                            Your Perfect Home
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-muted-foreground lg:text-xl">
                        Find Your Shelter is built to make renting homes
                        simple, transparent, and stress-free. We connect
                        people with verified properties, making it easier
                        to discover comfortable places that truly feel like
                        home.
                    </p>

                    {/* Buttons */}
                    <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
                        <Button
                            size="lg"
                            asChild
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
                        >
                            <Link href="/contact">
                                <Home className="mr-2 h-4 w-4" />
                                Contact Us
                            </Link>
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">

                        <div>
                            <h2 className="text-3xl font-bold text-primary">
                                250+
                            </h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Properties Listed
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-primary">
                                500+
                            </h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Happy Renters
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-primary">
                                98%
                            </h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Customer Satisfaction
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-primary">
                                24/7
                            </h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Customer Support
                            </p>
                        </div>

                    </div>
                </motion.div>

            </div>
        </section>
    );
}