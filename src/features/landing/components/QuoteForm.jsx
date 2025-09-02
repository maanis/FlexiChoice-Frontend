import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Textarea from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Phone, Mail, MapPin, Briefcase, Send } from 'lucide-react';
import { toast } from 'sonner';
// import { useToast } from '@/hooks/use-toast';

const quoteSchema = z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().regex(/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number'),
    designation: z.string().min(2, 'Designation is required'),
    permanentAddress: z.string().min(10, 'Permanent address must be at least 10 characters'),
    communicationAddress: z.string().optional(),
    occupation: z.enum(['salaried', 'self-employed']),
    // Salaried fields
    company: z.string().optional(),
    monthlyIncome: z.string().optional(),
    experience: z.string().optional(),
    // Self-employed fields  
    businessName: z.string().optional(),
    businessType: z.string().optional(),
    annualIncome: z.string().optional(),
    businessAge: z.string().optional(),
    message: z.string().min(10, 'Please provide details about your requirements'),
    serviceName: z.string(),
});

const QuoteForm = ({ serviceName, serviceCategory }) => {
    const [sameAsPermAddress, setSameAsPermAddress] = useState(false);
    const [occupation, setOccupation] = useState('salaried');
    // const { toast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        watch,
    } = useForm({
        resolver: zodResolver(quoteSchema),
        defaultValues: {
            serviceName: serviceName,
            occupation: 'salaried',
        },
    });

    const permanentAddress = watch('permanentAddress');

    React.useEffect(() => {
        if (sameAsPermAddress) {
            setValue('communicationAddress', permanentAddress);
        } else {
            setValue('communicationAddress', '');
        }
    }, [sameAsPermAddress, permanentAddress, setValue]);

    const onSubmit = async (data) => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            toast.success('Quote request submitted successfully!');

            console.log('Quote submission:', data);
        } catch (error) {
            toast.error('Quote request submission failed.');
        }
    };

    return (
        <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        Get Your {serviceName} Quote
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Fill out the form below and our experts will provide you with a personalized quote within 24 hours
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
                        <CardHeader className="text-center pb-8">
                            <CardTitle className="text-2xl text-foreground">
                                {serviceCategory === 'loans' ? 'Loan Application Form' : 'Insurance Quote Request'}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                {/* Personal Information */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                                        Personal Information
                                    </h3>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="fullName" className="flex items-center gap-2">
                                                <span>Full Name</span>
                                                <span className="text-destructive">*</span>
                                            </Label>
                                            <Input
                                                id="fullName"
                                                {...register('fullName')}
                                                placeholder="Enter your full name"
                                                className="h-12"
                                            />
                                            {errors.fullName && (
                                                <p className="text-sm text-destructive">{errors.fullName.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="flex items-center gap-2">
                                                <Mail className="w-4 h-4" />
                                                <span>Email</span>
                                                <span className="text-destructive">*</span>
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                {...register('email')}
                                                placeholder="your.email@example.com"
                                                className="h-12"
                                            />
                                            {errors.email && (
                                                <p className="text-sm text-destructive">{errors.email.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="flex items-center gap-2">
                                                <Phone className="w-4 h-4" />
                                                <span>Phone Number</span>
                                                <span className="text-destructive">*</span>
                                            </Label>
                                            <Input
                                                id="phone"
                                                {...register('phone')}
                                                placeholder="10-digit mobile number"
                                                className="h-12"
                                            />
                                            {errors.phone && (
                                                <p className="text-sm text-destructive">{errors.phone.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="designation" className="flex items-center gap-2">
                                                <Briefcase className="w-4 h-4" />
                                                <span>Designation</span>
                                                <span className="text-destructive">*</span>
                                            </Label>
                                            <Input
                                                id="designation"
                                                {...register('designation')}
                                                placeholder="Your job title/designation"
                                                className="h-12"
                                            />
                                            {errors.designation && (
                                                <p className="text-sm text-destructive">{errors.designation.message}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Address Information */}
                                {/* <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                                        Address Information
                                    </h3>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="permanentAddress" className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                <span>Permanent Address</span>
                                                <span className="text-destructive">*</span>
                                            </Label>
                                            <Textarea
                                                id="permanentAddress"
                                                {...register('permanentAddress')}
                                                placeholder="Enter your permanent address"
                                                className="min-h-[100px]"
                                            />
                                            {errors.permanentAddress && (
                                                <p className="text-sm text-destructive">{errors.permanentAddress.message}</p>
                                            )}
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="sameAddress"
                                                checked={sameAsPermAddress}
                                                onCheckedChange={setSameAsPermAddress}
                                            />
                                            <Label htmlFor="sameAddress">
                                                Communication address is same as permanent address
                                            </Label>
                                        </div>

                                        {!sameAsPermAddress && (
                                            <div className="space-y-2">
                                                <Label htmlFor="communicationAddress">
                                                    Communication Address
                                                </Label>
                                                <Textarea
                                                    id="communicationAddress"
                                                    {...register('communicationAddress')}
                                                    placeholder="Enter your communication address"
                                                    className="min-h-[100px]"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div> */}

                                {/* Occupation Information */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                                        Occupation Details
                                    </h3>

                                    <Tabs
                                        value={occupation}
                                        onValueChange={(value) => {
                                            setOccupation(value);
                                            setValue('occupation', value);
                                        }}
                                        className="w-full"
                                    >
                                        <TabsList className="grid w-full grid-cols-2">
                                            <TabsTrigger value="salaried">Salaried</TabsTrigger>
                                            <TabsTrigger value="self-employed">Self Employed</TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="salaried" className="space-y-6 mt-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="company">Company Name</Label>
                                                    <Input
                                                        id="company"
                                                        {...register('company')}
                                                        placeholder="Your company name"
                                                        className="h-12"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                                                    <Input
                                                        id="monthlyIncome"
                                                        {...register('monthlyIncome')}
                                                        placeholder="Your monthly salary"
                                                        className="h-12"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="experience">Work Experience</Label>
                                                    <Input
                                                        id="experience"
                                                        {...register('experience')}
                                                        placeholder="Years of experience"
                                                        className="h-12"
                                                    />
                                                </div>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="self-employed" className="space-y-6 mt-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="businessName">Business Name</Label>
                                                    <Input
                                                        id="businessName"
                                                        {...register('businessName')}
                                                        placeholder="Your business name"
                                                        className="h-12"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="businessType">Business Type</Label>
                                                    <Input
                                                        id="businessType"
                                                        {...register('businessType')}
                                                        placeholder="Type of business"
                                                        className="h-12"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="annualIncome">Annual Income (₹)</Label>
                                                    <Input
                                                        id="annualIncome"
                                                        {...register('annualIncome')}
                                                        placeholder="Your annual income"
                                                        className="h-12"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="businessAge">Business Age</Label>
                                                    <Input
                                                        id="businessAge"
                                                        {...register('businessAge')}
                                                        placeholder="Years in business"
                                                        className="h-12"
                                                    />
                                                </div>
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </div>

                                {/* Message */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                                        Additional Information
                                    </h3>

                                    <div className="space-y-2">
                                        <Label htmlFor="message" className="flex items-center gap-2">
                                            <span>Message / Requirements</span>
                                            <span className="text-destructive">*</span>
                                        </Label>
                                        <Textarea
                                            id="message"
                                            {...register('message')}
                                            placeholder="Please provide details about your specific requirements, loan amount needed, or any questions you have..."
                                            className="min-h-[120px]"
                                        />
                                        {errors.message && (
                                            <p className="text-sm text-destructive">{errors.message.message}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-6">
                                    <Button
                                        type="submit"
                                        size="lg"
                                        disabled={isSubmitting}
                                        className="w-full h-14 text-lg bg-gradient-primary hover:scale-105 transition-all duration-300 shadow-primary"
                                    >
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