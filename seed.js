import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// import { Briefcase, Building2, Car, Clock, Coins, Heart, Home, Plane, Shield, User } from "lucide-react";
// import { db } from "./lib/firebaseConfig";

// Apni Firebase config daal yahan

const firebaseConfig = {
    apiKey: "AIzaSyAiAkWDdr11YTbG38a4NIWOfrfuUmXr2sU",
    authDomain: "flexichoice-backend.firebaseapp.com",
    projectId: "flexichoice-backend",
    storageBucket: "flexichoice-backend.firebasestorage.app",
    messagingSenderId: "982615606905",
    appId: "1:982615606905:web:6de695e7f26fa40c5bb6a8",
    measurementId: "G-2CGRKWNC2X"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const loanServices = [
    { icon: "Home", title: "Home Loans", description: "Realize your dream of owning a home with our competitive interest rates and seamless approval process.", features: ["Loan amount up to ₹5 Cr", "Attractive Interest Rates", "Quick & Easy Processing"], buttonText: "Explore Home Loans" },
    { icon: "User", title: "Personal Loans", description: "Address your immediate financial needs with our flexible and collateral-free personal loan options.", features: ["Instant Disbursal", "No Collateral Required", "Flexible Repayment Tenure"], buttonText: "Get a Personal Loan" },
    { icon: "Briefcase", title: "Business Loans", description: "Fuel your business ambitions with our tailored financing solutions for expansion, and working capital.", features: ["Working Capital Finance", "Term Loans for Expansion", "Customized Solutions"], buttonText: "Grow Your Business" },
    { icon: "Coins", title: "Gold Loans", description: "Get instant cash against your gold jewelry with minimal documentation and secure storage.", features: ["Instant Cash in Minutes", "No Income Proof Needed", "Complete Security for Gold"], buttonText: "Unlock Gold Value" },
    { icon: "Building2", title: "Mortgage Loans", description: "Leverage your property's value for significant personal or business needs with our loan against property.", features: ["High Loan-to-Value Ratio", "Extended Repayment Tenure", "Competitive Interest Rates"], buttonText: "Leverage Your Property" },
    { icon: "Coins", title: "Private Funding", description: "Get instant cash against your gold jewelry with minimal documentation and secure storage.", features: ["Instant Cash in Minutes", "No Income Proof Needed", "Complete Security for Gold"], buttonText: "Unlock Gold Value" },
];
const insuranceServices = [
    { icon: "Shield", title: "Life Insurance", description: "Build a financial corpus for your future goals while ensuring life protection with our savings plans.", features: ["Insurance + Investment", "Guaranteed Returns", "Wealth Creation for Goals"], buttonText: "Plan Your Life Goals" },
    { icon: "Heart", title: "Health Insurance", description: "Protect yourself and your family with comprehensive health coverage for medical emergencies.", features: ["Cashless Hospitalization", "Covers Pre & Post Hospitalization", "Tax Benefits under 80D"], buttonText: "Secure Your Health" },
    { icon: "Clock", title: "Term Life Insurance", description: "Ensure your family's financial security in your absence with a high-coverage, low-premium term plan.", features: ["Large Cover at Low Premium", "Critical Illness Rider", "Multiple Payout Options"], buttonText: "Protect Your Family" },
    { icon: "Car", title: "Vehicle Insurance", description: "Get complete protection for your car or bike against accidents, theft, and other damages.", features: ["Zero Depreciation Cover", "24/7 Roadside Assistance", "Quick & Digital Claims"], buttonText: "Insure Your Vehicle" },
    { icon: "Plane", title: "Travel Insurance", description: "Travel the world worry-free with our plans covering medical emergencies, trip cancellations, and more.", features: ["Global Coverage", "Cashless Medical Treatment", "Baggage & Flight Delay Cover"], buttonText: "Travel Fearlessly" },
    { icon: "Plane", title: "Overseas Insurance", description: "Travel the world worry-free with our plans covering medical emergencies, trip cancellations, and more.", features: ["Global Coverage", "Cashless Medical Treatment", "Baggage & Flight Delay Cover"], buttonText: "Travel Fearlessly" }
];

async function addServices() {
    console.log("Adding loan services...");
    for (const service of loanServices) {
        try {
            await addDoc(collection(db, "loansServices"), service);
        } catch (e) {
            console.error("Error adding loan service: ", e);
        }
    }

    console.log("Adding insurance services...");
    for (const service of insuranceServices) {
        try {
            await addDoc(collection(db, "insuranceServices"), service);
        } catch (e) {
            console.error("Error adding insurance service: ", e);
        }
    }

    console.log("All services added successfully!");
}

addServices();