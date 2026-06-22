import type { Metadata } from "next";

import InquiryForm from "@/components/inquiry/InquiryForm";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactFAQ from "@/components/contact/ContactFAQ";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
    title: "Contact Us | Find Your Shelter",
    description:
        "Get in touch with Find Your Shelter. Contact us for rental property inquiries, property visits, or any questions about finding your next home.",
};

export default function ContactPage() {
    return (
        <main className="bg-background">
            {/* Hero */}
            <ContactHero />

            {/* Contact Info */}
            <ContactInfo
                phone="+91 98765 43210"
                email="support@findyourshelter.com"
            />

            {/* Contact Form */}
            <section
                id="contact-form"
                className="py-14 sm:py-16 lg:py-24"
            >
                <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                    {/* Heading */}
                    <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
                        <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary sm:text-sm">
                            Send Us a Message
                        </span>

                        <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                            We'd Love to Hear From You
                        </h2>

                        <p className="mt-4 text-base leading-7 text-muted-foreground sm:mt-5 sm:text-lg sm:leading-8">
                            Whether you're searching for your next rental home,
                            have questions about our listings, or simply need
                            assistance, fill out the form below and our team
                            will get back to you as soon as possible.
                        </p>
                    </div>

                    {/* Form */}
                    <div>
                        <InquiryForm />
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <ContactFAQ />

            {/* CTA */}
            <CTASection />
        </main>
    );
}