import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Auth Components
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import VerifyEmail from './pages/auth/VerifyEmail';
import SetPassword from './pages/auth/SetPassword';
import Profile from './pages/Profile';
import RegularClasses from './pages/RegularClasses';
import OneTimeSessions from './pages/OneTimeSessions';
import SessionDetail from './pages/SessionDetail';
import ClassDetail from './pages/ClassDetail';

import { ROUTES } from './utils/constants';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* Public Routes */}
                <Route path={ROUTES.HOME} element={<Dashboard />} />
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.REGISTER} element={<Register />} />
                <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmail />} />
                <Route path={ROUTES.SET_PASSWORD} element={<SetPassword />} />
                <Route path={ROUTES.CLASSES} element={<RegularClasses />} />
                <Route path="/classes/:id" element={<ClassDetail />} />
                <Route path={ROUTES.SESSIONS} element={<OneTimeSessions />} />
                <Route path="/sessions/:id" element={<SessionDetail />} />

                {/* Protected Routes */}
                <Route
                  path={ROUTES.PROFILE}
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
