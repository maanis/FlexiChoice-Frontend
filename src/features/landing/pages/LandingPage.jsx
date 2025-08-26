import React, { useState, lazy, Suspense } from "react";

// Critical components load immediately
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

// Lazy load other components
const ServicesSection = lazy(() => import('../components/ServicesSection'));
const HowItWorksSection = lazy(() => import("../components/HowItWorksSection"));
const WhyChooseUsSection = lazy(() => import("../components/WhyChooseUsSection"));
const ContactSection = lazy(() => import("../components/ContactSection"));
const Footer = lazy(() => import("../components/Footer"));

// Simple loading spinner
const Loading = () => (
    <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
    </div>
);

const LandingPage = () => {
    const [activeTab, setActiveTab] = useState('loans');

    return (
        <div className="min-h-screen bg-background">
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
            <HeroSection />

            <div id="services-section">
                <Suspense fallback={<Loading />}>
                    <ServicesSection activeTab={activeTab} setActiveTab={setActiveTab} />
                </Suspense>
            </div>

            <div id="how-it-works-section">
                <Suspense fallback={<Loading />}>
                    <HowItWorksSection />
                </Suspense>
            </div>

            <div id="about-section">
                <Suspense fallback={<Loading />}>
                    <WhyChooseUsSection />
                </Suspense>
            </div>

            <div id="contact-section">
                <Suspense fallback={<Loading />}>
                    <ContactSection />
                </Suspense>
            </div>

            <Suspense fallback={<Loading />}>
                <Footer />
            </Suspense>
        </div>
    );
};

export default LandingPage;