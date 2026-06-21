import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
    return (
        <section className="py-24">
            <div className="container mx-auto max-w-7xl px-6">
                <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center shadow-xl sm:px-12 lg:px-20">
                    {/* Decorative circles */}
                    <div className="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-white/10" />
                    <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-white/10" />

                    <div className="relative z-10 mx-auto max-w-3xl">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                            <Building2 className="h-8 w-8 text-white" />
                        </div>

                        <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white">
                            Start Your Journey
                        </span>

                        <h2 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
                            Ready to Find Your Dream Home?
                        </h2>

                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80">
                            Browse verified flats, houses, and villas with transparent
                            pricing and connect directly with property owners.
                        </p>

                        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button
                                asChild
                                size="lg"
                                variant="secondary"
                                className="min-w-[220px]"
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
                                className="min-w-[220px] border-white bg-transparent text-white hover:bg-white hover:text-primary"
                            >
                                <Link href="/contact">
                                    Contact Us
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}