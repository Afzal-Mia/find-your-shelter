// src/app/about/page.tsx

import AboutHero from "@/components/about/AboutHero";
import CompanyStory from "@/components/about/CompanyStory";
import MissionVision from "@/components/about/MissionVision";
import WorkProcess from "@/components/about/WorkProcess";
import CTASection from "@/components/home/CTASection";

export const metadata = {
    title: "About Us | Find Your Shelter",
    description:
        "Learn more about Find Your Shelter, our mission, vision, and commitment to helping people discover verified rental properties with ease.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background">
            <AboutHero />

            <CompanyStory />

            <MissionVision />
            <WorkProcess />
            <CTASection />


        </main>
    );
}