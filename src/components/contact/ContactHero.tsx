"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PhoneCall, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ContactHero() {
    return (
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 via-background to-background">
            {/* Background Decorations */}
            <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

            <div className="container relative mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium shadow-sm"
                >
                    <PhoneCall className="h-4 w-4 text-primary" />
                    Get in Touch
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-8 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
                >
                    Let's Find Your{" "}
                    <span className="text-primary">
                        Next Home
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground"
                >
                    Have questions about a property or need help finding the
                    perfect rental? Our team is here to assist you. Send us a
                    message and we'll get back to you as soon as possible.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-10 flex flex-col gap-4 sm:flex-row"
                >
                    <Button size="lg" asChild>
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
                        <Link href="#contact-form">
                            Send a Message
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}