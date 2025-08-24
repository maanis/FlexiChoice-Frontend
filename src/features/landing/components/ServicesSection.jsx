import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Coins,
  Building2,
  User,
  Briefcase,
  Heart,
  Clock,
  Car,
  Plane,
  Shield,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

// --- Mock ShadCN UI Components for demonstration ---
// In a real app, you would import these from your UI library (e.g., @/components/ui/card).
const Card = ({ className, children, onMouseMove, onMouseLeave }) => <div className={className} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>{children}</div>;
const CardHeader = ({ className, children }) => <div className={className}>{children}</div>;
const CardContent = ({ className, children }) => <div className={className}>{children}</div>;
const CardTitle = ({ className, children }) => <h3 className={className}>{children}</h3>;
const Button = ({ className, children }) => <button className={className}>{children}</button>;

// --- Data for Services ---
const loanServices = [
  { icon: Home, title: "Home Loans", description: "Realize your dream of owning a home with our competitive interest rates and seamless approval process.", features: ["Loan amount up to ₹5 Cr", "Attractive Interest Rates", "Quick & Easy Processing"], buttonText: "Explore Home Loans" },
  { icon: User, title: "Personal Loans", description: "Address your immediate financial needs with our flexible and collateral-free personal loan options.", features: ["Instant Disbursal", "No Collateral Required", "Flexible Repayment Tenure"], buttonText: "Get a Personal Loan" },
  { icon: Briefcase, title: "Business Loans", description: "Fuel your business ambitions with our tailored financing solutions for expansion, and working capital.", features: ["Working Capital Finance", "Term Loans for Expansion", "Customized Solutions"], buttonText: "Grow Your Business" },
  { icon: Coins, title: "Gold Loans", description: "Get instant cash against your gold jewelry with minimal documentation and secure storage.", features: ["Instant Cash in Minutes", "No Income Proof Needed", "Complete Security for Gold"], buttonText: "Unlock Gold Value" },
  { icon: Building2, title: "Mortgage Loans", description: "Leverage your property's value for significant personal or business needs with our loan against property.", features: ["High Loan-to-Value Ratio", "Extended Repayment Tenure", "Competitive Interest Rates"], buttonText: "Leverage Your Property" },
  { icon: Coins, title: "Private Funding", description: "Get instant cash against your gold jewelry with minimal documentation and secure storage.", features: ["Instant Cash in Minutes", "No Income Proof Needed", "Complete Security for Gold"], buttonText: "Unlock Gold Value" },
];
const insuranceServices = [
  { icon: Shield, title: "Life Insurance", description: "Build a financial corpus for your future goals while ensuring life protection with our savings plans.", features: ["Insurance + Investment", "Guaranteed Returns", "Wealth Creation for Goals"], buttonText: "Plan Your Life Goals" },
  { icon: Heart, title: "Health Insurance", description: "Protect yourself and your family with comprehensive health coverage for medical emergencies.", features: ["Cashless Hospitalization", "Covers Pre & Post Hospitalization", "Tax Benefits under 80D"], buttonText: "Secure Your Health" },
  { icon: Clock, title: "Term Life Insurance", description: "Ensure your family's financial security in your absence with a high-coverage, low-premium term plan.", features: ["Large Cover at Low Premium", "Critical Illness Rider", "Multiple Payout Options"], buttonText: "Protect Your Family" },
  { icon: Car, title: "Vehicle Insurance", description: "Get complete protection for your car or bike against accidents, theft, and other damages.", features: ["Zero Depreciation Cover", "24/7 Roadside Assistance", "Quick & Digital Claims"], buttonText: "Insure Your Vehicle" },
  { icon: Plane, title: "Travel Insurance", description: "Travel the world worry-free with our plans covering medical emergencies, trip cancellations, and more.", features: ["Global Coverage", "Cashless Medical Treatment", "Baggage & Flight Delay Cover"], buttonText: "Travel Fearlessly" },
  { icon: Plane, title: "Overseas Insurance", description: "Travel the world worry-free with our plans covering medical emergencies, trip cancellations, and more.", features: ["Global Coverage", "Cashless Medical Treatment", "Baggage & Flight Delay Cover"], buttonText: "Travel Fearlessly" }
];

// --- Animation Variants ---
const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const gridItemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

