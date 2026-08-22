import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/layout/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Programmes from './pages/Programmes';
import ProgrammeDetail from './pages/ProgrammeDetail';
import Mentorship from './pages/Mentorship';
import LeadershipCoaching from './pages/LeadershipCoaching';
import CareerGrowth from './pages/CareerGrowth';
import PersonalDevelopment from './pages/PersonalDevelopment';
import SuccessStories from './pages/SuccessStories';
import Community from './pages/Community';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Resources from './pages/Resources';
import Events from './pages/Events';
import Contact from './pages/Contact';
import BookConsultation from './pages/BookConsultation';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
// Dashboard & Apps
import UnfoldingView from './pages/UnfoldingView';

// Shikhar
import ShikharDashboard from './pages/shikhar/ShikharDashboard';
import Session1 from './pages/shikhar/Session1';
import Session2 from './pages/shikhar/Session2';
import Session3 from './pages/shikhar/Session3';
import Session4 from './pages/shikhar/Session4';
import Session5 from './pages/shikhar/Session5';
import Session6 from './pages/shikhar/Session6';

// Admin
import AdminLayout from './pages/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminStudyMaterials from './pages/admin/AdminStudyMaterials';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminShikharUsers from './pages/admin/AdminShikharUsers';

// Styles
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* ══════════════════════════════════
              ADMIN ROUTES - Separate layout, no public navbar/footer
             ══════════════════════════════════ */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="study-materials" element={<AdminStudyMaterials />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="shikhar-users" element={<AdminShikharUsers />} />
          </Route>

          {/* ══════════════════════════════════
              PUBLIC ROUTES - With navbar + footer layout
             ══════════════════════════════════ */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            
            <Route path="/programmes" element={<Programmes />} />
            <Route path="/programmes/:id" element={<ProgrammeDetail />} />
            <Route path="/programmes/mentorship" element={<Mentorship />} />
            <Route path="/programmes/leadership" element={<LeadershipCoaching />} />
            <Route path="/programmes/career" element={<CareerGrowth />} />
            <Route path="/programmes/personal-development" element={<PersonalDevelopment />} />
            
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/community" element={<Community />} />
            
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/events" element={<Events />} />
            
            <Route path="/contact" element={<Contact />} />
            <Route path="/book-consultation" element={<BookConsultation />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />

            {/* Protected Member Routes */}
            <Route element={<ProtectedRoute requireShikhar={true} />}>
              <Route path="/dashboard" element={<Navigate to="/shikhar" replace />} />
              <Route path="/unfolding-app" element={<UnfoldingView />} />
              <Route path="/shikhar" element={<ShikharDashboard />} />
              <Route path="/shikhar/session/1" element={<Session1 />} />
              <Route path="/shikhar/session/2" element={<Session2 />} />
              <Route path="/shikhar/session/3" element={<Session3 />} />
              <Route path="/shikhar/session/4" element={<Session4 />} />
              <Route path="/shikhar/session/5" element={<Session5 />} />
              <Route path="/shikhar/session/6" element={<Session6 />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
