// src/components/layout/Footer.tsx
import Link from "next/link";
import {
    Home,
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
                <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
                    {/* Column 1 */}
                    <div>
                        <Logo
                            className="mb-5"
                            textClassName="text-white"
                        />

                        <p className="mb-6 text-sm leading-7 text-slate-400">
                            Find Your Shelter helps you discover verified rental
                            properties including flats, houses, and villas at
                            affordable prices.
                        </p>

                        <div className="flex items-center gap-3">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="rounded-lg bg-slate-900 p-2 transition hover:bg-emerald-600 hover:text-white"
                                >
                                    <Icon className="h-5 w-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h3 className="mb-5 text-lg font-semibold text-white">
                            Quick Links
                        </h3>

                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="transition hover:text-emerald-400"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h3 className="mb-5 text-lg font-semibold text-white">
                            Property Types
                        </h3>

                        <ul className="space-y-3">
                            {propertyTypes.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="transition hover:text-emerald-400"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4 */}
                    <div>
                        <h3 className="mb-5 text-lg font-semibold text-white">
                            Contact
                        </h3>

                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Phone className="mt-1 h-5 w-5 text-emerald-500" />
                                <span>+91 98765 43210</span>
                            </li>

                            <li className="flex items-start gap-3">
                                <Mail className="mt-1 h-5 w-5 text-emerald-500" />
                                <span>support@findyourshelter.com</span>
                            </li>

                            <li className="flex items-start gap-3">
                                <MapPin className="mt-1 h-5 w-5 text-emerald-500" />
                                <span>Lucknow, Uttar Pradesh, India</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
                    © {new Date().getFullYear()} Find Your Shelter. All Rights
                    Reserved.
                </div>
            </Container>
        </footer>
    );
}