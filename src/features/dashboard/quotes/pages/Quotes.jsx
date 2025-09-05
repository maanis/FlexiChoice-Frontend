import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, Eye, X, Loader2, AlertTriangle } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";
import Sidebar from '../../../../components/Sidebar';
import { useQuotes } from '../../../../hooks/useFirseStoreServices';

// --- Reusable UI Components ---

const Input = ({ className, ...props }) => (
    <input
        className={`w-full p-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-gray-700 ${className}`}
        {...props}
    />
);

const Button = ({ children, variant, className, ...props }) => (
    <button
        className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 flex items-center gap-2 ${variant === 'outline' ? 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100' : 'bg-blue-600 text-white hover:bg-blue-700'} ${className}`}
        {...props}
    >
        {children}
    </button>
);

const Badge = ({ children, className }) => (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full border whitespace-nowrap ${className}`}>
        {children}
    </span>
);

const Table = ({ children, className }) => <table className={`w-full text-sm text-left text-gray-600 ${className}`}>{children}</table>;
const TableHeader = ({ children, className }) => <thead className={`bg-gray-50 ${className}`}>{children}</thead>;
const TableHead = ({ children, className }) => <th className={`p-4 font-semibold text-gray-600 uppercase tracking-wider ${className}`}>{children}</th>;
const TableBody = ({ children, className }) => <tbody className={className}>{children}</tbody>;
const TableRow = ({ children, className, ...props }) => <tr className={`border-b border-gray-200 ${className}`} {...props}>{children}</tr>;
const TableCell = ({ children, className }) => <td className={`p-4 ${className}`}>{children}</td>;

const DropdownMenu = ({ children }) => <div className="relative inline-block text-left">{children}</div>;
const DropdownMenuTrigger = ({ children }) => children;
const DropdownMenuContent = ({ children, align }) => (
    <div className={`origin-top-right absolute ${align === 'end' ? 'right-0' : 'left-0'} mt-2 w-48 rounded-md shadow-lg bg-white border border-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none z-10`}>
        <div className="py-1">{children}</div>
    </div>
);
const DropdownMenuItem = ({ children, onClick, className }) => (
    <button
        onClick={(e) => { e.preventDefault(); onClick(); }}
        className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${className}`}
    >
        {children}
    </button>
);

const MailIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);


