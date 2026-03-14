import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WalletProvider } from "@/contexts/WalletContext";
import { AuthProvider } from "@/contexts/AuthContext";

// Public pages
import Landing from "./pages/Landing";
import PrivacyExplainer from "./pages/PrivacyExplainer";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import InstitutionInfo from "./pages/InstitutionInfo";
import HowItWorks from "./pages/HowItWorks";
import Security from "./pages/Security";
import Roadmap from "./pages/Roadmap";
import ResearchPortal from "./pages/ResearchPortal";
import APIDocs from "./pages/APIDocs";
import Compliance from "./pages/Compliance";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import HIPAANotice from "./pages/HIPAANotice";
import CookiePolicy from "./pages/CookiePolicy";

// Auth
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// User pages
import Dashboard from "./pages/Dashboard";
import HealthDataUpload from "./pages/HealthDataUpload";
import HealthDataOnchain from "./pages/HealthDataOnchain";
import Timeline from "./pages/Timeline";
import SearchProfiles from "./pages/SearchProfiles";
import Messages from "./pages/Messages";
import Invitations from "./pages/Invitations";
import ConsentCenter from "./pages/ConsentCenter";

// Institution pages
import InstitutionDashboard from "./pages/institution/InstitutionDashboard";
import CampaignManagement from "./pages/institution/CampaignManagement";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AuditLogs from "./pages/admin/AuditLogs";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <WalletProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="/privacy" element={<PrivacyExplainer />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/institutions" element={<InstitutionInfo />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/security" element={<Security />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/research-portal" element={<ResearchPortal />} />
          <Route path="/api-docs" element={<APIDocs />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/hipaa-notice" element={<HIPAANotice />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* User App */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/health-data" element={<HealthDataUpload />} />
          <Route path="/health-data/onchain" element={<HealthDataOnchain />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/search" element={<SearchProfiles />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/invitations" element={<Invitations />} />
          <Route path="/consent" element={<ConsentCenter />} />

          {/* Institution */}
          <Route path="/institution/dashboard" element={<InstitutionDashboard />} />
          <Route path="/institution/campaigns" element={<CampaignManagement />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/audit" element={<AuditLogs />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </WalletProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
