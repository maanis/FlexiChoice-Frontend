import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
// import { ServiceCard } from '@/components/dashboard/ServiceCard';
// import { DeleteDialog } from '@/components/dashboard/DeleteDialog';
import { useToast } from '@/hooks/use-toast';
import { ServiceCard } from '../../components/ServiceCard';
import { DeleteDialog } from '../../components/DeleteDialog';
import Sidebar from '../../../../components/Sidebar';
import { useLoans } from '../../../../hooks/useFirseStoreServices';
import { ServiceCardSkeleton } from '../../components/ServiceCardSkeleton';
import { deleteLoanRequest } from '../../../../services/firestoreService';

const initialLoanServices = [
    { id: 1, icon: "Home", title: "Home Loans", description: "Realize your dream of owning a home with our competitive interest rates and seamless approval process.", features: ["Loan amount up to ₹5 Cr", "Attractive Interest Rates", "Quick & Easy Processing"], buttonText: "Explore Home Loans" },
    { id: 2, icon: "User", title: "Personal Loans", description: "Address your immediate financial needs with our flexible and collateral-free personal loan options.", features: ["Instant Disbursal", "No Collateral Required", "Flexible Repayment Tenure"], buttonText: "Get a Personal Loan" },
    { id: 3, icon: "Briefcase", title: "Business Loans", description: "Fuel your business ambitions with our tailored financing solutions for expansion, and working capital.", features: ["Working Capital Finance", "Term Loans for Expansion", "Customized Solutions"], buttonText: "Grow Your Business" },
    { id: 4, icon: "Coins", title: "Gold Loans", description: "Get instant cash against your gold jewelry with minimal documentation and secure storage.", features: ["Instant Cash in Minutes", "No Income Proof Needed", "Complete Security for Gold"], buttonText: "Unlock Gold Value" },
    { id: 5, icon: "Building2", title: "Mortgage Loans", description: "Leverage your property's value for significant personal or business needs with our loan against property.", features: ["High Loan-to-Value Ratio", "Extended Repayment Tenure", "Competitive Interest Rates"], buttonText: "Leverage Your Property" },
    { id: 6, icon: "Coins", title: "Private Funding", description: "Get instant cash against your gold jewelry with minimal documentation and secure storage.", features: ["Instant Cash in Minutes", "No Income Proof Needed", "Complete Security for Gold"], buttonText: "Unlock Gold Value" },
];

const LoanServices = () => {
    const { data: loans, isLoading } = useLoans();
    const [services, setServices] = useState([]);
    const [deleteDialog, setDeleteDialog] = useState({ open: false, service: null });
    const { toast } = useToast();


    console.log(loans);
    const navigate = useNavigate()

    const handleEdit = (service) => {
        // Navigate to edit page - will be implemented with React Router
        console.log('Edit service:', service);
        navigate(`/loan/edit/${service.id}`);
    };

    const handleDelete = (service) => {
        setDeleteDialog({ open: true, service });
    };

    const confirmDelete = async () => {
        if (deleteDialog.service) {
            await deleteLoanRequest(deleteDialog.service?.id);
            setServices(prev => prev.filter(s => s.id !== deleteDialog.service.id));
            toast.success(`${deleteDialog.service.title} has been removed.`);
            setDeleteDialog({ open: false, service: null });
        }
    };

    useEffect(() => {
        if (loans) setServices(loans);
    }, [loans]);



    return (
        <div className="h-screen md:h-screen max-md:flex-col flex bg-background">
            <Sidebar />
            <div className="container flex-1 overflow-y-auto mx-auto px-6 py-5">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {/* <Link to="/">
                                <Button variant="ghost" size="sm">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Dashboard
                                </Button>
                            </Link> */}
                            <div>
                                <h1 className="text-xl font-bold text-foreground">Loan Services</h1>
                                <p className="text-muted-foreground text-xs">Manage your loan service offerings</p>
                            </div>
                        </div>
                        <Link to="/loan/create">
                            <Button className="bg-gradient-primary hover:shadow-glow">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Loan Service
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
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, index) => (
                                    <ServiceCardSkeleton key={index} index={index} />
                                ))
                            ) : (
                                services.map((service, index) => (
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
                                ))
                            )}

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

export default LoanServices;