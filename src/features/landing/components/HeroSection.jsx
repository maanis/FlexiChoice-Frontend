import { Button } from '@/components/ui/button';
import { Shield, TrendingUp, HeartPulse, Home, Briefcase } from 'lucide-react';
import heroImage from '@/assets/hero-financial.jpg';
import { AuroraBackground } from '../../../components/ui/aurora-background';
// import { AuroraBackground } from './ui/aurora-background';
// import { AuroraBackground } from '@/components/ui/aurora-background';

const HeroSection = () => (
    <AuroraBackground>
        <section className="relative max-md:pt-64 min-h-screen text-black w-full flex items-center justify-center  overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                {/* <img
          src={heroImage}
          alt="Financial Services"
          className="w-full h-full object-cover opacity-20"
        /> */}
                <div className="absolute inset-0  opacity-90" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side: Headline & CTA */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold  mb-6 dark:">
                            Welcome to Flexi Choice
                        </h1>
                        <p className="text-xl  mb-8 max-w-xl dark:/80">
                            Your one-stop platform for <span className="font-semibold text-blue-600 dark:text-secondary">Home, Gold, Personal & Business Loans</span> and <span className="font-semibold text-blue-600 dark:text-secondary">Health, Life & Term Insurance</span>. Fast approvals, flexible options, and trusted protection for every need.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start mb-8">
                            <Button variant="cta" size="xl" className="w-full sm:w-auto">
                                Apply for Loan
                            </Button>
                            <Button variant="outline" size="xl" className="w-full shadow-md sm:w-auto border-primary-foreground/30  dark: hover:bg-background/20">
                                Get Insured
                            </Button>
                        </div>
                    </div>

                    {/* Right Side: Visual Representation */}
                    <div className="flex flex-col gap-6 items-center justify-center">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-background/10 dark:bg-background/20 shadow-md backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/10 flex flex-col items-center">
                                <Home className="w-8 h-8 text-blue-600 dark:text-secondary mb-2" />
                                <span className="font-semibold  dark:">Home Loans</span>
                            </div>
                            <div className="bg-background/10 dark:bg-background/20 shadow-md backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/10 flex flex-col items-center">
                                <Briefcase className="w-8 h-8 text-blue-600 dark:text-secondary mb-2" />
                                <span className="font-semibold  dark:">Business Loans</span>
                            </div>
                            <div className="bg-background/10 dark:bg-background/20 shadow-md backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/10 flex flex-col items-center">
                                <HeartPulse className="w-8 h-8 text-blue-600 dark:text-secondary mb-2" />
                                <span className="font-semibold  dark:">Health Insurance</span>
                            </div>
                            <div className="bg-background/10 dark:bg-background/20 shadow-md backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/10 flex flex-col items-center">
                                <Shield className="w-8 h-8 text-blue-600 dark:text-secondary mb-2" />
                                <span className="font-semibold  dark:">Life & Term Insurance</span>
                            </div>
                        </div>
                        <div className="mt-6 text-sm text-muted-foreground text-center max-w-xs">
                            Trusted by 50,000+ customers. 24/7 support. 99% approval rate.
                        </div>
                    </div>
                </div>
            </div>
            {/* Decorative Gradient at Bottom */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent" />
        </section>
    </AuroraBackground>
);

export default HeroSection;