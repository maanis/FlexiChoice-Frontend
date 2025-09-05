import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import LandingPage from "./features/landing/pages/LandingPage";
import AdminLogin from "./features/admin/pages/AdminLogin";
import Dashboard from "./features/dashboard/index/pages/Dashboard";
import LoanServices from "./features/dashboard/loans/pages/LoansServices";
import InsuranceServices from "./features/dashboard/insurance/pages/InsuranceServices";
import ServiceDetails from "./features/landing/components/ServiceDetails";
import Quotes from "./features/dashboard/quotes/pages/Quotes";
import CreateOrEditService from "./features/dashboard/components/CreateOrEditService";
import { AuthProvider } from "./services/authContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./services/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/loans" element={<ProtectedRoute><LoanServices /></ProtectedRoute>} />
            <Route path="/:service/create" element={<ProtectedRoute><CreateOrEditService /></ProtectedRoute>} />
            <Route path="/:service/edit/:id" element={<ProtectedRoute><CreateOrEditService /></ProtectedRoute>} />
            <Route path="/insurance" element={<ProtectedRoute><InsuranceServices /></ProtectedRoute>} />
            <Route path="/quotes" element={<ProtectedRoute><Quotes /></ProtectedRoute>} />
            <Route path="/:serviceType/:id" element={<ServiceDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
