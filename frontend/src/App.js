/*
File Name: App.js
Date Created: 02/05/2026
Date Modified: 02/05/2026
Author: William Fox
Description:

 */
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';



import { AuthProvider } from './auth/AuthContext';
import { RequireAuth } from './auth/RequireAuth';

import { AppLayout } from './layout/AppLayout';

import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { AIPage } from './pages/AIPage';
import { ScrapingPage } from './pages/ScrapingPage';
import { KnowledgePage } from './pages/KnowledgePage';
import { ProjectsPage } from './pages/ProjectsPage';

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />

                    <Route
                        path="/"
                        element={
                            <RequireAuth>
                                <AppLayout />
                            </RequireAuth>
                        }
                    >
                        <Route index element={<HomePage />} />
                        <Route path="dashboard" element={<DashboardPage />} />
                        <Route path="applications" element={<ApplicationsPage />} />
                        <Route path="ai" element={<AIPage />} />
                        <Route path="scraping" element={<ScrapingPage />} />
                        <Route path="knowledge" element={<KnowledgePage />} />
                        <Route path="projects" element={<ProjectsPage />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
