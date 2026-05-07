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
import TrashPage from './pages/TrashPage';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, role, loading: authLoading, isAdmin } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState('donors');
  const [selectedDonorId, setSelectedDonorId] = useState(null);
  const [selectedStockId, setSelectedStockId] = useState(null);

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

  const handleTrashClick = () => {
    setCurrentPage('trash');
  };

  const handleBack = () => {
    if (currentPage === 'donor-detail') { setCurrentPage('donors'); setSelectedDonorId(null); }
    else if (currentPage === 'stock-detail') { setCurrentPage('stocks'); setSelectedStockId(null); }
    else if (currentPage === 'trash') { setCurrentPage('donors'); }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'donors':
        return <DonorsPage onDonorClick={handleDonorClick} onTrashClick={handleTrashClick} isAdmin={isAdmin} />;
      case 'donor-detail':
        return <DonorDetailPage donorId={selectedDonorId} onBack={handleBack} isAdmin={isAdmin} />;
      case 'stocks':
        return <StocksPage onStockClick={handleStockClick} isAdmin={isAdmin} />;
      case 'stock-detail':
        return <StockDetailPage stockId={selectedStockId} onBack={handleBack} isAdmin={isAdmin} />;
      case 'permintaan':
        return <PermintaanPage isAdmin={isAdmin} />;
      case 'profile':
        return <ProfilePage />;
      case 'trash':
        return <TrashPage onBack={handleBack} />;
      default:
        return <DonorsPage onDonorClick={handleDonorClick} onTrashClick={handleTrashClick} isAdmin={isAdmin} />;
    }
  };

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-red-600 flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white text-sm">Memeriksa sesi...</p>
      </div>
    );
  }

  if (!user) return <LoginPage />;

  return (
    <div className="min-h-screen bg-gray-50">
      {role && (
        <div className={`text-center text-xs py-1 font-medium ${isAdmin ? 'bg-red-600 text-white' : 'bg-blue-500 text-white'}`}>
          {isAdmin ? '🔑 Mode Admin — Akses Penuh' : '👤 Mode Pasien — Akses Terbatas'}
        </div>
      )}
      <main className="min-h-screen">{renderPage()}</main>
      <InstallPWA />
      {!currentPage.includes('detail') && currentPage !== 'trash' && (
        <BottomNav currentPage={currentPage} onNavigate={handleNavigation} />
      )}
    </div>
  );
}

export default App;