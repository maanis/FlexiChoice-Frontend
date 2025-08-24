// import { Navbar1 } from '@/components/ui/navbar1';
// import HowItWorksSection from '@/components/HowItWorksSection';
// import WhyChooseUsSection from '@/components/WhyChooseUsSection';
// import ContactSection from '@/components/ContactSection';
// import Footer from '@/components/Footer';
// import HeroSection from '@/components/HeroSection';
// import NavbarTop from '../components/Navbar';
// import { Navbar1 } from '../components/ui/navbar1';

import { Navbar1 } from "../../../components/ui/navbar1";
import ContactSection from "../components/ContactSection";
import ServicesSection from '../components/ServicesSection';
import HeroSection from "../components/HeroSection";
import HowItWorksSection from "../components/HowItWorksSection";
import WhyChooseUsSection from "../components/WhyChooseUsSection";
import Footer from "../components/Footer";
import { useState } from "react";
import Navbar from "../components/Navbar";

const LandingPage = () => {
    const [activeTab, setActiveTab] = useState('loans');
    return (
        <div className="min-h-screen bg-background">
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
            <HeroSection />
            <div id="services-section">
                <ServicesSection activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            <div id="how-it-works-section">
                <HowItWorksSection />
            </div>
            <div id="about-section">
                <WhyChooseUsSection />
            </div>
            <div id="contact-section">
                <ContactSection />
            </div>
            <Footer />

        </div>
    );
};

export default LandingPage;
