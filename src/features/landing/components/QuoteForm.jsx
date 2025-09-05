import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Textarea from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Briefcase, Send, User } from 'lucide-react';
import { toast } from 'sonner';
import { saveQuoteRequest } from '../../../services/firestoreService';

const QuoteForm = ({ serviceName }) => {
    const [occupation, setOccupation] = useState('salaried');
    const [sameAsPermAddress, setSameAsPermAddress] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        designation: '',
        occupation: occupation,
        serviceName: serviceName,
        company: '',
        monthlyIncome: '',
        experience: '',
        businessName: '',
        businessType: '',
        annualIncome: '',
        businessAge: '',
        permanentAddress: '',
        communicationAddress: '',
        message: '',
    });

    const [errors, setErrors] = useState({});

    // Sync addresses
    useEffect(() => {
        if (sameAsPermAddress) {
            setFormData((prev) => ({
                ...prev,
                communicationAddress: prev.permanentAddress,
            }));
        } else {
            setFormData((prev) => ({ ...prev, communicationAddress: '' }));
        }
    }, [sameAsPermAddress, formData.permanentAddress]);

    // Reset irrelevant fields on occupation change
    useEffect(() => {
        if (occupation === 'salaried') {
            setFormData((prev) => ({
                ...prev,
                businessName: '',
                businessType: '',
                annualIncome: '',
                businessAge: '',
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                company: '',
                monthlyIncome: '',
                experience: '',
                designation: '',
            }));
        }
    }, [occupation]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.fullName || formData.fullName.length < 2) {
            newErrors.fullName = 'Full name must be at least 2 characters';
        }
        if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.phone || !/^[0-9]{10}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }
        if (occupation === 'salaried' && (!formData.designation || formData.designation.length < 2)) {
            newErrors.designation = 'Designation is required for salaried employees';
        }
        if (occupation === 'self-employed' && !formData.businessType) {
            newErrors.businessType = 'Business type is required for self-employed applicants';
        }
        // if (!formData.permanentAddress || formData.permanentAddress.length < 10) {
        //     newErrors.permanentAddress = 'Permanent address must be at least 10 characters';
        // }
        if (!formData.message || formData.message.length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }
        return newErrors;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setIsSubmitting(true);

        try {
            console.log('Form Data:', formData);
            await saveQuoteRequest(formData);
            toast.success('Quote request submitted successfully!', {
                description: 'Our team will review your application and get back to you within 24 hours.',
            });
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                designation: '',
                company: '',
                monthlyIncome: '',
                experience: '',
                businessName: '',
                businessType: '',
                annualIncome: '',
                businessAge: '',
                permanentAddress: '',
                communicationAddress: '',
                message: '',
            });
        } catch (error) {
            toast.error('Quote request failed. Please try again.', {
                description: 'There was an issue submitting your request. Check your network and try again.',
            });
            console.error('Submission Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-24 bg-white text-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
                        Get Your {serviceName} Quote
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                        Fill out the form below and our experts will provide you with a personalized quote.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Card className="rounded-3xl p-8 bg-gray-50 border border-gray-200 shadow-xl">
                        <CardContent>
                            <form onSubmit={onSubmit} className="space-y-12">
                                {/* Personal Information */}
                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-4">
                                        <User className="inline-block mr-2 w-5 h-5 text-gray-600" />
                                        Personal Information
                                    </h3>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        <div className="space-y-2">
                                            <Label htmlFor="fullName">Full Name</Label>
                                            <Input id="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" />
                                            {errors.fullName && <p className="text-sm text-red-600">{errors.fullName}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" />
                                            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input id="phone" value={formData.phone} onChange={handleChange} placeholder="10-digit mobile number" />
                                            {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                                        </div>
                                        {occupation === 'salaried' && (
                                            <div className="space-y-2 lg:col-span-3">
                                                <Label htmlFor="designation">Designation</Label>
                                                <Input id="designation" value={formData.designation} onChange={handleChange} placeholder="Your job title" />
                                                {errors.designation && <p className="text-sm text-red-600">{errors.designation}</p>}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Occupation */}
                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-4">
                                        <Briefcase className="inline-block mr-2 w-5 h-5 text-gray-600" />
                                        Occupation Details
                                    </h3>
                                    <Tabs value={occupation} onValueChange={setOccupation}>
                                        <TabsList className="grid grid-cols-2 bg-gray-200 rounded-xl p-1">
                                            <TabsTrigger value="salaried">Salaried</TabsTrigger>
                                            <TabsTrigger value="self-employed">Self Employed</TabsTrigger>
                                        </TabsList>

                                        {/* Salaried */}
                                        <TabsContent value="salaried" className="mt-8">
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="grid md:grid-cols-2 gap-8">
                                                <div>
                                                    <Label htmlFor="company">Company Name</Label>
                                                    <Input id="company" value={formData.company} onChange={handleChange} placeholder="Your company name" />
                                                </div>
                                                <div>
                                                    <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                                                    <Input id="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} placeholder="Your monthly salary" />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <Label htmlFor="experience">Work Experience (Years)</Label>
                                                    <Input id="experience" value={formData.experience} onChange={handleChange} placeholder="Years of experience" />
                                                </div>
                                            </motion.div>
                                        </TabsContent>

                                        {/* Self-Employed */}
                                        <TabsContent value="self-employed" className="mt-8">
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="grid md:grid-cols-2 gap-8">
                                                <div>
                                                    <Label htmlFor="businessName">Business Name</Label>
                                                    <Input id="businessName" value={formData.businessName} onChange={handleChange} placeholder="Your business name" />
                                                </div>
                                                <div>
                                                    <Label htmlFor="businessType">Business Type</Label>
                                                    <select id="businessType" value={formData.businessType} onChange={handleChange} className="h-12 w-full border rounded-md px-3">
                                                        <option value="">Select Business Type</option>
                                                        <option value="sole-proprietorship">Sole Proprietorship</option>
                                                        <option value="partnership">Partnership</option>
                                                        <option value="llp">LLP</option>
                                                        <option value="pvt-ltd">Private Limited</option>
                                                        <option value="public-ltd">Public Limited</option>
                                                        <option value="startup">Startup</option>
                                                        <option value="others">Others</option>
                                                    </select>
                                                    {errors.businessType && <p className="text-sm text-red-600">{errors.businessType}</p>}
                                                </div>
                                                <div>
                                                    <Label htmlFor="annualIncome">Annual Income (₹)</Label>
                                                    <Input id="annualIncome" value={formData.annualIncome} onChange={handleChange} placeholder="Your annual income" />
                                                </div>
                                                <div>
                                                    <Label htmlFor="businessAge">Business Age (Years)</Label>
                                                    <Input id="businessAge" value={formData.businessAge} onChange={handleChange} placeholder="Years in business" />
                                                </div>
                                            </motion.div>
                                        </TabsContent>
                                    </Tabs>
                                </div>

                                {/* Addresses */}
                                {/* <div className="space-y-6">
                                    <Label htmlFor="permanentAddress">Permanent Address</Label>
                                    <Textarea id="permanentAddress" value={formData.permanentAddress} onChange={handleChange} placeholder="Your permanent address" />
                                    {errors.permanentAddress && <p className="text-sm text-red-600">{errors.permanentAddress}</p>}
                                    <div className="flex items-center gap-2 mt-2">
                                        <input type="checkbox" checked={sameAsPermAddress} onChange={(e) => setSameAsPermAddress(e.target.checked)} />
                                        <span className="text-sm text-gray-700">Same as permanent address</span>
                                    </div>
                                    <Label htmlFor="communicationAddress">Communication Address</Label>
                                    <Textarea id="communicationAddress" value={formData.communicationAddress} onChange={handleChange} placeholder="Your communication address" />
                                </div> */}

                                {/* Message */}
                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-4">
                                        <Mail className="inline-block mr-2 w-5 h-5 text-gray-600" />
                                        Additional Information
                                    </h3>
                                    <div>
                                        <Label htmlFor="message">Message / Requirements</Label>
                                        <Textarea id="message" value={formData.message} onChange={handleChange} placeholder="Please provide details..." />
                                        {errors.message && <p className="text-sm text-red-600">{errors.message}</p>}
                                    </div>
                                </div>

                                {/* Submit */}
                                <div className="pt-6">
                                    <Button type="submit" size="lg" disabled={isSubmitting} className="w-full h-14">
                                        {isSubmitting ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                Submitting Request...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <Send className="w-5 h-5" />
                                                Submit Quote Request
                                            </div>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
};

export default QuoteForm;
