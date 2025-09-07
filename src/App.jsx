import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Core Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AiChatWidget from "./components/AiChatWidget"; // Floating Assistant
import PrivateRoute from "./utils/PrivateRoute";

// Lazy-loaded Pages
const Home = lazy(() => import("./pages/Home"));
const Jobs = lazy(() => import("./pages/Jobs"));
const JobDetail = lazy(() => import("./pages/JobDetail"));
const RedirectToSlug = lazy(() => import("./pages/RedirectToSlug"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ResendVerification = lazy(() => import("./pages/ResendVerification"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ResultDetail = lazy(() => import("./pages/ResultDetail"));
const AdmitCardDetail = lazy(() => import("./pages/AdmitCardDetail"));
const AnswerKeyDetail = lazy(() => import("./pages/AnswerKeyDetail"));
const AdmissionDetail = lazy(() => import("./pages/AdmissionDetail"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Header = lazy(() => import("./components/Header"));
const Contact = lazy(() => import("./pages/Contact"));
const VerifyOtp = lazy(() => import("./pages/VerifyOtp"));

// Admin Pages
const AddJob = lazy(() => import("./pages/admin/AddJob"));
const AdminJobs = lazy(() => import("./pages/admin/AdminJobs"));
const EditJob = lazy(() => import("./pages/admin/EditJob"));
const AddResult = lazy(() => import("./pages/admin/AddResult"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminAddAdmitCard = lazy(() => import("./pages/admin/AdminAddAdmitCard"));
const AdminAddAnswerKey = lazy(() => import("./pages/admin/AdminAddAnswerKey"));
const AdminAddAdmission = lazy(() => import("./pages/admin/AdminAddAdmission"));
const AdminResults = lazy(() => import("./pages/admin/AdminResults"));
const AdminAdmissions = lazy(() => import("./pages/admin/AdminAdmissions"));
const AdminAnswerKeys = lazy(() => import("./pages/admin/AdminAnswerKeys"));
const AdminAdmitCards = lazy(() => import("./pages/admin/AdminAdmitCards"));
const AdminAddDocument = lazy(() => import("./pages/admin/AdminAddDocument"));
const AdminDocuments = lazy(() => import("./pages/admin/AdminDocuments"));
const AdminAddStudyNews = lazy(() => import("./pages/admin/AdminAddStudyNews"));
const AdminStudyNews = lazy(() => import("./pages/admin/AdminStudyNews"));

// Study News
const StudyNewsList = lazy(() => import("./pages/StudyNewsList"));
const StudyNewsDetail = lazy(() => import("./pages/StudyNewsDetail"));

// Legal Pages
const Disclaimer = lazy(() => import("./pages/legal/Disclaimer"));
const PrivacyPolicy = lazy(() => import("./pages/legal/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/legal/TermsAndConditions"));
const AboutUs = lazy(() => import("./pages/legal/AboutUs"));

// Documents
const Document = lazy(() => import("./pages/Document"));
const DocumentDetail = lazy(() => import("./pages/DocumentDetail"));

// New Sections
const Result = lazy(() => import("./pages/Result"));
const AdmitCard = lazy(() => import("./pages/AdmitCard"));
const AnswerKey = lazy(() => import("./pages/AnswerKey"));
const Admission = lazy(() => import("./pages/Admission"));

// AI Assistant
const CopilotAI = lazy(() => import("./components/CopilotAI"));

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow container mx-auto p-4">
        <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/job/:id" element={<RedirectToSlug />} />
            <Route path="/:departmentSlug/:jobSlug" element={<JobDetail />} />
            <Route path="/jobs/:departmentSlug/:jobSlug" element={<JobDetail />} />
            <Route path="/result/:slug" element={<ResultDetail />} />
            <Route path="/admit-card/:slug" element={<AdmitCardDetail />} />
            <Route path="/answer-key/:slug" element={<AnswerKeyDetail />} />
            <Route path="/admission/:slug" element={<AdmissionDetail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/header" element={<Header />} />

            {/* Admin Panel Routes */}
            <Route path="/admin/add-job" element={<AddJob />} />
            <Route path="/admin/manage-jobs" element={<AdminJobs />} />
            <Route path="/admin/edit-job/:id" element={<EditJob />} />
            <Route path="/admin/add-result" element={<AddResult />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/add-admit-card" element={<AdminAddAdmitCard />} />
            <Route path="/admin/add-answer-key" element={<AdminAddAnswerKey />} />
            <Route path="/admin/add-admission" element={<AdminAddAdmission />} />
            <Route path="/admin/manage-results" element={<AdminResults />} />
            <Route path="/admin/manage-admissions" element={<AdminAdmissions />} />
            <Route path="/admin/manage-answer-keys" element={<AdminAnswerKeys />} />
            <Route path="/admin/manage-admit-cards" element={<AdminAdmitCards />} />
            <Route path="/admin/add-study-news" element={<AdminAddStudyNews />} />
            <Route path="/admin/manage-study-news" element={<AdminStudyNews />} />
            <Route path="/admin/add-document" element={<AdminAddDocument />} />
            <Route path="/admin/manage-documents" element={<AdminDocuments />} />

            {/* Study News */}
            <Route path="/study-news" element={<StudyNewsList />} />
            <Route path="/study-news/:slug" element={<StudyNewsDetail />} />

            {/* Documents */}
            <Route path="/documents" element={<Document />} />
            <Route path="/documents/:slug" element={<DocumentDetail />} />

            {/* Legal Pages */}
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/about-us" element={<AboutUs />} />

            {/* Support */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/ai-assistant" element={<CopilotAI />} />

            {/* New Sections */}
            <Route path="/result" element={<Result />} />
            <Route path="/admit-card" element={<AdmitCard />} />
            <Route path="/answer-key" element={<AnswerKey />} />
            <Route path="/admission" element={<Admission />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/resend-verification" element={<ResendVerification />} />

            {/* Protected Route */}
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Catch All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <AiChatWidget />
    </div>
  );
}

export default App;
