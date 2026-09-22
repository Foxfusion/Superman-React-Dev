import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";
import { RequireAuth } from "./auth/RequireAuth";
import { AppLayout } from "./layout/AppLayout";

import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { DashboardPage } from "./pages/DashboardPage";
import { ApplicationsPage } from "./pages/ApplicationsPage";
import { AIPage } from "./pages/AIPage";
import { KnowledgePage } from "./pages/KnowledgePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import ScrapePage from "./pages/ScrapePage";

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
            <Route path="scrape" element={<ScrapePage />} />
            <Route path="scraping" element={<Navigate to="/scrape" replace />} />
            <Route path="knowledge" element={<KnowledgePage />} />
            <Route path="projects" element={<ProjectsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
