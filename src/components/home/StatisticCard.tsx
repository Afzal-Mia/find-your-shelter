"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
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
            className="group h-full rounded-2xl border-0 bg-white shadow-md transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
        >
            <CardContent className="p-8">
                <div
                    className={cn(
                        "mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6",
                        iconBg
                    )}
                >
                    <Icon className={cn("h-8 w-8", iconColor)} />
                </div>

                <h3 className="text-4xl font-extrabold tracking-tight">
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

                <h4 className="mt-3 text-lg font-semibold">
                    {title}
                </h4>

                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {description}
                </p>
            </CardContent>
        </Card>
    );
}