import React, { useState } from 'react';
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
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { SecurityAuditPanel } from './components/security/SecurityAuditPanel';
import { BookingModal } from './components/marketplace/BookingModal';
import { ChatDrawer } from './features/chat/ChatDrawer';
import { mockServiceRequests, bookingService } from './services/bookingService';
import { marketplaceService } from './services/marketplaceService';
import { ProviderProfile, ServiceRequest } from './types/database.types';

const MainAppContent: React.FC = () => {
  const { role } = useAuth();
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedProviderId, setSelectedProviderId] = useState<string>('kaarigar-1');
  const [bookingProvider, setBookingProvider] = useState<ProviderProfile | null>(null);
  const [activeRequest, setActiveRequest] = useState<ServiceRequest>(mockServiceRequests[0]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showChatDrawer, setShowChatDrawer] = useState(false);
  const [allProviders, setAllProviders] = useState<ProviderProfile[]>([]);

  React.useEffect(() => {
    marketplaceService.getProviders().then(setAllProviders);
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

  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen flex flex-col justify-between">
      <Navbar
        activeView={activeView}
        onNavigate={setActiveView}
        onOpenSearch={() => setShowSearchModal(true)}
        onOpenChat={() => setShowChatDrawer(true)}
      />

      <main className="flex-grow pt-24 pb-16">
        {activeView === 'home' && (
          <HomePage
            onSelectKaarigar={handleSelectKaarigar}
            onBookKaarigar={handleBookNow}
            onNavigate={setActiveView}
          />
        )}

        {activeView === 'map' && (
          <div className="max-w-7xl mx-auto px-6 py-4">
            <SectorMap
              providers={allProviders}
              onSelectProvider={handleSelectKaarigar}
            />
          </div>
        )}

        {activeView === 'ai_triage' && (
          <div className="max-w-4xl mx-auto px-6 py-4">
            <AiDiagnosticWidget onSelectKaarigar={handleSelectKaarigar} />
          </div>
        )}

        {activeView === 'profile' && (
          <KaarigarProfilePage
            providerId={selectedProviderId}
            onBookNow={handleBookNow}
          />
        )}

        {activeView === 'tracking' && (
          <div className="max-w-7xl mx-auto px-6 py-4">
            <OrderTracker
              request={activeRequest}
              onUpdateStatus={(status) => {
                bookingService.updateStatus(activeRequest.id, status).then(updated => {
                  if (updated) setActiveRequest({ ...updated });
                });
              }}
            />
          </div>
        )}

        {activeView === 'provider' && <ProviderDashboardPage />}
        {activeView === 'admin' && <AdminDashboardPage />}
        {activeView === 'security' && <SecurityAuditPanel />}
      </main>

      <Footer />
      <MobileNav activeView={activeView} onNavigate={setActiveView} />

      {/* Global Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-start justify-center pt-24 px-4">
          <div className="bg-white border border-outline-variant/40 rounded-2xl p-4 shadow-2xl max-w-xl w-full space-y-3 animate-fade-in">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <span className="font-bold text-sm text-primary">Global Search</span>
              <button onClick={() => setShowSearchModal(false)} className="text-xs font-bold text-outline">Esc</button>
            </div>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setActiveView('home');
                  setShowSearchModal(false);
                }}
                className="w-full text-left p-3 rounded-xl hover:bg-surface-container-low text-xs font-medium text-on-surface"
              >
                ❄️ AC Inverter PCB Diagnostics & Gas Refill
              </button>
              <button
                onClick={() => {
                  setActiveView('home');
                  setShowSearchModal(false);
                }}
                className="w-full text-left p-3 rounded-xl hover:bg-surface-container-low text-xs font-medium text-on-surface"
              >
                ⚡ Emergency Electrician (UPS & Short Circuit)
              </button>
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

      {/* Realtime Chat Drawer */}
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