// --- Helper Functions ---
const formatTimestamp = (timestamp) => {
    if (!timestamp?.seconds) {
        return 'N/A';
    }
    // Converts Firestore timestamp to a readable date string (e.g., "Jul 20, 2024")
    return new Date(timestamp.seconds * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

const sortOptions = [
    { label: 'Default', value: 'default' },
    { label: 'Date (Newest)', value: 'date-desc' },
    { label: 'Date (Oldest)', value: 'date-asc' },
    { label: 'Occupation', value: 'occupation' },
];

// --- Quote Detail Dialog Component ---
const QuoteDetailDialog = ({ quote, onClose }) => {
    if (!quote) return null;

    const DetailItem = ({ label, value }) => {
        // Don't render if value is empty or not provided
        if (!value) return null;
        return (
            <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{label}</p>
                <p className="text-sm text-gray-800 break-words">{value}</p>
            </div>
        );
    };

    // This maps keys from your data to user-friendly labels
    const fieldLabels = {
        fullName: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        occupation: 'Occupation Type',
        designation: 'Designation',
        company: 'Company Name',
        monthlyIncome: 'Monthly Income',
        experience: 'Years of Experience',
        businessName: 'Business Name',
        businessType: 'Business Type',
        annualIncome: 'Annual Income',
        businessAge: 'Age of Business',
        permanentAddress: 'Permanent Address',
        communicationAddress: 'Communication Address',
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="bg-white border border-gray-200 rounded-2xl w-full max-w-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900">Quote Details: <span className="text-blue-600 font-mono text-base">{quote.id}</span></h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        {/* Dynamically render all available details */}
                        {Object.entries(fieldLabels).map(([key, label]) => (
                            <DetailItem key={key} label={label} value={quote[key]} />
                        ))}
                        <DetailItem label="Submitted On" value={formatTimestamp(quote.submittedAt)} />
                    </div>
                    {/* Message section */}
                    {quote.message && (
                        <div>
                            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Message</p>
                            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md mt-1 whitespace-pre-wrap">{quote.message}</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 bg-gray-50 border-t border-gray-200 text-right">
                    <Button variant="outline" onClick={onClose}>Close</Button>
                </div>
            </motion.div>
        </motion.div>
    );
};


// --- Main Quotes Component ---
export default function Quotes() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [selectedQuote, setSelectedQuote] = useState(null);
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const { data: quotesData, isLoading, isError } = useQuotes();

    const filteredAndSortedQuotes = useMemo(() => {
        if (!quotesData) return [];

        let filtered = quotesData.filter(
            quote =>
                (quote.fullName && quote.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (quote.email && quote.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (quote.phone && quote.phone.includes(searchTerm)) ||
                (quote.id && quote.id.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        if (sortBy !== 'default') {
            filtered = [...filtered].sort((a, b) => {
                switch (sortBy) {
                    case 'date-desc':
                        return (b.submittedAt?.seconds || 0) - (a.submittedAt?.seconds || 0);
                    case 'date-asc':
                        return (a.submittedAt?.seconds || 0) - (b.submittedAt?.seconds || 0);
                    case 'occupation':
                        const occupationA = a.occupation || a.businessType || '';
                        const occupationB = b.occupation || b.businessType || '';
                        return occupationA.localeCompare(occupationB);
                    default:
                        return 0;
                }
            });
        }

        return filtered;
    }, [searchTerm, sortBy, quotesData]);

    const truncateMessage = (message) => {
        if (!message) return '';
        const words = message.split(' ');
        if (words.length > 4) {
            return words.slice(0, 4).join(' ') + '...';
        }
        return message;
    };

    return (
        <div className="flex h-screen  md:h-screen max-md:flex-col bg-gray-50 text-gray-800 font-sans">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-4 md:p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Quotes Management</h2>
                            <p className="text-muted-foreground text-xs text-gray-500">Manage and track all customer quotes</p>
                        </div>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <div className="relative flex-1 sm:w-64">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search by name, email, phone..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button variant="outline" className="gap-2" onClick={() => setIsSortDropdownOpen(prev => !prev)}>
                                        <Filter className="w-4 h-4" />
                                        Sort
                                        <ChevronDown className={`w-4 h-4 transition-transform ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
                                    </Button>
                                </DropdownMenuTrigger>
                                {isSortDropdownOpen && (
                                    <DropdownMenuContent align="end">
                                        {sortOptions.map((option) => (
                                            <DropdownMenuItem
                                                key={option.value}
                                                onClick={() => { setSortBy(option.value); setIsSortDropdownOpen(false); }}
                                                className={sortBy === option.value ? 'bg-blue-50 text-blue-600 font-semibold' : ''}
                                            >
                                                {option.label}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                )}
                            </DropdownMenu>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-x-auto">
                        <Table className="min-w-[800px]">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Service</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Contact</TableHead>
                                    <TableHead>Occupation</TableHead>
                                    <TableHead>Message</TableHead>
                                    <TableHead className="text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    // Skeleton Loader
                                    Array.from({ length: 5 }).map((_, idx) => (
                                        <TableRow key={idx} className="animate-pulse">
                                            <TableCell>
                                                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="h-4 w-28 bg-gray-200 rounded"></div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                                                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                                                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="h-4 w-40 bg-gray-200 rounded"></div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex justify-center gap-3">
                                                    <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                                                    <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                                                    <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : isError ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-48 text-center">
                                            <div className="flex flex-col justify-center items-center gap-2 text-red-600">
                                                <AlertTriangle className="h-8 w-8" />
                                                <span>Error loading data. Please try again.</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : filteredAndSortedQuotes.length > 0 ? (
                                    filteredAndSortedQuotes.map((quote, id) => (
                                        <TableRow key={quote.id} className="text-sm hover:bg-gray-50">
                                            <TableCell className=" text-blue-600">{quote.serviceName || 'NA'}</TableCell>
                                            <TableCell className="text-gray-500 whitespace-nowrap">{formatTimestamp(quote.submittedAt)}</TableCell>
                                            <TableCell className="font-medium text-gray-900">{quote.fullName}</TableCell>
                                            <TableCell className="text-gray-500">
                                                <div>{quote.phone}</div>
                                                <div className="truncate">{quote.email}</div>
                                            </TableCell>
                                            <TableCell className="text-gray-500">
                                                <div className="capitalize">{quote.occupation || quote.businessType || 'N/A'}</div>
                                                <div className="font-medium text-gray-800">{quote.designation}</div>
                                            </TableCell>
                                            <TableCell className="text-gray-400 italic">{truncateMessage(quote.message)}</TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex justify-center items-center gap-4">
                                                    <a href={`https://wa.me/+91${quote.phone}`} target="_blank" rel="noopener noreferrer" title="Send WhatsApp">
                                                        <FaWhatsapp className="h-5 w-5 text-green-500 hover:text-green-700 transition-all" />
                                                    </a>
                                                    <a href={`mailto:${quote.email}`} title="Send Email">
                                                        <MailIcon className="h-5 w-5 text-red-500 hover:text-red-700 transition-all" />
                                                    </a>
                                                    <Eye
                                                        onClick={() => setSelectedQuote(quote)}
                                                        className="h-5 w-5 text-gray-400 hover:text-blue-600 transition-all cursor-pointer"
                                                        title="View Details"
                                                    />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-48 text-center text-gray-500">
                                            No quotes found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                    </div>
                </motion.div>
            </main>

            <AnimatePresence>
                {selectedQuote && (
                    <QuoteDetailDialog quote={selectedQuote} onClose={() => setSelectedQuote(null)} />
                )}
            </AnimatePresence>
        </div>
    );
}
