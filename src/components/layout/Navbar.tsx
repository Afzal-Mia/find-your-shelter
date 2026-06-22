// src/components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
    Menu,
    ArrowRight,
    Home,
    Building2,
    Info,
    Phone,
} from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import Container from "../common/container";
import Logo from "./logo";

const navLinks = [
    {
        label: "Home",
        href: "/",
        icon: Home,
    },
    {
        label: "Properties",
        href: "/properties",
        icon: Building2,
    },
    {
        label: "About",
        href: "/about",
        icon: Info,
    },
    {
        label: "Contact",
        href: "/contact",
        icon: Phone,
    },
];

export default function Navbar() {
    const pathname = usePathname();

    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-300",
                scrolled
                    ? "border-b border-border bg-background/80 shadow-sm backdrop-blur-xl"
                    : "bg-background/70 backdrop-blur-md"
            )}
        >
            <Container className="flex h-16 items-center justify-between sm:h-[72px] lg:h-20">
                <Logo />

                <div className="flex items-center gap-3 sm:gap-5 lg:gap-8">
                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
                        {navLinks.map((item) => {
                            const isActive =
                                item.href === "/"
                                    ? pathname === "/"
                                    : pathname.startsWith(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "relative text-sm font-semibold transition-colors duration-200",
                                        isActive
                                            ? "text-primary"
                                            : "text-muted-foreground hover:text-primary"
                                    )}
                                >
                                    {item.label}

                                    {isActive && (
                                        <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-primary" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Mobile Navigation */}
                    <Sheet
                        open={mobileOpen}
                        onOpenChange={setMobileOpen}
                    >
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 rounded-xl lg:hidden"
                                aria-label="Open Menu"
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>

                        <SheetContent
                            side="right"
                            className="flex w-[85vw] max-w-[320px] flex-col !bg-white !text-black p-0"
                        >
                            {/* Header */}
                            <SheetHeader className="border-b bg-white px-5 py-5 sm:px-6 sm:py-6">
                                <SheetTitle>
                                    <Logo />
                                </SheetTitle>
                            </SheetHeader>

                            {/* Navigation */}
                            <div className="flex-1 overflow-y-auto bg-white px-4 py-5 sm:px-5 sm:py-6">
                                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                                    Navigation
                                </p>

                                <div className="space-y-2">
                                    {navLinks.map((item) => {
                                        const Icon = item.icon;

                                        const isActive =
                                            item.href === "/"
                                                ? pathname === "/"
                                                : pathname.startsWith(item.href);

                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() =>
                                                    setMobileOpen(false)
                                                }
                                                className={cn(
                                                    "flex items-center justify-between rounded-xl px-4 py-3.5 transition-all duration-200 sm:rounded-2xl sm:py-4",
                                                    isActive
                                                        ? "bg-primary text-primary-foreground shadow-sm"
                                                        : "text-gray-800 hover:bg-gray-100"
                                                )}
                                            >
                                                <div className="flex items-center gap-3 sm:gap-4">
                                                    <Icon className="h-5 w-5 shrink-0" />

                                                    <span className="text-sm font-semibold sm:text-base">
                                                        {item.label}
                                                    </span>
                                                </div>

                                                <ArrowRight className="h-4 w-4 opacity-70" />
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>


                        </SheetContent>
                    </Sheet>
                </div>
            </Container>
        </header>
    );
}