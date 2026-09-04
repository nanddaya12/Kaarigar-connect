import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { HomePage } from './pages/public/HomePage';
import { KaarigarProfilePage } from './pages/public/KaarigarProfilePage';
import { SectorMap } from './components/marketplace/SectorMap';
import { AiDiagnosticWidget } from './components/ai/AiDiagnosticWidget';
import { OrderTracker } from './components/dashboard/OrderTracker';
import { ProviderDashboardPage } from './pages/provider/ProviderDashboardPage';
import { BookingModal } from './components/marketplace/BookingModal';
import { ChatDrawer } from './features/chat/ChatDrawer';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { mockServiceRequests, bookingService } from './services/bookingService';
import { marketplaceService } from './services/marketplaceService';
import { ProviderProfile, ServiceRequest } from './types/database.types';
import { Search, Sparkles, MapPin, X, Wrench, ShieldCheck } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { role } = useAuth();
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedProviderId, setSelectedProviderId] = useState<string>('kaarigar-1');
  const [bookingProvider, setBookingProvider] = useState<ProviderProfile | null>(null);
  const [activeRequest, setActiveRequest] = useState<ServiceRequest>(mockServiceRequests[0]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showChatDrawer, setShowChatDrawer] = useState(false);
  const [allProviders, setAllProviders] = useState<ProviderProfile[]>([]);

  useEffect(() => {
    marketplaceService.getProviders().then(setAllProviders);
  }, []);

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
    setActiveView('profile');
  };

  const handleBookNow = (provider: ProviderProfile) => {
    setBookingProvider(provider);
  };

  const handleBookingSuccess = (req: ServiceRequest) => {
    setActiveRequest(req);
    setBookingProvider(null);
    setActiveView('tracking');
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
        onNavigate={setActiveView}
        onOpenSearch={() => setShowSearchModal(true)}
        onOpenChat={() => setShowChatDrawer(true)}
      />

      <main className="flex-grow pt-16 sm:pt-20 pb-20 lg:pb-12">
        {activeView === 'home' && (
          <HomePage
            onSelectKaarigar={handleSelectKaarigar}
            onBookKaarigar={handleBookNow}
            onNavigate={setActiveView}
          />
        )}

        {(activeView === 'map' || activeView === 'explore') && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <SectorMap
              providers={allProviders}
              onSelectProvider={handleSelectKaarigar}
            />
          </div>
        )}

        {activeView === 'ai_triage' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
            <AiDiagnosticWidget onSelectKaarigar={handleSelectKaarigar} />
          </div>
        )}

        {activeView === 'profile' && (
          <KaarigarProfilePage
            providerId={selectedProviderId}
            onBookNow={handleBookNow}
          />
        )}

        {(activeView === 'tracking' || activeView === 'requests' || activeView === 'provider_requests' || activeView === 'provider_jobs') && (
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
        )}

        {(activeView === 'provider' || activeView === 'provider_earnings') && <ProviderDashboardPage />}

        {(activeView === 'admin' || activeView.startsWith('admin_')) && <AdminDashboardPage />}
      </main>

      <Footer onNavigate={setActiveView} />
      <MobileNav activeView={activeView} onNavigate={setActiveView} />

      {/* Global Interactive Search Modal (Cmd+K / Ctrl+K) */}
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

            {/* Live Search Input */}
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

            {/* Search Suggestions & Results */}
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

            {/* Modal Footer Keybind Info */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-3 font-medium">
              <span>Press <kbd className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200 font-mono text-slate-600">ESC</kbd> to close</span>
              <span className="text-[#004331] font-bold">Press <kbd className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200 font-mono text-slate-600">⌘K</kbd> anytime</span>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {bookingProvider && (
        <BookingModal
          provider={bookingProvider}
          onClose={() => setBookingProvider(null)}
          onSuccess={handleBookingSuccess}
        />
      )}

      {/* Realtime Messaging Drawer */}
      <ChatDrawer
        isOpen={showChatDrawer}
        onClose={() => setShowChatDrawer(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}

export default App;
