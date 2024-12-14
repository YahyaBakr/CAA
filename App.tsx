import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useGoogleAds } from './hooks/useGoogleAds';
import { Header } from './components/layout/Header';
import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CreateListingPage } from './pages/CreateListingPage';
import { EditListingPage } from './pages/EditListingPage';
import { CarDetailsPage } from './pages/CarDetailsPage';
import { ProfilePage } from './pages/ProfilePage';
import { MessagesPage } from './pages/MessagesPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminListingsPage } from './pages/admin/AdminListingsPage';
import { AdminFeaturedPage } from './pages/admin/AdminFeaturedPage';
import { DealerDashboard } from './pages/dealer/DealerDashboard';
import { BulkListingPage } from './pages/dealer/BulkListingPage';
import { PaymentsPage } from './pages/dealer/PaymentsPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AdminRoute } from './components/auth/AdminRoute';
import './i18n';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  // Initialize Google Ads
  useGoogleAds();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/cars" element={<HomePage />} />
              <Route path="/cars/:id" element={<CarDetailsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/listings/new" element={<CreateListingPage />} />
                <Route path="/listings/:id/edit" element={<EditListingPage />} />
                
                {/* Dealer Routes */}
                <Route path="/dealer/dashboard" element={<DealerDashboard />} />
                <Route path="/dealer/bulk-listing" element={<BulkListingPage />} />
                <Route path="/dealer/payments" element={<PaymentsPage />} />
              </Route>

              {/* Admin Routes */}
              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/listings" element={<AdminListingsPage />} />
                <Route path="/admin/featured" element={<AdminFeaturedPage />} />
              </Route>
            </Routes>
          </main>
        </div>
        <Toaster 
          position="top-right" 
          toastOptions={{
            className: 'rtl:text-right ltr:text-left',
          }}
        />
      </Router>
    </QueryClientProvider>
  );
}

export default App;