import React, { useState, useEffect, useRef } from 'react';
import { Plus, Search, Users, TrendingUp, Activity, Trash2 } from 'lucide-react';
import { useDonors } from '../hooks/useDonors';
import DonorList from '../components/donor/DonorList';
import AddDonorModal from '../components/modals/AddDonorModal';

export default function DonorsPage({ onDonorClick, onTrashClick }) {
  const { donors, loading, error, refetch } = useDonors();
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

  const filteredDonors = Array.isArray(donors)
    ? donors.filter(donor =>
        donor.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        donor.golongan_darah.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const uniqueBloodTypes = Array.isArray(donors)
    ? [...new Set(donors.map(d => d.golongan_darah))].length
    : 0;

  const recentDonors = Array.isArray(donors)
    ? donors.filter(d => {
        const donorDate = new Date(d.tanggal_donor_terakhir);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return donorDate >= thirtyDaysAgo;
      }).length
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 pb-20">
      {/* Header */}
      <div
        className={`bg-gradient-to-r from-red-600 to-red-700 shadow-2xl sticky top-0 z-50 transition-transform duration-300 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Top Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1 drop-shadow-lg">
                  Daftar Pendonor
                </h1>
                <p className="text-red-100 text-sm flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Kelola data pendonor darah Anda
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Trash Button */}
              <button
                onClick={onTrashClick}
                className="flex items-center gap-2 px-4 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all duration-300 shadow-lg"
                title="Sampah"
              >
                <Trash2 className="w-5 h-5" />
                <span className="hidden sm:inline text-sm font-medium">Sampah</span>
              </button>

              {/* Add Button */}
              <button
                onClick={() => setShowAddModal(true)}
                className="group flex items-center gap-2 px-6 py-3 bg-white text-red-600 rounded-xl hover:bg-red-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                <span className="hidden sm:inline">Tambah Pendonor</span>
                <span className="sm:hidden">Tambah</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/30 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-red-100 text-xs sm:text-sm">Total Pendonor</p>
                  <p className="text-white text-xl sm:text-2xl font-bold">{filteredDonors.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/30 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-red-100 text-xs sm:text-sm">Donor Bulan Ini</p>
                  <p className="text-white text-xl sm:text-2xl font-bold">{recentDonors}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/30 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-red-100 text-xs sm:text-sm">Golongan Darah</p>
                  <p className="text-white text-xl sm:text-2xl font-bold">{uniqueBloodTypes}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari pendonor berdasarkan nama atau golongan darah..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-xl focus:ring-2 focus:ring-white focus:border-white shadow-lg placeholder:text-gray-500 transition-all"
            />
          </div>
        </div>
        <div className="h-1 bg-gradient-to-b from-black/10 to-transparent"></div>
      </div>

      <div className="h-8"></div>

      <main className="relative z-0 max-w-7xl mx-auto px-4 py-6">
        <DonorList
          donors={filteredDonors}
          loading={loading}
          error={error}
          onDonorClick={onDonorClick}
          onRetry={refetch}
        />
      </main>

      <AddDonorModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={refetch}
      />
    </div>
  );
}