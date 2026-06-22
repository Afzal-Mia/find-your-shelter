"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { cn } from "@/lib/utils";

interface StatisticCardProps {
    icon: LucideIcon;
    value: number;
    suffix?: string;
    decimals?: number;
    title: string;
    description: string;
    iconBg: string;
    iconColor: string;
}

export default function StatisticCard({
    icon: Icon,
    value,
    suffix = "+",
    decimals = 0,
    title,
    description,
    iconBg,
    iconColor,
}: StatisticCardProps) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.35,
    });

    return (
        <Card
            ref={ref}
            className="group h-full rounded-2xl border-0 bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl md:hover:-translate-y-3 md:hover:shadow-2xl"
        >
            <CardContent className="p-5 sm:p-6 lg:p-8">
                {/* Icon */}
                <div
                    className={cn(
                        "mb-5 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 md:h-16 md:w-16 group-hover:rotate-6",
                        iconBg
                    )}
                >
                    <Icon
                        className={cn(
                            "h-7 w-7 md:h-8 md:w-8",
                            iconColor
                        )}
                    />
                </div>

                {/* Counter */}
                <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                    {inView ? (
                        <CountUp
                            end={value}
                            duration={2.2}
                            decimals={decimals}
                            suffix={suffix}
                        />
                    ) : (
                        0
                    )}
                </h3>

                {/* Title */}
                <h4 className="mt-3 text-base font-semibold sm:text-lg">
                    {title}
                </h4>

                {/* Description */}
                <p className="mt-2 text-sm leading-6 text-muted-foreground sm:leading-7">
                    {description}
                </p>
            </CardContent>
        </Card>
    );
}