// --- Reusable Service Card Component ---
const ServiceCard = ({ service, theme }) => {
  const { icon: Icon, title, description, features, buttonText } = service;
  const [mousePosition, setMousePosition] = React.useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => setMousePosition({ x: -1000, y: -1000 });

  const themeClasses = {
    indigo: { aurora: 'from-indigo-500/50', text: 'text-indigo-600 dark:text-indigo-400', button: 'bg-indigo-600 hover:bg-indigo-700', check: 'text-indigo-500' },
    teal: { aurora: 'from-teal-500/50', text: 'text-teal-600 dark:text-teal-400', button: 'bg-teal-600 hover:bg-teal-700', check: 'text-teal-500' }
  };
  const currentTheme = themeClasses[theme];

  return (
    <motion.div variants={gridItemVariants} className="relative h-full">
      <Card
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative z-10 flex flex-col h-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 overflow-hidden"
      >
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `radial-gradient(400px at ${mousePosition.x}px ${mousePosition.y}px, ${currentTheme.aurora} 0%, transparent 80%)` }}
        />
        <CardHeader className="text-center flex flex-col items-center pt-8">
          <div className="relative z-10 w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
            <Icon className={`w-8 h-8 ${currentTheme.text}`} />
          </div>
          <CardTitle className="text-xl font-bold text-zinc-900 dark:text-white">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow text-center p-6">
          <p className="text-zinc-600 dark:text-zinc-400 mb-6 flex-grow">{description}</p>
          <div className="space-y-3 mb-8 text-left">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center text-zinc-700 dark:text-zinc-300">
                <CheckCircle2 className={`w-5 h-5 mr-3 flex-shrink-0 ${currentTheme.check}`} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          <Button className={`mt-auto w-full inline-flex items-center justify-center px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ${currentTheme.button} focus:outline-none focus:ring-2 focus:ring-offset-2 ring-white/50`}>
            {buttonText}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// --- Animated Tabs Component ---
const AnimatedTabs = ({ tabs, activeTab, setActiveTab }) => {
  const tabsRef = React.useRef([]);
  const [indicatorStyle, setIndicatorStyle] = React.useState({ left: 0, width: 0 });

  React.useEffect(() => {
    const activeTabIndex = tabs.findIndex(tab => tab.id === activeTab);
    const activeTabElement = tabsRef.current[activeTabIndex];
    if (activeTabElement) {
      setIndicatorStyle({
        left: activeTabElement.offsetLeft,
        width: activeTabElement.offsetWidth,
      });
    }
  }, [activeTab, tabs]);

  return (
    <div className="flex justify-center mb-12">
      <div className="relative flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-full p-1">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={el => tabsRef.current[index] = el}
            onClick={() => setActiveTab(tab.id)}
            className={`${activeTab === tab.id ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
              } relative rounded-full px-8 py-3 text-sm sm:text-base font-medium transition-colors duration-300 z-10 capitalize`}
          >
            {tab.label}
          </button>
        ))}
        <motion.div
          className="absolute h-[80%]  bg-white p-0 dark:bg-zinc-700 rounded-full z-0"
          animate={indicatorStyle}
          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        />
      </div>
    </div>
  );
};


// --- Main Services Section Component ---
export default function App({ activeTab, setActiveTab }) {
  // const [activeTab, setActiveTab] = React.useState('loans');
  const TABS = [{ id: 'loans', label: 'Loans' }, { id: 'insurance', label: 'Insurance' }];

  return (
    <div className="font-sans bg-white dark:bg-zinc-950 min-h-screen">
      <section id="services" className="py-20 sm:py-28 bg-white dark:bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-50 dark:opacity-100"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500">
              Your Financial Toolkit
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
              At Flexi Choice, we offer a complete suite of financial services. Whether you're planning a big purchase or securing your future, we've got the right solution for you.
            </p>
          </div>

          <AnimatedTabs tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'loans' && (
                <motion.div
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={gridContainerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {loanServices.map((service, index) => (
                    <ServiceCard key={`loan-${index}`} service={service} theme="indigo" />
                  ))}
                </motion.div>
              )}
              {activeTab === 'insurance' && (
                <motion.div
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={gridContainerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {insuranceServices.map((service, index) => (
                    <ServiceCard key={`insurance-${index}`} service={service} theme="teal" />
                  ))}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
