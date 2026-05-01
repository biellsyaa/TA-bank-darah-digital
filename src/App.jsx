import React, { useState, useEffect } from 'react';
import BottomNav from './components/navbar/BottomNav';
import DonorsPage from './pages/DonorsPage';
import DonorDetailPage from './pages/DonorDetailPage';
import StocksPage from './pages/StocksPage';
import StockDetailPage from './pages/StockDetailPage';
import ProfilePage from './pages/ProfilePage';
import PermintaanPage from './pages/PermintaanPage';
import SplashScreen from './pages/SplashScreen';
import LoginPage from './pages/LoginPage';
import InstallPWA from './components/InstallPWA';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, loading: authLoading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState('donors');
  const [selectedDonorId, setSelectedDonorId] = useState(null);
  const [selectedStockId, setSelectedStockId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setSelectedDonorId(null);
    setSelectedStockId(null);
  };

  const handleDonorClick = (donorId) => {
    setSelectedDonorId(donorId);
    setCurrentPage('donor-detail');
  };

  const handleStockClick = (stockId) => {
    setSelectedStockId(stockId);
    setCurrentPage('stock-detail');
  };

  const handleBack = () => {
    if (currentPage === 'donor-detail') { setCurrentPage('donors'); setSelectedDonorId(null); }
    else if (currentPage === 'stock-detail') { setCurrentPage('stocks'); setSelectedStockId(null); }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'donors': return <DonorsPage onDonorClick={handleDonorClick} />;
      case 'donor-detail': return <DonorDetailPage donorId={selectedDonorId} onBack={handleBack} />;
      case 'stocks': return <StocksPage onStockClick={handleStockClick} />;
      case 'stock-detail': return <StockDetailPage stockId={selectedStockId} onBack={handleBack} />;
      case 'permintaan': return <PermintaanPage />;
      case 'profile': return <ProfilePage />;
      default: return <DonorsPage onDonorClick={handleDonorClick} />;
    }
  };

  // Tunggu cek session dulu (hindari flash login page)
  if (authLoading) {
    return (
      <div className="min-h-screen bg-red-600 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (showSplash) return <SplashScreen onFinish={() => setShowSplash(false)} />;

  // Belum login → Login Page
  if (!user) return <LoginPage />;

  // Sudah login → App normal
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="min-h-screen">{renderPage()}</main>
      <InstallPWA />
      {!currentPage.includes('detail') && (
        <BottomNav currentPage={currentPage} onNavigate={handleNavigation} />
      )}
    </div>
  );
}

export default App;