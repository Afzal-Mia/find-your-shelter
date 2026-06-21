"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    CheckCircle2,
    ArrowRight,
    Home,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function InquirySuccess() {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 30,
                scale: 0.96,
            }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
            }}
            transition={{
                duration: 0.45,
            }}
            className="rounded-3xl border bg-card p-10 text-center shadow-sm"
        >
            {/* Animated Success Icon */}
            <motion.div
                initial={{
                    scale: 0,
                    rotate: -180,
                }}
                animate={{
                    scale: 1,
                    rotate: 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 14,
                }}
                className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100"
            >
                <CheckCircle2 className="h-12 w-12 text-emerald-600" />
            </motion.div>

            <h2 className="mt-8 text-3xl font-bold">
                Thank You!
            </h2>

            <p className="mx-auto mt-4 max-w-md leading-7 text-muted-foreground">
                Your inquiry has been submitted successfully. Our team will contact you soon regarding this property.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <Button asChild size="lg">
                    <Link href="/properties">
                        <Home className="mr-2 h-4 w-4" />
                        Browse More Properties
                    </Link>
                </Button>

                <Button
                    variant="outline"
                    size="lg"
                    asChild
                >
                    <Link href="/">
                        Back to Home
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </motion.div>
    );
}