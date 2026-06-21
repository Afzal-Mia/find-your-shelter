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
        <Card className="group h-full border-border/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <CardContent className="flex flex-col items-center p-8 text-center">
                <div
                    className={cn(
                        "mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6",
                        iconBg
                    )}
                >
                    <Icon
                        className={cn(
                            "h-8 w-8 transition-transform duration-500",
                            iconColor
                        )}
                    />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-foreground">
                    {title}
                </h3>

                <p className="text-sm leading-7 text-muted-foreground">
                    {description}
                </p>
            </CardContent>
        </Card>
    );
}