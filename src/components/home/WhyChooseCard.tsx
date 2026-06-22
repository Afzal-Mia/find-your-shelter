import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { cn } from "@/lib/utils";

interface WhyChooseCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    iconBg: string;
    iconColor: string;
}

export default function WhyChooseCard({
    icon: Icon,
    title,
    description,
    iconBg,
    iconColor,
}: WhyChooseCardProps) {
    return (
        <Card className="group h-full rounded-2xl border-border/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:rounded-3xl">
            <CardContent className="flex flex-col items-center p-5 text-center sm:p-6 lg:p-8">
                <div
                    className={cn(
                        "mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 sm:mb-5 sm:h-16 sm:w-16 sm:rounded-2xl",
                        iconBg
                    )}
                >
                    <Icon
                        className={cn(
                            "h-7 w-7 transition-transform duration-500 sm:h-8 sm:w-8",
                            iconColor
                        )}
                    />
                </div>

                <h3 className="mb-2 text-lg font-semibold text-foreground sm:mb-3 sm:text-xl">
                    {title}
                </h3>

                <p className="text-sm leading-6 text-muted-foreground sm:leading-7">
                    {description}
                </p>
            </CardContent>
        </Card>
    );
}