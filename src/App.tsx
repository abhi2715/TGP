import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/layout/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { Loader2 } from 'lucide-react';

// Pages
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Programmes = React.lazy(() => import('./pages/Programmes'));
const ProgrammeDetail = React.lazy(() => import('./pages/ProgrammeDetail'));
const Mentorship = React.lazy(() => import('./pages/Mentorship'));
const LeadershipCoaching = React.lazy(() => import('./pages/LeadershipCoaching'));
const CareerGrowth = React.lazy(() => import('./pages/CareerGrowth'));
const PersonalDevelopment = React.lazy(() => import('./pages/PersonalDevelopment'));
const SuccessStories = React.lazy(() => import('./pages/SuccessStories'));
const Community = React.lazy(() => import('./pages/Community'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogDetail = React.lazy(() => import('./pages/BlogDetail'));
const Resources = React.lazy(() => import('./pages/Resources'));
const Events = React.lazy(() => import('./pages/Events'));
const Contact = React.lazy(() => import('./pages/Contact'));
const BookConsultation = React.lazy(() => import('./pages/BookConsultation'));
const FAQ = React.lazy(() => import('./pages/FAQ'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Login = React.lazy(() => import('./pages/Login'));

// Dashboard & Apps
const UnfoldingView = React.lazy(() => import('./pages/UnfoldingView'));

// Shikhar
const ShikharDashboard = React.lazy(() => import('./pages/shikhar/ShikharDashboard'));
const Session1 = React.lazy(() => import('./pages/shikhar/Session1'));
const Session2 = React.lazy(() => import('./pages/shikhar/Session2'));
const Session3 = React.lazy(() => import('./pages/shikhar/Session3'));
const Session4 = React.lazy(() => import('./pages/shikhar/Session4'));
const Session5 = React.lazy(() => import('./pages/shikhar/Session5'));
const Session6 = React.lazy(() => import('./pages/shikhar/Session6'));

// Admin
const AdminLayout = React.lazy(() => import('./pages/admin/AdminLayout'));
const AdminLogin = React.lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));
const AdminBlogs = React.lazy(() => import('./pages/admin/AdminBlogs'));
const AdminStudyMaterials = React.lazy(() => import('./pages/admin/AdminStudyMaterials'));
const AdminTestimonials = React.lazy(() => import('./pages/admin/AdminTestimonials'));
const AdminShikharUsers = React.lazy(() => import('./pages/admin/AdminShikharUsers'));

// Styles
import './App.css';

const PageLoader = () => (
  <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--color-bg)' }}>
    <Loader2 size={40} className="spinner" style={{ color: 'var(--color-gold)' }} />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
