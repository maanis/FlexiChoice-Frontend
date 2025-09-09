import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./services/authContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./services/ScrollToTop";

// Lazy-load pages/components
const LandingPage = lazy(() => import("./features/landing/pages/LandingPage"));
const AdminLogin = lazy(() => import("./features/admin/pages/AdminLogin"));
const Dashboard = lazy(() => import("./features/dashboard/index/pages/Dashboard"));
const LoanServices = lazy(() => import("./features/dashboard/loans/pages/LoansServices"));
const InsuranceServices = lazy(() => import("./features/dashboard/insurance/pages/InsuranceServices"));
const ServiceDetails = lazy(() => import("./features/landing/components/ServiceDetails"));
const Quotes = lazy(() => import("./features/dashboard/quotes/pages/Quotes"));
const CreateOrEditService = lazy(() => import("./features/dashboard/components/CreateOrEditService"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/loans"
                element={
                  <ProtectedRoute>
                    <LoanServices />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/:service/create"
                element={
                  <ProtectedRoute>
                    <CreateOrEditService />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/:service/edit/:id"
                element={
                  <ProtectedRoute>
                    <CreateOrEditService />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/insurance"
                element={
                  <ProtectedRoute>
                    <InsuranceServices />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/quotes"
                element={
                  <ProtectedRoute>
                    <Quotes />
                  </ProtectedRoute>
                }
              />
              <Route path="/:serviceType/:id" element={<ServiceDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
