import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AdminLayout from './components/AdminLayout';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import HeroEditor from './pages/HeroEditor';
import AboutEditor from './pages/AboutEditor';
import ServicesManager from './pages/ServicesManager';
import TeamManager from './pages/TeamManager';
import TestimonialsManager from './pages/TestimonialsManager';
import FooterEditor from './pages/FooterEditor';
import ThemeEditor from './pages/ThemeEditor';
import Messages from './pages/Messages';
import ProfileEditor from './pages/ProfileEditor';

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/" element={<AdminLayout />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="hero" element={<HeroEditor />} />
                    <Route path="about" element={<AboutEditor />} />
                    <Route path="services" element={<ServicesManager />} />
                    <Route path="team" element={<TeamManager />} />
                    <Route path="testimonials" element={<TestimonialsManager />} />
                    <Route path="footer" element={<FooterEditor />} />
                    <Route path="theme" element={<ThemeEditor />} />
                    <Route path="messages" element={<Messages />} />
                    <Route path="profile" element={<ProfileEditor />} />
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default App;
