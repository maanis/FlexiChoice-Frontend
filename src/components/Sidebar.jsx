import { motion, AnimatePresence } from "framer-motion";
import {
    Home, Terminal, FileText, Settings, Layers3, UploadCloud, ServerCog,
    ChevronLeft, IdCard, CreditCard, Landmark, FileSearch, UserCheck, Smartphone, UserCog, Car, Truck, TrafficCone, ChevronRight, LogOut, ChevronDown, BadgePercent, RefreshCw, ChevronUp,
    Globe,
    Users,
    Link2,
    Shield
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// UI Components
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { GearIcon } from "@radix-ui/react-icons";

// --- Data Structures ---
const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    // { name: "Services", icon: Terminal, path: "/services" },
    {
        name: "Services",
        icon: IdCard,
        children: [
            { name: "Loans", icon: CreditCard, path: "/services/kyc/aadhaar-verify" },
            { name: "Insurance", icon: Shield, path: "/services/kyc/driving-licence" },
        ],
    },
    { name: "Quotes", icon: UploadCloud, path: "/quotes" },
    { name: "Settings", icon: GearIcon, path: "/logs" },
];

const NavLink = ({ item, collapsed, isActive }) => (
    <Tooltip>
        <TooltipTrigger asChild>
            <div className={`${isActive && 'border-r-3 border-zinc-700 '} px-2 `}>
                <Link
                    to={item.path}
                    className={cn(
                        "flex items-center gap-4 rounded-lg px-3 py-2.5 text-sm font-medium text-white  transition-colors",
                        isActive ? "bg-[#5246e9] w-full text-white" : "hover:bg-[#1f2937] hover:px-5 transition-all hover:text-white",
                        collapsed ? "justify-center" : "justify-start"
                    )}
                >
                    <item.icon size={18} />
                    {!collapsed && <span className="truncate">{item.name}</span>}
                </Link>
            </div>
        </TooltipTrigger>
        {collapsed && <TooltipContent side="right">{item.name}</TooltipContent>}
    </Tooltip>
);

export default function Sidebar({ className }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const userData = {
        name: "Raj Mishra",
        email: "admin@raj.com",
        avatarUrl: "https://github.com/shadcn.png",
        tokens: '2197',
        plan: "Pro Plus",
    };

    // State to hold the name of the *single* open menu
    const [openMenu, setOpenMenu] = useState(null);

    const handleLogout = () => {
        authUtils.removeToken();
        navigate("/auth/login");
    };

    const handleMenuToggle = (name) => {
        setOpenMenu(prev => (prev === name ? null : name));
    };

    const handleRefresh = () => {
        console.log("Refreshing user data...");
    };

    return (
        <TooltipProvider delayDuration={100}>
            <div
                className={cn(
                    "flex flex-col h-screen border-r bg-[#191a2a] text-foreground transition-all duration-300 ease-in-out",
                    collapsed ? "w-20" : "w-64",
                    className
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-zinc-700 mb-3 h-16">
                    {!collapsed && <span className="font-bold text-xl text-white">Flexi-Choice</span>}
                    <Button variant="ghost" size="icon" onClick={() => {
                        setOpenMenu(null)
                        setCollapsed(!collapsed)
                    }} className="h-8 w-8">
                        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    </Button>
                </div>

                {/* Navigation */}
                <ScrollArea className="flex-1 overflow-y-auto mt-2">
                    <nav className="flex flex-col gap-1 px-0">
                        {navItems.map((item) => {
                            const isMenuOpen = openMenu === item.name;
                            const isChildActive = item.children?.some(child => location.pathname.startsWith(child.path));

                            return item.children ? (
                                <Tooltip key={item.name}>
                                    <TooltipTrigger>
                                        <button onClick={() => {
                                            collapsed && setCollapsed(false)
                                            handleMenuToggle(item.name)
                                        }} className={cn(
                                            "flex items-center w-full gap-4 rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:bg-accent hover:text-accent-foreground transition-colors",
                                            // isChildActive && "text-accent-foreground ",
                                            isChildActive ? "bg-[#5246e9] w-full text-white" : "hover:bg-[#1f2937] hover:pl-7 transition-all hover:text-white",
                                            collapsed ? "justify-center" : "justify-between"
                                        )}>
                                            <div className="flex items-center gap-4">
                                                <item.icon size={18} />
                                                {!collapsed && <span className="truncate">{item.name}</span>}
                                            </div>
                                            {!collapsed && (
                                                <motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                                    <ChevronDown size={16} />
                                                </motion.div>
                                            )}
                                        </button>
                                        <AnimatePresence>
                                            {!collapsed && isMenuOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    className="flex flex-col ml-5 pl-2 border-l border-dashed"
                                                >
                                                    {item.children.map((child) => (
                                                        <NavLink key={child.name} item={child} collapsed={collapsed} isActive={location.pathname === child.path} />
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </TooltipTrigger>
                                    {collapsed && <TooltipContent side="right">{item.name}</TooltipContent>}
                                </Tooltip>
                            ) : (
                                <NavLink key={item.name} item={item} collapsed={collapsed} isActive={location.pathname === item.path} />
                            );
                        })}
                    </nav>
                </ScrollArea>

                {/* User Profile & Logout Section */}
                <div className="mt-auto p-2 border-t border-zinc-700">
                    {/* Profile Accordion */}
                    <div className="flex flex-col">
                        <button onClick={() => {
                            collapsed && setCollapsed(false)
                            handleMenuToggle('Profile')
                        }} className="p-2 rounded-lg hover:bg-[#1f2937] w-full">
                            <div className={cn("flex items-center gap-3", collapsed ? "justify-center" : "justify-between")}>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={userData.avatarUrl} alt={userData.name} />
                                        <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    {!collapsed && (
                                        <div className="flex flex-col text-sm text-left">
                                            {userData.name ? <span className="font-semibold text-white truncate">{userData.name}</span> : <Skeleton className="h-4 w-20 mb-1" />}
                                            <span className="text-white">Tokens: {userData.tokens.toLocaleString()}</span>
                                        </div>
                                    )}
                                </div>
                                {!collapsed && (
                                    <motion.div animate={{ rotate: openMenu === 'Profile' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                        <ChevronUp size={16} />
                                    </motion.div>
                                )}
                            </div>
                        </button>

                        <AnimatePresence>
                            {!collapsed && openMenu === 'Profile' && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="text-sm text-white p-3 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span>Email:</span>
                                            {userData.email ? <span className="font-medium text-white truncate">{userData.email}</span> : <Skeleton className="h-4 w-32" />}
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Plan:</span>
                                            <span className="font-medium text-white">{userData.plan}</span>
                                        </div>
                                        <Button onClick={handleRefresh} variant="outline" size="sm" className="w-full text-black">
                                            <RefreshCw size={14} className="mr-2" />
                                            Refresh Tokens
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Logout Button */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="ghost" className={cn(
                                        "flex items-center gap-4 w-full text-sm font-medium text-red-500 hover:bg-red-500/10 hover:text-red-500 transition-colors mt-1",
                                        collapsed ? "justify-center px-0" : "justify-start px-3"
                                    )}>
                                        <LogOut size={18} />
                                        {!collapsed && "Logout"}
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>You will be logged out. This action cannot be undone.</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={handleLogout}>Logout</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </TooltipTrigger>
                        {collapsed && <TooltipContent side="right">Logout</TooltipContent>}
                    </Tooltip>
                </div>
            </div>
        </TooltipProvider>
    );
}
