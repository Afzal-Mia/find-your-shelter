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

            <Container className="relative flex min-h-[90vh] items-center py-24">
                <div className="max-w-3xl">
                    <Badge className="mb-6 rounded-full bg-emerald-600 px-4 py-2 text-sm text-white hover:bg-emerald-600">
                        <BadgeCheck className="mr-2 h-4 w-4" />
                        Verified Rental Properties
                    </Badge>

                    <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
                        Find Your
                        <span className="block text-emerald-400">
                            Dream Home
                        </span>
                        Today
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
                        Discover verified flats, houses and villas across your
                        city. Affordable rentals, trusted reviews and a smooth
                        booking experience—all in one place.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">
                        <Button asChild size="lg">
                            <Link href="/properties">
                                Browse Properties
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>

                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-white bg-white/10 text-white backdrop-blur hover:bg-white hover:text-slate-900"
                        >
                            <Link href="/contact">
                                Contact Us
                            </Link>
                        </Button>
                    </div>

                    {/* Floating Stats Card */}
                    <div className="mt-14 grid max-w-2xl grid-cols-3 gap-4 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
                        <div>
                            <p className="text-3xl font-bold text-emerald-400">
                                100+
                            </p>
                            <p className="mt-1 text-sm text-slate-200">
                                Verified Listings
                            </p>
                        </div>

                        <div>
                            <p className="text-3xl font-bold text-emerald-400">
                                500+
                            </p>
                            <p className="mt-1 text-sm text-slate-200">
                                Happy Customers
                            </p>
                        </div>

                        <div>
                            <p className="text-3xl font-bold text-emerald-400">
                                4.8★
                            </p>
                            <p className="mt-1 text-sm text-slate-200">
                                Average Rating
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}