import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Container from "../common/container";

export default function Hero() {
    return (
        <section className="relative isolate overflow-hidden">
            {/* Background Image */}
            <Image
                src="/images/Hero.jpg"
                alt="Find Your Shelter"
                fill
                priority
                className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-900/50" />

            <Container className="relative flex min-h-[80vh] items-center py-16 sm:min-h-[85vh] sm:py-20 lg:min-h-[90vh] lg:py-24">
                <div className="max-w-3xl">
                    {/* Badge */}
                    <Badge className="mb-5 rounded-full bg-emerald-600 px-3 py-1.5 text-xs text-white hover:bg-emerald-600 sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
                        <BadgeCheck className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        Verified Rental Properties
                    </Badge>

                    {/* Heading */}
                    <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                        Find Your
                        <span className="block text-emerald-400">
                            Dream Home
                        </span>
                        Today
                    </h1>

                    {/* Description */}
                    <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:mt-6 sm:text-lg sm:leading-8">
                        Discover verified flats, houses and villas across your
                        city. Affordable rentals, trusted reviews, and a smooth
                        booking experience—all in one place.
                    </p>

                    {/* Buttons */}
                    <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
                        <Button
                            asChild
                            size="lg"
                            className="w-full sm:w-auto"
                        >
                            <Link href="/properties">
                                Browse Properties
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>

                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="w-full border-white bg-white/10 text-white backdrop-blur hover:bg-white hover:text-slate-900 sm:w-auto"
                        >
                            <Link href="/contact">
                                Contact Us
                            </Link>
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="mt-10 grid grid-cols-1 gap-4 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl sm:mt-12 sm:grid-cols-3 sm:p-6">
                        <div className="text-center sm:text-left">
                            <p className="text-2xl font-bold text-emerald-400 sm:text-3xl">
                                100+
                            </p>

                            <p className="mt-1 text-xs text-slate-200 sm:text-sm">
                                Verified Listings
                            </p>
                        </div>

                        <div className="text-center sm:text-left">
                            <p className="text-2xl font-bold text-emerald-400 sm:text-3xl">
                                500+
                            </p>

                            <p className="mt-1 text-xs text-slate-200 sm:text-sm">
                                Happy Customers
                            </p>
                        </div>

                        <div className="text-center sm:text-left">
                            <p className="text-2xl font-bold text-emerald-400 sm:text-3xl">
                                4.8★
                            </p>

                            <p className="mt-1 text-xs text-slate-200 sm:text-sm">
                                Average Rating
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}