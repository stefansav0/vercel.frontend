import { Routes, Route } from "react-router-dom";

import RedirectToSlug from "./pages/RedirectToSlug";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResendVerification from "./pages/ResendVerification";
import Profile from "./pages/Profile";
import PrivateRoute from "./utils/PrivateRoute";
import NotFound from "./pages/NotFound";
import ResultDetail from "./pages/ResultDetail";
import AdmitCardDetail from "./pages/AdmitCardDetail";
import AnswerKeyDetail from "./pages/AnswerKeyDetail";
import AdmissionDetail from "./pages/AdmissionDetail";
import AddJob from "./pages/admin/AddJob";
import AdminJobs from "./pages/admin/AdminJobs";
import EditJob from "./pages/admin/EditJob";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Header from "./components/Header";
import AddResult  from "./pages/admin/AddResult";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAddAdmitCard from "./pages/admin/AdminAddAdmitCard";
import AdminAddAnswerKey from "./pages/admin/AdminAddAnswerKey";
import AdminAddAdmission from "./pages/admin/AdminAddAdmission";
import AdminResults from "./pages/admin/AdminResults";
import AdminAdmissions from "./pages/admin/AdminAdmissions";
import AdminAnswerKeys from "./pages/admin/AdminAnswerKeys";
import AdminAdmitCards from "./pages/admin/AdminAdmitCards";
import Contact from "./pages/Contact"; // Adjust path if needed
import AdminAddDocument from "./pages/admin/AdminAddDocument";
import AdminDocuments from "./pages/admin/AdminDocuments";

// Study News Components
import AdminAddStudyNews from "./pages/admin/AdminAddStudyNews";
import StudyNewsList from "./pages/StudyNewsList";
import StudyNewsDetail from "./pages/StudyNewsDetail";
import AdminStudyNews from "./pages/admin/AdminStudyNews"

import Disclaimer from './pages/legal/Disclaimer';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsAndConditions from './pages/legal/TermsAndConditions';
import AboutUs from "./pages/legal/AboutUs";
import DocumentDetail from "./pages/DocumentDetail";


// Newly added page
import Result from "./pages/Result";
import AdmitCard from "./pages/AdmitCard";
import AnswerKey from "./pages/AnswerKey";
import Admission from "./pages/Admission";

// ✅ Import new OTP verification page
import VerifyOtp from "./pages/VerifyOtp";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
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
          <Route path="/admin/add-job" element={<AddJob />} />
          <Route path="/admin/manage-jobs" element={<AdminJobs />} />
          <Route path="/admin/edit-job/:id" element={<EditJob />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/header" element={<Header />} />
          <Route path="/admin/add-result" element={<AddResult />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add-admit-card" element={<AdminAddAdmitCard />} />
          <Route path="/admin/add-answer-key" element={<AdminAddAnswerKey />} />
          <Route path="/admin/add-admission" element={<AdminAddAdmission />} />
          <Route path="/admin/manage-results" element={<AdminResults />} />
          <Route path="/admin/manage-admissions" element={<AdminAdmissions />} />
          <Route path="/admin/manage-answer-keys" element={<AdminAnswerKeys />} />
          <Route path="/admin/manage-admit-cards" element={<AdminAdmitCards />} />
          <Route path="/study-news" element={<StudyNewsList />} />
          <Route path="/study-news/:slug" element={<StudyNewsDetail />} />

          <Route path="/admin/add-study-news" element={<AdminAddStudyNews />} />

          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/admin/manage-study-news" element={<AdminStudyNews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/documents/:slug" element={<DocumentDetail />} />
          <Route path="/admin/add-document" element={<AdminAddDocument />} />
          <Route path="/admin/manage-documents" element={<AdminDocuments />} />
          
          

          


          {/* Newly Added Routes */}
          <Route path="/result" element={<Result />} />
          <Route path="/admit-card" element={<AdmitCard />} />
          <Route path="/answer-key" element={<AnswerKey />} />
          <Route path="/admission" element={<Admission />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOtp />} /> {/* ✅ Updated */}
          <Route path="/resend-verification" element={<ResendVerification />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
