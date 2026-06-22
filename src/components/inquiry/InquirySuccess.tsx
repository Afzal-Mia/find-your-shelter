"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    CheckCircle2,
    ArrowRight,
    Home,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
    propertyId?: string;
}

export default function InquirySuccess({
    propertyId,
}: Props) {
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
            className="rounded-2xl border bg-card p-6 text-center shadow-sm sm:rounded-3xl sm:p-8 lg:p-10"
        >
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
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 sm:h-24 sm:w-24"
            >
                <CheckCircle2 className="h-10 w-10 text-emerald-600 sm:h-12 sm:w-12" />
            </motion.div>

            <h2 className="mt-6 text-2xl font-bold sm:mt-8 sm:text-3xl">
                Thank You!
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground sm:mt-4 sm:text-base">
                {propertyId
                    ? "Your inquiry has been submitted successfully. Our team will contact you soon regarding this property."
                    : "Your message has been sent successfully. Our team will get back to you as soon as possible."}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4">
                <Button
                    asChild
                    size="lg"
                    className="w-full sm:w-auto"
                >
                    <Link href="/properties">
                        <Home className="mr-2 h-4 w-4" />
                        Browse Properties
                    </Link>
                </Button>

                <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="w-full sm:w-auto"
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