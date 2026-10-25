import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { ScrollToTop } from '@/components/common/ScrollToTop'
import { BrochureModal } from '@/components/common/BrochureModal'
import { getVehicles } from '@/services/api'

// Multi-Page Routes
import { HomePage } from '@/pages/HomePage'
import { FleetPage } from '@/pages/FleetPage'
import { ZoomDetailsPage } from '@/pages/ZoomDetailsPage'
import { SpecsPage } from '@/pages/SpecsPage'
import { OrderPage } from '@/pages/OrderPage'
import { HeritagePage } from '@/pages/HeritagePage'
import { AdminLoginPage } from '@/pages/AdminLoginPage'
import { AdminDashboardPage } from '@/pages/AdminDashboardPage'

function AppLayout({ onOpenBrochure, onCloseBrochure, selectedBrochureModel }) {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#09090b] flex flex-col font-sans selection:bg-black selection:text-white">
      {/* Super Power & EMOTO Global Navbar (Hidden on Admin Portal) */}
      {!isAdminRoute && <Navbar />}

      {/* Dynamic Multi-Page Router Outlet */}
      <main className="flex-1">
        <Routes>
          {/* 1. Flagship Home Spotlight */}
          <Route
            path="/"
            element={<HomePage onOpenBrochure={onOpenBrochure} />}
          />

          {/* 2. Full 5-Model Showroom Catalog */}
          <Route
            path="/fleet"
            element={<FleetPage onOpenBrochure={onOpenBrochure} />}
          />

          {/* 3. Flagship Converted 125cc Retro EV Deep-Dive */}
          <Route
            path="/zoom-2000w"
            element={<ZoomDetailsPage />}
          />

          {/* 4. Precision Engineering Telemetry & Specs */}
          <Route
            path="/specs"
            element={<SpecsPage onOpenBrochure={onOpenBrochure} />}
          />

          {/* 5. Official E-Commerce Online Motorcycle Order & Checkout */}
          <Route
            path="/order"
            element={<OrderPage />}
          />

          {/* 6. Heritage, Decals & 125cc Conversion Philosophy */}
          <Route
            path="/heritage"
            element={<HeritagePage />}
          />

          {/* 7. Dedicated Owner Operations & Admin Portal */}
          <Route
            path="/admin/login"
            element={<AdminLoginPage />}
          />
          <Route
            path="/admin"
            element={<AdminDashboardPage />}
          />
          <Route
            path="/admin/orders"
            element={<Navigate to="/admin" replace />}
          />

          {/* Backwards compatibility redirects */}
          <Route
            path="/savings"
            element={<Navigate to="/" replace />}
          />
          <Route
            path="/test-ride"
            element={<Navigate to="/order" replace />}
          />

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Technical Brochure Modal (Hidden on Admin) */}
      {!isAdminRoute && (
        <BrochureModal
          isOpen={!!selectedBrochureModel}
          onClose={onCloseBrochure}
          model={selectedBrochureModel}
        />
      )}

      {/* Super Power & EMOTO Global Footer (Hidden on Admin) */}
      {!isAdminRoute && <Footer />}
    </div>
  )
}

export default function App() {
  const [selectedBrochureModel, setSelectedBrochureModel] = useState(null)

  // Warm up fleet cache on app launch for instant navigation across all pages
  useEffect(() => {
    getVehicles().catch(() => {})
  }, [])

  const handleOpenBrochure = (model) => {
    setSelectedBrochureModel(model)
  }

  const handleCloseBrochure = () => {
    setSelectedBrochureModel(null)
  }

  return (
    <BrowserRouter>
      {/* Scroll restoration on route transition */}
      <ScrollToTop />
      <AppLayout
        onOpenBrochure={handleOpenBrochure}
        onCloseBrochure={handleCloseBrochure}
        selectedBrochureModel={selectedBrochureModel}
      />
    </BrowserRouter>
  )
}
