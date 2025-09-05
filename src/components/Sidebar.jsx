import { motion, AnimatePresence } from "framer-motion";
import {
    Home, Terminal, FileText, Settings, Layers3, UploadCloud, ServerCog,
    ChevronLeft, IdCard, CreditCard, Landmark, FileSearch, UserCheck, Smartphone, UserCog, Car, Truck, TrafficCone, ChevronRight, LogOut, ChevronDown, BadgePercent, RefreshCw, ChevronUp,
    Globe,
    Users,
    Link2,
    Shield,
    Menu // Hamburger icon
} from "lucide-react";
import { useState, useEffect } from "react"; // useEffect add kiya
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
import { logoutUser } from "../services/authServices";
// Make sure this path is correct for your project structure
// import { logoutUser } from "../../services/authServices";

// --- Custom Hook to detect screen size (within this file) ---
const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        window.addEventListener("resize", listener);
        return () => window.removeEventListener("resize", listener);
    }, [matches, query]);
    return matches;
};


// --- Data Structures ---
const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    {
        name: "Services",
        icon: IdCard,
        children: [
            { name: "Loans", icon: CreditCard, path: "/loans" },
            { name: "Insurance", icon: Shield, path: "/insurance" },
        ],
    },
    { name: "Quotes", icon: UploadCloud, path: "/quotes" },
];

// --- MODIFIED NavLink to handle mobile menu close ---
const NavLink = ({ item, collapsed, isActive, onLinkClick }) => (
    <Tooltip>
        <TooltipTrigger asChild>
            <Link
                to={item.path}
                onClick={onLinkClick} // Yeh add kiya
                className={cn(
                    "flex items-center my-1 gap-4 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200",
                    isActive
                        ? "bg-[#5246e9] text-white"
                        : "hover:bg-[#1f2937] hover:text-white",
                    collapsed ? "justify-center" : "justify-start"
                )}
            >
                <item.icon size={18} />
                {!collapsed && <span className="truncate">{item.name}</span>}
            </Link>
        </TooltipTrigger>
        {collapsed && <TooltipContent side="right">{item.name}</TooltipContent>}
    </Tooltip>
);

// --- Reusable Sidebar Content ---
// Yeh content desktop aur mobile dono sidebars mein use hoga
const SidebarContent = ({ collapsed, setCollapsed, onLinkClick }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(null);

    const userData = {
        name: "Raj Mishra",
        email: "admin@raj.com",
        avatarUrl: "https://github.com/shadcn.png",
    };

    const handleLogout = async () => {
        await logoutUser();
        navigate("/admin-login");
    };

    const handleMenuToggle = (name) => {
        if (collapsed && setCollapsed) {
            setCollapsed(false);
        }
        setOpenMenu(prev => (prev === name ? null : name));
    };

    return (
        <TooltipProvider delayDuration={100}>
            <div className={cn("flex flex-col h-full bg-gradient-to-b from-[#191a2a] to-[#11121e] px-2 text-foreground")}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-zinc-700 mb-3 h-16">
                    {!collapsed && <span onClick={() => navigate("/")} className="font-bold cursor-pointer text-xl text-white">Flexi-Choice</span>}
                    {/* Hide collapse button on mobile where setCollapsed is not available */}
                    {setCollapsed && (
                        <Button variant="ghost" size="icon" onClick={() => {
                            setOpenMenu(null)
                            setCollapsed(!collapsed)
                        }} className="h-8 w-8 text-white hover:bg-zinc-800/50 hover:text-white">
                            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                        </Button>
                    )}
                </div>

                {/* Navigation */}
                <ScrollArea className="flex-1 overflow-y-auto mt-2">
                    <nav className="flex flex-col gap-1 px-0">
                        {navItems.map((item) => {
                            const isMenuOpen = openMenu === item.name;
                            const isChildActive = item.children?.some(child => location.pathname.startsWith(child.path));

                            return item.children ? (
                                <div key={item.name}>
                                    <button
                                        onClick={() => handleMenuToggle(item.name)}
                                        className={cn(
                                            "flex items-center w-full gap-4 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200",
                                            isChildActive ? "text-white" : "hover:bg-[#1f2937] hover:text-white",
                                            collapsed ? "justify-center" : "justify-between"
                                        )}
                                    >
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
                                                    <NavLink
                                                        key={child.name}
                                                        item={child}
                                                        collapsed={collapsed}
                                                        isActive={location.pathname === child.path}
                                                        onLinkClick={onLinkClick}
                                                    />
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <NavLink
                                    key={item.name}
                                    item={item}
                                    collapsed={collapsed}
                                    isActive={location.pathname === item.path}
                                    onLinkClick={onLinkClick}
                                />
                            );
                        })}
                    </nav>
                </ScrollArea>

                {/* User Profile & Logout Section */}
                <div className="mt-auto p-2 border-t border-zinc-700">
                    <div className="flex flex-col">
                        <button onClick={() => {
                            if (collapsed && setCollapsed) setCollapsed(false);
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
                                            <span className="text-zinc-200">Role: Admin</span>
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
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
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

// --- MAIN COMPONENT THAT DECIDES WHAT TO RENDER ---
export default function Sidebar({ className }) {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [collapsed, setCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Agar mobile view hai, toh return karo Navbar + Sliding Menu
    if (isMobile) {
        return (
            <>
                <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-[#191a2a] px-4 sm:px-6 md:hidden">
                    <span className="font-bold text-xl text-white">Flexi-Choice</span>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="text-white hover:bg-zinc-800/50 hover:text-white"
                    >
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </header>

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="fixed inset-0 bg-black/60 z-40 md:hidden"
                            />
                            {/* Sliding Sidebar */}
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="fixed inset-y-0 left-0 z-50 w-64 md:hidden"
                            >
                                <SidebarContent
                                    collapsed={false}
                                    onLinkClick={() => setIsMobileMenuOpen(false)}
                                />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </>
        );
    }

    // Agar desktop view hai, toh normal sidebar return karo
    return (
        <aside className={cn("hidden md:block transition-all duration-300 ease-in-out", collapsed ? "w-20" : "w-64", className)}>
            <SidebarContent
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />
        </aside>
    );
}

