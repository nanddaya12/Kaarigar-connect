import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { mockServiceRequests, bookingService } from './services/bookingService';
import { marketplaceService } from './services/marketplaceService';
import { ProviderProfile, ServiceRequest } from './types/database.types';
import { Search, X, ShieldCheck } from 'lucide-react';

const HomePage = lazy(() => import('./pages/public/HomePage').then((module) => ({ default: module.HomePage })));
const KaarigarProfilePage = lazy(() => import('./pages/public/KaarigarProfilePage').then((module) => ({ default: module.KaarigarProfilePage })));
const HowItWorksPage = lazy(() => import('./pages/public/HowItWorksPage').then((module) => ({ default: module.HowItWorksPage })));
const SettingsPage = lazy(() => import('./pages/public/SettingsPage').then((module) => ({ default: module.SettingsPage })));
const SavedProvidersPage = lazy(() => import('./pages/public/SavedProvidersPage').then((module) => ({ default: module.SavedProvidersPage })));
const SectorMap = lazy(() => import('./components/marketplace/SectorMap').then((module) => ({ default: module.SectorMap })));
const AiDiagnosticWidget = lazy(() => import('./components/ai/AiDiagnosticWidget').then((module) => ({ default: module.AiDiagnosticWidget })));
const OrderTracker = lazy(() => import('./components/dashboard/OrderTracker').then((module) => ({ default: module.OrderTracker })));
const ProviderDashboardPage = lazy(() => import('./pages/provider/ProviderDashboardPage').then((module) => ({ default: module.ProviderDashboardPage })));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage').then((module) => ({ default: module.AdminDashboardPage })));
const BookingModal = lazy(() => import('./components/marketplace/BookingModal').then((module) => ({ default: module.BookingModal })));
const ProviderOnboardingModal = lazy(() => import('./components/marketplace/ProviderOnboardingModal').then((module) => ({ default: module.ProviderOnboardingModal })));
const ChatDrawer = lazy(() => import('./features/chat/ChatDrawer').then((module) => ({ default: module.ChatDrawer })));

const PageLoader = () => (
  <div className="grid min-h-[45vh] place-items-center px-4">
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold text-slate-600 shadow-sm">
      <span className="h-3 w-3 animate-pulse rounded-full bg-emerald-600" />
      Loading your workspace…
    </div>
  </div>
);

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

