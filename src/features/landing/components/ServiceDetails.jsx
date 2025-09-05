import React, { useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Star, Users, Clock, Shield, Home, Briefcase, Car, Heart, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuoteForm from './QuoteForm';
import Footer from './Footer';
import Navbar from './Navbar';
import { useServiceById } from '../../../hooks/useFirseStoreServices';
import { Skeleton } from '@/components/ui/skeleton';
import * as Icons from "lucide-react";

// Dynamic Icon mapping
const serviceIcons = {
    'Home': Home,
    'Car': Car,
    'Health': Heart,
    'Business': Briefcase,
    'Personal': DollarSign,
};

const ServiceDetails = () => {
    const { serviceType, id } = useParams();
    const { data: service, isLoading, isError } = useServiceById(serviceType === 'loan' ? 'loansServices' : 'insuranceServices', id);
    const quoteFormRef = useRef(null);
    const whyServiceRef = useRef(null);

    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // Handle loading and error states
    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <section className="relative min-h-[60vh] flex items-center p-8 overflow-hidden">
                    <div className="relative z-10 w-full max-w-7xl mx-auto">
                        <Skeleton className="h-20 w-3/4 mb-4" />
                        <Skeleton className="h-8 w-1/2 mb-8" />
                        <Skeleton className="h-12 w-48" />
                    </div>
                </section>
                <div className="p-8">
                    <Skeleton className="h-64 w-full" />
                </div>
            </div>
        );
    }

    // if (isError || !service) {
    //     return <Navigate to="/404" replace />;
    // }

    const Icon = Icons[service?.icon] || Icons.Home;
    console.log(service.icon)

    // Additional dummy data for the new section
    const testimonials = [
        { quote: "I got my home loan approved in record time. The process was completely seamless and transparent. Highly recommended!", author: "Priya Sharma" },
        { quote: "The customer service was exceptional. They guided me through every step and helped me find the best insurance plan for my family.", author: "Rajesh Kumar" },
        { quote: "A truly hassle-free experience. I was able to get my business loan without any complicated paperwork or long waits.", author: "Anjali Singh" },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            {/* Hero Section */}
            <section className="relative min-h-[60vh] md:min-h-[75vh] flex items-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url(${service?.banner || 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd'})`,
                        // backgroundAttachment: 'fixed'
                    }}
                />

                <div className="relative z-10 w-full py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="max-w-3xl text-white"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <motion.div
                                    className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    <Icon className="w-8 h-8 text-white" />
                                </motion.div>
                                <div>
                                    <span className="text-sm uppercase tracking-wide font-medium text-white/80">
                                        {serviceType === 'loan' ? 'Loan Services' : 'Insurance Services'}
                                    </span>
                                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mt-1">
                                        {service?.title}
                                    </h1>
                                </div>
                            </div>
                            <p className="text-xl sm:text-2xl text-white/90 mb-8 font-light leading-relaxed">
                                {service?.description || "Empower your financial journey with our tailored solutions. We provide a range of flexible and secure options designed to meet your unique needs and future aspirations."}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button onClick={() => scrollToSection(quoteFormRef)} size="lg" className="text-lg px-8 py-6 rounded-full font-semibold transition-all duration-300 transform hover:scale-105" variant="default">
                                    Apply Now
                                    <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                </Button>
                                <Button size="lg" onClick={() => scrollToSection(whyServiceRef)} variant="outline" className="text-lg px-8 py-6 rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                                    Learn More
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Main Content Sections */}
            <section ref={whyServiceRef} className="relative w-full bg-gradient-to-br from-slate-50 to-blue-100 py-24 sm:py-24 overflow-hidden">
                {/* Animated background blobs for light mode */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-20 -right-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="mx-auto max-w-5xl">
                        {/* The main card with light glassmorphism */}
                        <motion.div
                            className="relative p-8 sm:p-12 rounded-3xl bg-white/70 backdrop-blur-xl border border-black/5 shadow-2xl shadow-blue-200/50"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="text-center">
                                <h2 className="text-4xl sm:text-5xl font-extrabold mb-5 text-slate-900 leading-tight tracking-tight">
                                    Why Our Service is a <br className="hidden sm:block" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                                        Game-Changer
                                    </span>
                                </h2>
                                <p className="text-lg text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                                    We seamlessly blend cutting-edge technology with an unwavering focus on customer satisfaction, delivering a truly unparalleled and highly efficient experience.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {(service?.features || []).map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-center gap-4 p-5 rounded-xl bg-white border border-slate-200/80 hover:border-indigo-400/80 text-nowrap hover:bg-white transition-all duration-300 transform hover:-translate-y-1"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.8 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <div className="flex-shrink-0 w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                                        </div>
                                        <span className="text-slate-800 font-medium">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* CSS for the blob animation */}
                <style jsx>{`
                @keyframes animate-blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob { animation: animate-blob 8s infinite linear; }
                .animation-delay-2000 { animation-delay: -2s; }
                .animation-delay-4000 { animation-delay: -4s; }
            `}</style>
            </section>


            {/* Testimonials Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Our Customers Say</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Don't just take our word for it. See what our happy customers have to say about their experience with us.
                        </p>
                    </motion.div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                className="bg-card p-8 rounded-xl border border-border shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500 mb-4" />
                                <p className="italic text-lg text-foreground/90 mb-4">"{testimonial.quote}"</p>
                                <p className="font-semibold text-primary">{testimonial.author}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quote Form Section */}
            <div ref={quoteFormRef}>
                <QuoteForm serviceName={service?.title} serviceCategory={serviceType} />
            </div>
            <Footer />
        </div>
    );
};

export default ServiceDetails;