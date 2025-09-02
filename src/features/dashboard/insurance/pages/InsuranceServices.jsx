import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
// import { ServiceCard } from '@/components/dashboard/ServiceCard';
// import { DeleteDialog } from '@/components/dashboard/DeleteDialog';
import { toast } from 'sonner';
import { ServiceCard } from '../../components/ServiceCard';
import { DeleteDialog } from '../../components/DeleteDialog';
import Sidebar from '../../../../components/Sidebar';
import { useInsurance } from '../../../../hooks/useFirseStoreServices';
// import { useToast } from '@/hooks/use-toast';

const initialInsuranceServices = [
    { id: 1, icon: "Shield", title: "Life Insurance", description: "Build a financial corpus for your future goals while ensuring life protection with our savings plans.", features: ["Insurance + Investment", "Guaranteed Returns", "Wealth Creation for Goals"], buttonText: "Plan Your Life Goals" },
    { id: 2, icon: "Heart", title: "Health Insurance", description: "Protect yourself and your family with comprehensive health coverage for medical emergencies.", features: ["Cashless Hospitalization", "Covers Pre & Post Hospitalization", "Tax Benefits under 80D"], buttonText: "Secure Your Health" },
    { id: 3, icon: "Clock", title: "Term Life Insurance", description: "Ensure your family's financial security in your absence with a high-coverage, low-premium term plan.", features: ["Large Cover at Low Premium", "Critical Illness Rider", "Multiple Payout Options"], buttonText: "Protect Your Family" },
    { id: 4, icon: "Car", title: "Vehicle Insurance", description: "Get complete protection for your car or bike against accidents, theft, and other damages.", features: ["Zero Depreciation Cover", "24/7 Roadside Assistance", "Quick & Digital Claims"], buttonText: "Insure Your Vehicle" },
    { id: 5, icon: "Plane", title: "Travel Insurance", description: "Travel the world worry-free with our plans covering medical emergencies, trip cancellations, and more.", features: ["Global Coverage", "Cashless Medical Treatment", "Baggage & Flight Delay Cover"], buttonText: "Travel Fearlessly" },
    { id: 6, icon: "Plane", title: "Overseas Insurance", description: "Travel the world worry-free with our plans covering medical emergencies, trip cancellations, and more.", features: ["Global Coverage", "Cashless Medical Treatment", "Baggage & Flight Delay Cover"], buttonText: "Travel Fearlessly" }
];

const InsuranceServices = () => {
    const [services, setServices] = useState(initialInsuranceServices);
    const [deleteDialog, setDeleteDialog] = useState({ open: false, service: null });
    // const { toast } = useToast();
    const { data } = useInsurance()
    console.log(data)

    const handleEdit = (service) => {
        // Navigate to edit page - will be implemented with React Router
        console.log('Edit service:', service);
    };

    const handleDelete = (service) => {
        setDeleteDialog({ open: true, service });
    };

    const confirmDelete = () => {
        if (deleteDialog.service) {
            setServices(prev => prev.filter(s => s.id !== deleteDialog.service.id));
            // toast({
            //     title: "Service deleted",
            //     description: `${deleteDialog.service.title} has been removed.`,
            // });
            toast.success('Service deleted')
            setDeleteDialog({ open: false, service: null });
        }
    };

    return (
        <div className="h-screen flex bg-background">
            <Sidebar />
            <div className="container flex-1 overflow-y-auto mx-auto px-6 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link to="/">
                                <Button variant="ghost" size="sm">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Dashboard
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-4xl font-bold text-foreground">Insurance Services</h1>
                                <p className="text-muted-foreground mt-2">Manage your insurance service offerings</p>
                            </div>
                        </div>
                        <Link to="/insurance/create">
                            <Button className="bg-gradient-primary hover:shadow-glow">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Insurance Service
                            </Button>
                        </Link>
                    </div>

                    {/* Services Grid */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={{
                            hidden: {},
                            show: {
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                        initial="hidden"
                        animate="show"
                    >
                        <AnimatePresence>
                            {services.map((service, index) => (
                                <motion.div
                                    key={service.id}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.8 },
                                        show: { opacity: 1, scale: 1 }
                                    }}
                                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                                >
                                    <ServiceCard
                                        service={service}
                                        index={index}
                                        onEdit={() => handleEdit(service)}
                                        onDelete={() => handleDelete(service)}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </div>

            <DeleteDialog
                open={deleteDialog.open}
                onOpenChange={(open) => setDeleteDialog({ open, service: deleteDialog.service })}
                serviceTitle={deleteDialog.service?.title}
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default InsuranceServices;