import {
    ShieldCheck,
    IndianRupee,
    Star,
    MessageCircleMore,
} from "lucide-react";

import WhyChooseCard from "./WhyChooseCard";

const FEATURES = [
    {
        icon: ShieldCheck,
        title: "Verified Listings",
        description:
            "Every property is carefully reviewed to ensure accurate information and a trustworthy rental experience.",
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
    },
    {
        icon: IndianRupee,
        title: "Affordable Prices",
        description:
            "Browse flats, houses, and villas across a wide range of budgets without compromising quality.",
        iconBg: "bg-sky-100",
        iconColor: "text-sky-600",
    },
    {
        icon: Star,
        title: "Trusted Reviews",
        description:
            "Read genuine reviews from previous tenants to help you make confident rental decisions.",
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
    },
    {
        icon: MessageCircleMore,
        title: "Easy Inquiry",
        description:
            "Connect with property owners in just a few clicks using our quick and simple inquiry form.",
        iconBg: "bg-violet-100",
        iconColor: "text-violet-600",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="bg-muted/30 py-14 sm:py-16 lg:py-24">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                {/* Section Header */}
                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary sm:px-4 sm:py-2 sm:text-sm">
                        Why Choose Us
                    </span>

                    <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:mt-5 sm:text-3xl lg:text-4xl xl:text-5xl">
                        Why Choose{" "}
                        <span className="text-primary">
                            Find Your Shelter?
                        </span>
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-muted-foreground sm:mt-5 sm:text-base lg:text-lg lg:leading-8">
                        We make finding your next rental home simple, secure,
                        and stress-free with verified properties, transparent
                        information, and a seamless inquiry experience.
                    </p>
                </div>

                {/* Cards */}
                <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 xl:mt-16 xl:grid-cols-4">
                    {FEATURES.map((feature) => (
                        <WhyChooseCard
                            key={feature.title}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            iconBg={feature.iconBg}
                            iconColor={feature.iconColor}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}