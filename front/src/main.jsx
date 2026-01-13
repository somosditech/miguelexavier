/**
 * MAIN ENTRY POINT COM ROTAS
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import Login from './admin/pages/Login.jsx';
import Dashboard from './admin/pages/Dashboard.jsx';
import ThemeEditor from './admin/pages/ThemeEditor.jsx';
import HeroEditor from './admin/pages/HeroEditor.jsx';
import AboutEditor from './admin/pages/AboutEditor.jsx';
import ServicesManager from './admin/pages/ServicesManager.jsx';
import TeamManager from './admin/pages/TeamManager.jsx';
import TestimonialsManager from './admin/pages/TestimonialsManager.jsx';
import FooterEditor from './admin/pages/FooterEditor.jsx';
import Messages from './admin/pages/Messages.jsx';
import AdminLayout from './admin/components/AdminLayout.jsx';
import { AuthProvider } from './admin/context/AuthContext.jsx';
import ThemeProvider from './components/ThemeProvider.jsx';
import './styles/index.css';
import { registerServiceWorker } from './utils/serviceWorkerRegistration';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <AuthProvider>
                    <Routes>
                        {/* Site Público */}
                        <Route path="/" element={
                            <HelmetProvider>
                                <App />
                            </HelmetProvider>
                        } />

                        {/* Admin - Login */}
                        <Route path="/admin/login" element={<Login />} />

                        {/* Admin - Painel (protegido) */}
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<Navigate to="/admin/dashboard" replace />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="theme" element={<ThemeEditor />} />
                            <Route path="hero" element={<HeroEditor />} />
                            <Route path="about" element={<AboutEditor />} />
                            <Route path="services" element={<ServicesManager />} />
                            <Route path="team" element={<TeamManager />} />
                            <Route path="testimonials" element={<TestimonialsManager />} />
                            <Route path="footer" element={<FooterEditor />} />
                            <Route path="messages" element={<Messages />} />
                        </Route>

                        {/* 404 */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </AuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
);

// Registra o Service Worker para PWA
// Apenas em produção (não em desenvolvimento)
if (import.meta.env.PROD) {
    registerServiceWorker();
}
