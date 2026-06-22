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
                    : "bg-transparent"
            )}
        >
            <Container className="flex h-20 items-center justify-between">
                {/* Logo */}
                <Logo />

                {/* Right Side */}
                <div className="flex items-center gap-8">
                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-8 lg:flex">
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
                                className="lg:hidden"
                                aria-label="Open Menu"
                            >
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>

                        <SheetContent
                            side="right"
                            className="flex w-[320px] flex-col p-0"
                        >
                            {/* Header */}
                            <SheetHeader className="border-b px-6 py-6">
                                <SheetTitle>
                                    <Logo />
                                </SheetTitle>
                            </SheetHeader>

                            {/* Navigation */}
                            <div className="flex-1 px-5 py-6">
                                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
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
                                                    "flex items-center justify-between rounded-2xl px-4 py-4 transition-all duration-200",
                                                    isActive
                                                        ? "bg-primary text-primary-foreground shadow-sm"
                                                        : "hover:bg-muted"
                                                )}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <Icon className="h-5 w-5 shrink-0" />

                                                    <span className="text-base font-semibold">
                                                        {item.label}
                                                    </span>
                                                </div>

                                                <ArrowRight className="h-4 w-4 opacity-70" />
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Footer CTA */}
                            <div className="border-t p-5">
                                <Button
                                    asChild
                                    size="lg"
                                    className="w-full rounded-xl"
                                >
                                    <Link
                                        href="/properties"
                                        onClick={() =>
                                            setMobileOpen(false)
                                        }
                                    >
                                        Browse Properties

                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </Container>
        </header>
    );
}