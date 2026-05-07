import React, { useState, useEffect, useRef } from 'react';
import { Plus, Search, AlertTriangle, Droplet, Package, TrendingDown } from 'lucide-react';
import { useStocks } from '../hooks/useStocks';
import StockList from '../components/stock/StockList';
import AddStockModal from '../components/modals/AddStockModal';

export default function StocksPage({ onStockClick, isAdmin }) {
  const { stocks, loading, error, refetch } = useStocks();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredStocks = Array.isArray(stocks)
    ? stocks.filter(stock =>
      stock.golongan_darah.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.lokasi_penyimpanan.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  const lowStocks = Array.isArray(filteredStocks)
    ? filteredStocks.filter(stock => stock.jumlah_kantong < 20)
    : [];

  const totalBags = Array.isArray(filteredStocks)
    ? filteredStocks.reduce((sum, stock) => sum + stock.jumlah_kantong, 0)
    : 0;

  const criticalStocks = Array.isArray(filteredStocks)
    ? filteredStocks.filter(stock => stock.jumlah_kantong < 10).length
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 pb-20">
      {/* Header */}
      <div
        className={`bg-gradient-to-r from-red-600 to-red-700 shadow-2xl sticky top-0 z-50 transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                <Droplet className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1 drop-shadow-lg">Stok Darah</h1>
                <p className="text-red-100 text-sm flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Monitor ketersediaan stok darah
                </p>
              </div>
            </div>

            {/* Tombol Tambah hanya untuk Admin */}
            {isAdmin && (
              <button
                onClick={() => setShowAddModal(true)}
                className="group flex items-center gap-2 px-6 py-3 bg-white text-red-600 rounded-xl hover:bg-red-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                <span className="hidden sm:inline">Tambah Stok</span>
                <span className="sm:hidden">Tambah</span>
              </button>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/30 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-red-100 text-xs sm:text-sm">Total Jenis</p>
                  <p className="text-white text-xl sm:text-2xl font-bold">{filteredStocks.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/30 rounded-lg flex items-center justify-center">
                  <Droplet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-red-100 text-xs sm:text-sm">Total Kantong</p>
                  <p className="text-white text-xl sm:text-2xl font-bold">{totalBags}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/30 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-red-100 text-xs sm:text-sm">Stok Kritis</p>
                  <p className="text-white text-xl sm:text-2xl font-bold">{criticalStocks}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari berdasarkan golongan darah atau lokasi penyimpanan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-xl focus:ring-2 focus:ring-white focus:border-white shadow-lg placeholder:text-gray-500 transition-all"
            />
          </div>

          {/* Warning stok rendah */}
          {lowStocks.length > 0 && (
            <div className="bg-orange-500/20 backdrop-blur-md border-2 border-orange-300/50 rounded-xl p-4 flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm mb-1">Peringatan Stok Rendah!</p>
                <p className="text-red-100 text-sm">
                  Terdapat {lowStocks.length} jenis stok yang menipis (kurang dari 20 kantong). Segera lakukan pengisian ulang.
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="h-1 bg-gradient-to-b from-black/10 to-transparent"></div>
      </div>

      <div className="h-8"></div>

      <main className="relative z-0 max-w-7xl mx-auto px-4 py-6">
        <StockList
          stocks={filteredStocks}
          loading={loading}
          error={error}
          onStockClick={onStockClick}
          onRetry={refetch}
        />
      </main>

      {isAdmin && (
        <AddStockModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSuccess={() => refetch()}
        />
      )}
    </div>
  );
}