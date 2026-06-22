"use client";

import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircleQuestion } from "lucide-react";

const faqs = [
    {
        question: "How soon will I receive a response?",
        answer:
            "We usually respond to all inquiries within 24 hours. During weekends or holidays, responses may take slightly longer.",
    },
    {
        question: "Can I schedule a property visit?",
        answer:
            "Yes. Once you submit your inquiry, our team will contact you to arrange a convenient date and time for your property visit.",
    },
    {
        question: "Do I need to pay before visiting a property?",
        answer:
            "No. Property visits can be scheduled after contacting our team. Any rental or booking charges will only be discussed after you decide to proceed.",
    },
    {
        question: "Can I ask about multiple properties?",
        answer:
            "Absolutely. You can mention multiple properties in your message, and we'll help you compare them and answer any questions you have.",
    },
    {
        question: "How can I know if a property is still available?",
        answer:
            "Our listings are updated regularly. If a property is available, we'll confirm its current status when we respond to your inquiry.",
    },
];

export default function ContactFAQ() {
    return (
        <section className="bg-muted/30 py-14 sm:py-16 lg:py-24">
            <div className="container mx-auto max-w-4xl px-4 sm:px-6">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 text-xs font-semibold text-primary sm:px-4 sm:text-sm">
                        <MessageCircleQuestion className="h-4 w-4" />
                        Frequently Asked Questions
                    </span>

                    <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                        Have Questions?
                    </h2>

                    <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                        Here are answers to some of the questions we receive
                        most often.
                    </p>
                </motion.div>

                {/* FAQ */}
                <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="mt-10 rounded-2xl border bg-card p-2 shadow-sm sm:mt-14 sm:rounded-3xl sm:p-3"
                >
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full"
                    >
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="px-4 sm:px-6"
                            >
                                <AccordionTrigger className="py-5 text-left text-base font-semibold leading-6 hover:no-underline sm:py-6 sm:text-lg">
                                    {faq.question}
                                </AccordionTrigger>

                                <AccordionContent className="pb-5 text-sm leading-7 text-muted-foreground sm:pb-6 sm:text-base">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
}