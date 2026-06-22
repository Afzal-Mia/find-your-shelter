// src/components/layout/Footer.tsx
import Link from "next/link";
import {
    Mail,
    MapPin,
    Phone,
    Globe,
    Share2,
    Send,
    MessageCircle,
} from "lucide-react";

import Container from "../common/container";
import Logo from "./logo";

const quickLinks = [
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

const propertyTypes = [
    {
        label: "Flat",
        href: "/properties?type=flat",
    },
    {
        label: "House",
        href: "/properties?type=house",
    },
    {
        label: "Villa",
        href: "/properties?type=villa",
    },
];

const socialLinks = [
    {
        icon: Globe,
        href: "#",
        label: "Facebook",
    },
    {
        icon: Share2,
        href: "#",
        label: "Instagram",
    },
    {
        icon: Send,
        href: "#",
        label: "Twitter",
    },
    {
        icon: MessageCircle,
        href: "#",
        label: "LinkedIn",
    },
];

export default function Footer() {
    return (
        <footer className="border-t bg-slate-950 text-slate-300">
            <Container>
                <div className="grid grid-cols-1 gap-10 py-10 sm:gap-12 sm:py-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:py-16">
                    {/* Company */}
                    <div className="space-y-5">
                        <Logo
                            className="w-fit"
                            textClassName="text-white"
                        />

                        <p className="max-w-sm text-sm leading-7 text-slate-400">
                            Find Your Shelter helps you discover verified rental
                            properties including flats, houses, and villas at
                            affordable prices.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            {socialLinks.map(
                                ({ icon: Icon, href, label }) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        aria-label={label}
                                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-600 hover:text-white"
                                    >
                                        <Icon className="h-5 w-5" />
                                    </Link>
                                )
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-5 text-lg font-semibold text-white">
                            Quick Links
                        </h3>

                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="inline-flex transition-colors duration-300 hover:text-emerald-400"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Property Types */}
                    <div>
                        <h3 className="mb-5 text-lg font-semibold text-white">
                            Property Types
                        </h3>

                        <ul className="space-y-3">
                            {propertyTypes.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="inline-flex transition-colors duration-300 hover:text-emerald-400"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-5 text-lg font-semibold text-white">
                            Contact
                        </h3>

                        <ul className="space-y-5">
                            <li className="flex items-start gap-3">
                                <div className="rounded-lg bg-emerald-500/10 p-2">
                                    <Phone className="h-4 w-4 text-emerald-500" />
                                </div>

                                <span className="text-sm leading-6">
                                    +91 98765 43210
                                </span>
                            </li>

                            <li className="flex items-start gap-3">
                                <div className="rounded-lg bg-emerald-500/10 p-2">
                                    <Mail className="h-4 w-4 text-emerald-500" />
                                </div>

                                <span className="break-all text-sm leading-6">
                                    support@findyourshelter.com
                                </span>
                            </li>

                            <li className="flex items-start gap-3">
                                <div className="rounded-lg bg-emerald-500/10 p-2">
                                    <MapPin className="h-4 w-4 text-emerald-500" />
                                </div>

                                <span className="text-sm leading-6">
                                    Noida,
                                    <br />
                                    Uttar Pradesh,
                                    <br />
                                    India
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-slate-800 py-5 sm:py-6">
                    <div className="flex flex-col items-center justify-between gap-3 text-center text-sm text-slate-500 md:flex-row md:text-left">
                        <p>
                            © {new Date().getFullYear()} Find Your Shelter. All
                            rights reserved.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Link
                                href="/privacy"
                                className="transition-colors hover:text-emerald-400"
                            >
                                Privacy Policy
                            </Link>

                            <Link
                                href="/terms"
                                className="transition-colors hover:text-emerald-400"
                            >
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
}