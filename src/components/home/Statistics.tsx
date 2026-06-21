"use client";
import {
    Building2,
    Users,
    MapPinned,
    Star,
} from "lucide-react";

import StatisticCard from "./StatisticCard";

const STATS = [
    {
        icon: Building2,
        value: 100,
        suffix: "+",
        title: "Verified Properties",
        description:
            "Carefully verified rental listings that you can trust.",
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
    },
    {
        icon: Users,
        value: 500,
        suffix: "+",
        title: "Happy Customers",
        description:
            "Helping renters and families find their perfect home.",
        iconBg: "bg-sky-100",
        iconColor: "text-sky-600",
    },
    {
        icon: MapPinned,
        value: 25,
        suffix: "+",
        title: "Cities Covered",
        description:
            "Growing our network of rental properties across India.",
        iconBg: "bg-violet-100",
        iconColor: "text-violet-600",
    },
    {
        icon: Star,
        value: 4.8,
        decimals: 1,
        suffix: "★",
        title: "Average Rating",
        description:
            "Highly rated by customers for trust and reliability.",
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
    },
];

export default function Statistics() {
    return (
        <section className="bg-slate-50 py-24">
            <div className="container mx-auto max-w-7xl px-6">
                {/* Section Heading */}
                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                        Our Impact
                    </span>

                    <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        Numbers That Build Trust
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-muted-foreground">
                        Thousands of renters have trusted Find Your Shelter to discover
                        verified homes. Our growing community reflects our commitment to
                        quality, transparency, and a seamless rental experience.
                    </p>
                </div>

                {/* Statistics Grid */}
                <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {STATS.map((stat) => (
                        <StatisticCard
                            key={stat.title}
                            icon={stat.icon}
                            value={stat.value}
                            suffix={stat.suffix}
                            decimals={stat.decimals}
                            title={stat.title}
                            description={stat.description}
                            iconBg={stat.iconBg}
                            iconColor={stat.iconColor}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}