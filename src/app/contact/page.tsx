import type { Metadata } from "next";



import InquiryForm from "@/components/inquiry/InquiryForm";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactFAQ from "@/components/contact/ContactFAQ";
import ContactCTA from "@/components/contact/ContactCTA";

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

            {/* Contact Information */}
            <ContactInfo
                phone="+91 98765 43210"
                email="support@findyourshelter.com"
            />

            {/* Contact Form */}
            <section
                id="contact-form"
                className="py-20"
            >
                <div className="container mx-auto max-w-7xl px-6">

                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                            Send Us a Message
                        </span>

                        <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                            We'd Love to Hear From You
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-muted-foreground">
                            Whether you're searching for your next rental home,
                            have questions about our listings, or simply need
                            assistance, fill out the form below and our team
                            will get back to you as soon as possible.
                        </p>
                    </div>

                    {/* No propertyId on Contact page */}
                    <InquiryForm />

                </div>
            </section>

            {/* FAQ */}
            <ContactFAQ />

            {/* CTA */}
            <ContactCTA />

        </main>
    );
}