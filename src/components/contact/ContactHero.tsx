"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PhoneCall, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ContactHero() {
    return (
        <section className="relative overflow-hidden  bg-gradient-to-b from-primary/5 via-background to-background">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -left-20 top-10 h-60 w-60 rounded-full bg-primary/10 blur-3xl sm:h-72 sm:w-72 lg:-left-24" />
                <div className="absolute -right-20 bottom-0 h-60 w-60 rounded-full bg-primary/10 blur-3xl sm:h-72 sm:w-72 lg:-right-24" />
            </div>

            <div className="container relative mx-auto flex max-w-7xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-20 lg:py-28 xl:py-32">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-xs font-semibold shadow-sm backdrop-blur sm:text-sm"
                >
                    <PhoneCall className="h-4 w-4 text-primary" />
                    Get in Touch
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="mt-6 max-w-5xl text-3xl font-extrabold tracking-tight sm:mt-8 sm:text-5xl lg:text-6xl xl:text-7xl"
                >
                    Let's Find Your{" "}
                    <span className="block text-primary sm:inline">
                        Next Home
                    </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:mt-6 sm:text-lg sm:leading-8 lg:text-xl"
                >
                    Have questions about a property or need help finding the
                    perfect rental? Our team is here to assist you. Send us a
                    message and we'll get back to you as soon as possible.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:w-auto sm:flex-row sm:justify-center"
                >
                    <Button
                        size="lg"
                        asChild
                        className="h-11 w-full sm:h-12 sm:w-auto sm:min-w-[200px]"
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
                        className="h-11 w-full sm:h-12 sm:w-auto sm:min-w-[200px]"
                    >
                        <Link href="#contact-form">
                            Send a Message
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}