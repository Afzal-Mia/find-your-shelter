// src/components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, ArrowRight } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Container from "../common/container";
import Logo from "./logo";

const navLinks = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "Properties",
        href: "/properties",
    },
    {
        label: "About",
        href: "/about",
    },
    {
        label: "Contact",
        href: "/contact",
    },
];

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

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
                    ? "border-b border-slate-200 bg-white/80 shadow-md backdrop-blur-xl"
                    : "bg-transparent"
            )}
        >
            <Container className="flex h-20 items-center justify-between">
                {/* Logo */}
                <Logo />

                {/* Right Side */}
                <div className="flex items-center gap-10">
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
                                        "relative text-sm font-medium transition-colors duration-200",
                                        isActive
                                            ? "text-emerald-600"
                                            : "text-slate-700 hover:text-emerald-600"
                                    )}
                                >
                                    {item.label}

                                    {isActive && (
                                        <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-emerald-600" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Mobile Menu */}
                    <Sheet>
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

                        <SheetContent side="right" className="w-[300px]">
                            <SheetHeader>
                                <SheetTitle>
                                    <Logo />
                                </SheetTitle>
                            </SheetHeader>

                            <div className="mt-8 flex flex-col gap-2">
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
                                                "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                                                isActive
                                                    ? "bg-emerald-50 text-emerald-600"
                                                    : "hover:bg-slate-100"
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </Container>
        </header>
    );
}