const AppRoutes: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setRole } = useAuth();

  const [selectedProviderId, setSelectedProviderId] = useState<string>('kaarigar-1');
  const [bookingProvider, setBookingProvider] = useState<ProviderProfile | null>(null);
  const [activeRequest, setActiveRequest] = useState<ServiceRequest>(mockServiceRequests[0]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showChatDrawer, setShowChatDrawer] = useState(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [allProviders, setAllProviders] = useState<ProviderProfile[]>([]);

  useEffect(() => {
    marketplaceService.getProviders().then(setAllProviders);
  }, []);

  // Sync activeView with current URL path
  const getActiveViewFromPath = (path: string): string => {
    if (path === '/' || path === '') return 'home';
    if (path.startsWith('/explore') || path.startsWith('/map')) return 'explore';
    if (path.startsWith('/how-it-works')) return 'how_it_works';
    if (path.startsWith('/profile')) return 'profile';
    if (path.startsWith('/tracking') || path.startsWith('/requests')) return 'tracking';
    if (path.startsWith('/settings')) return 'settings';
    if (path.startsWith('/saved')) return 'saved';
    if (path.startsWith('/provider/requests')) return 'provider_requests';
    if (path.startsWith('/provider/jobs')) return 'provider_jobs';
    if (path.startsWith('/provider/earnings')) return 'provider_earnings';
    if (path.startsWith('/provider')) return 'provider';
    if (path.startsWith('/admin/users')) return 'admin_users';
    if (path.startsWith('/admin/providers')) return 'admin_providers';
    if (path.startsWith('/admin/verification')) return 'admin_verification';
    if (path.startsWith('/admin/requests')) return 'admin_requests';
    if (path.startsWith('/admin/categories')) return 'admin_categories';
    if (path.startsWith('/admin/reviews')) return 'admin_reviews';
    if (path.startsWith('/admin/reports')) return 'admin_reports';
    if (path.startsWith('/admin')) return 'admin';
    return 'home';
  };

  const activeView = getActiveViewFromPath(location.pathname);

  const handleNavigate = (viewId: string) => {
    const routeMap: Record<string, string> = {
      home: '/',
      explore: '/explore',
      map: '/explore',
      ai_triage: '/ai-triage',
      how_it_works: '/how-it-works',
      profile: '/profile',
      tracking: '/tracking',
      settings: '/settings',
      saved: '/saved',
      provider: '/provider',
      provider_requests: '/provider/requests',
      provider_jobs: '/provider/jobs',
      provider_earnings: '/provider/earnings',
      admin: '/admin',
      admin_users: '/admin/users',
      admin_providers: '/admin/providers',
      admin_verification: '/admin/verification',
      admin_requests: '/admin/requests',
      admin_categories: '/admin/categories',
      admin_reviews: '/admin/reviews',
      admin_reports: '/admin/reports',
    };
    const targetRoute = routeMap[viewId] || '/';
    navigate(targetRoute);
  };

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K and Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearchModal((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setShowSearchModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectKaarigar = (id: string) => {
    setSelectedProviderId(id);
    navigate('/profile');
  };

  const handleBookNow = (provider: ProviderProfile) => {
    setBookingProvider(provider);
  };

  const handleBookingSuccess = (req: ServiceRequest) => {
    setActiveRequest(req);
    setBookingProvider(null);
    navigate('/tracking');
  };

  const handleOnboardingComplete = () => {
    setRole('provider');
    setShowOnboardingModal(false);
    navigate('/provider');
  };

  const filteredProviders = allProviders.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-[#FBFBF9] font-body text-[#1F2937] antialiased min-h-screen flex flex-col justify-between">
      <Navbar
        activeView={activeView}
        onNavigate={handleNavigate}
        onOpenSearch={() => setShowSearchModal(true)}
        onOpenChat={() => setShowChatDrawer(true)}
        onOpenProviderOnboarding={() => setShowOnboardingModal(true)}
      />

      <main className="flex-grow pt-16 sm:pt-20 pb-20 lg:pb-12">
        <Suspense fallback={<PageLoader />}>
          <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onSelectKaarigar={handleSelectKaarigar}
                onBookKaarigar={handleBookNow}
                onNavigate={handleNavigate}
              />
            }
          />
          <Route
            path="/explore"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <SectorMap
                  providers={allProviders}
                  onSelectProvider={handleSelectKaarigar}
                  onBookNow={handleBookNow}
                />
              </div>
            }
          />
          <Route path="/how-it-works" element={<HowItWorksPage onNavigate={handleNavigate} />} />
          <Route
            path="/ai-triage"
            element={
              <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
                <AiDiagnosticWidget onSelectKaarigar={handleSelectKaarigar} />
              </div>
            }
          />
          <Route
            path="/profile"
            element={
              <KaarigarProfilePage
                providerId={selectedProviderId}
                onBookNow={handleBookNow}
              />
            }
          />
          <Route
            path="/tracking"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <OrderTracker
                  request={activeRequest}
                  onUpdateStatus={(status) => {
                    bookingService.updateStatus(activeRequest.id, status).then((updated) => {
                      if (updated) setActiveRequest({ ...updated });
                    });
                  }}
                />
              </div>
            }
          />
          <Route path="/settings" element={<SettingsPage />} />
          <Route
            path="/saved"
            element={
              <SavedProvidersPage
                onSelectKaarigar={handleSelectKaarigar}
                onBookKaarigar={handleBookNow}
              />
            }
          />

          {/* Provider Routes */}
          <Route path="/provider" element={<ProviderDashboardPage activeTab="provider" />} />
          <Route path="/provider/requests" element={<ProviderDashboardPage activeTab="provider_requests" />} />
          <Route path="/provider/jobs" element={<ProviderDashboardPage activeTab="provider_jobs" />} />
          <Route path="/provider/earnings" element={<ProviderDashboardPage activeTab="provider_earnings" />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboardPage activeTab="admin" />} />
          <Route path="/admin/users" element={<AdminDashboardPage activeTab="admin_users" />} />
          <Route path="/admin/providers" element={<AdminDashboardPage activeTab="admin_providers" />} />
          <Route path="/admin/verification" element={<AdminDashboardPage activeTab="admin_verification" />} />
          <Route path="/admin/requests" element={<AdminDashboardPage activeTab="admin_requests" />} />
          <Route path="/admin/categories" element={<AdminDashboardPage activeTab="admin_categories" />} />
          <Route path="/admin/reviews" element={<AdminDashboardPage activeTab="admin_reviews" />} />
          <Route path="/admin/reports" element={<AdminDashboardPage activeTab="admin_reports" />} />
          </Routes>
        </Suspense>
      </main>

      <Footer onNavigate={handleNavigate} />
      <MobileNav
        activeView={activeView}
        onNavigate={handleNavigate}
        onOpenChat={() => setShowChatDrawer(true)}
      />

      {/* Global Interactive Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-2xl max-w-2xl w-full space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-[#004331]" />
                <span className="font-extrabold text-base text-slate-900">Search KaarigarConnect</span>
              </div>
              <button
                onClick={() => setShowSearchModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors text-xs font-bold flex items-center gap-1"
              >
                <span>ESC</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 bg-slate-100 rounded-2xl border border-slate-200">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, trade (e.g. AC, Electrician, Plumber)..."
                className="w-full bg-transparent text-sm text-slate-900 focus:outline-none font-bold placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-1">
                {searchQuery ? `Matching Results (${filteredProviders.length})` : 'Popular Searches'}
              </p>

              {filteredProviders.length > 0 ? (
                filteredProviders.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      handleSelectKaarigar(p.id);
                      setShowSearchModal(false);
                    }}
                    className="w-full text-left p-3 rounded-2xl hover:bg-emerald-50/70 border border-slate-100 flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={p.avatar_url} alt={p.name} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                      <div>
                        <p className="font-bold text-xs text-slate-900 group-hover:text-[#004331]">{p.name}</p>
                        <p className="text-[11px] text-slate-500 font-medium">{p.profession} · {p.locality}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-[#004331]">Rs. {p.starting_price}</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-slate-400 font-medium">
                  No matching Kaarigars found for "{searchQuery}"
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-3 font-medium">
              <span>Press <kbd className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200 font-mono text-slate-600">ESC</kbd> to close</span>
              <span className="text-[#004331] font-bold">Press <kbd className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200 font-mono text-slate-600">⌘K</kbd> anytime</span>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      <Suspense fallback={null}>
        {bookingProvider && (
          <BookingModal
            provider={bookingProvider}
            onClose={() => setBookingProvider(null)}
            onSuccess={handleBookingSuccess}
          />
        )}

        {/* Provider Onboarding Modal */}
        {showOnboardingModal && (
          <ProviderOnboardingModal
            isOpen={showOnboardingModal}
            onClose={() => setShowOnboardingModal(false)}
            onComplete={handleOnboardingComplete}
          />
        )}

        {/* Realtime Messaging Drawer */}
        {showChatDrawer && (
          <ChatDrawer
            isOpen={showChatDrawer}
            onClose={() => setShowChatDrawer(false)}
          />
        )}
      </Suspense>
    </div>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <ToastProvider>
            <ScrollToTop />
            <AppRoutes />
          </ToastProvider>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
