import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Star, Users, Clock, Shield, Home } from 'lucide-react';
// import { getServiceBySlug } from '@/data/services';
import { Button } from '@/components/ui/button';
import QuoteForm from './QuoteForm';
import Footer from './Footer';
import Navbar from './Navbar';
// import QuoteForm from '@/components/QuoteForm';

const ServiceDetails = () => {
    // const { slug } = useParams();
    const service = { icon: Home, title: "Home Loans", description: "Realize your dream of owning a home with our competitive interest rates and seamless approval process.", features: ["Loan amount up to ₹5 Cr", "Attractive Interest Rates", "Quick & Easy Processing"], buttonText: "Explore Home Loans" };


    if (!service) {
        return <Navigate to="/404" replace />;
    }

    const Icon = service.icon;

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${service.image})`,
                    }}
                />

                {/* Content */}
                <div className="relative z-10 w-full">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="max-w-3xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <Icon className="w-8 h-8 text-primary-foreground" />
                                </div>
                                <div>
                                    <span className="text-primary-foreground/80 text-sm uppercase tracking-wide font-medium">
                                        {service.category === 'loans' ? 'Loan Services' : 'Insurance Services'}
                                    </span>
                                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground">
                                        {service.title}
                                    </h1>
                                </div>
                            </div>

                            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
                                {service.description}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" variant="cta" className="text-lg px-8">
                                    Apply Now
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                                <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 border-white/20 text-white hover:bg-white/20">
                                    Learn More
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gradient-to-br from-background to-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                            Key Features & Benefits
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Discover why thousands of customers choose our {service.title.toLowerCase()} for their financial needs
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {service.features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="flex items-start gap-4 p-6 bg-card rounded-lg border border-border shadow-soft hover:shadow-medium transition-all duration-300"
                            >
                                <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <CheckCircle2 className="w-5 h-5 text-success" />
                                </div>
                                <span className="text-foreground font-medium">{feature}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Stats Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 bg-card rounded-2xl p-8 border border-border"
                    >
                        <div className="text-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-6 h-6 text-primary" />
                            </div>
                            <div className="text-3xl font-bold text-foreground mb-2">50,000+</div>
                            <div className="text-muted-foreground">Happy Customers</div>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-6 h-6 text-primary" />
                            </div>
                            <div className="text-3xl font-bold text-foreground mb-2">24 Hours</div>
                            <div className="text-muted-foreground">Quick Processing</div>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="w-6 h-6 text-primary" />
                            </div>
                            <div className="text-3xl font-bold text-foreground mb-2">4.8/5</div>
                            <div className="text-muted-foreground">Customer Rating</div>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-6 h-6 text-primary" />
                            </div>
                            <div className="text-3xl font-bold text-foreground mb-2">100%</div>
                            <div className="text-muted-foreground">Secure Process</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Quote Form Section */}
            <QuoteForm serviceName={service.title} serviceCategory={service.category} />
            <Footer />
        </div>
    );
};

export default ServiceDetails;