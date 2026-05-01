import React, { useState } from 'react';
import { Trash2, RotateCcw, ArrowLeft, Loader } from 'lucide-react';
import { useTrashedDonors, useRestoreDonor, useHardDeleteDonor } from '../hooks/useDonors';
import { formatDate } from '../utils/helpers';

export default function TrashPage({ onBack }) {
  const { donors, loading, error, refetch } = useTrashedDonors();
  const { restoreDonor } = useRestoreDonor();
  const { hardDeleteDonor } = useHardDeleteDonor();
  const [loadingId, setLoadingId] = useState(null);

  const handleRestore = async (id) => {
    setLoadingId(id);
    const result = await restoreDonor(id);
    if (result.success) {
      alert('✅ Pendonor berhasil dipulihkan!');
      refetch();
    } else {
      alert('❌ Gagal memulihkan: ' + result.error);
    }
    setLoadingId(null);
  };

  const handleHardDelete = async (id, nama) => {
    if (window.confirm(`⚠️ Hapus permanen "${nama}"? Data tidak bisa dikembalikan!`)) {
      setLoadingId(id);
      const result = await hardDeleteDonor(id);
      if (result.success) {
        alert('🗑️ Pendonor berhasil dihapus permanen!');
        refetch();
      } else {
        alert('❌ Gagal menghapus permanen: ' + result.error);
      }
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                  <Trash2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Sampah</h1>
                  <p className="text-gray-300 text-sm">
                    {donors.length} pendonor dihapus
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-center">
            {error}
          </div>
        )}

        {!loading && !error && donors.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Trash2 className="w-12 h-12 text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-500 mb-2">Sampah Kosong</h3>
            <p className="text-gray-400">Tidak ada pendonor yang dihapus</p>
          </div>
        )}

        {!loading && donors.length > 0 && (
          <div className="space-y-3">
            {donors.map((donor) => (
              <div
                key={donor.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-gray-500">
                      {donor.golongan_darah}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-800 truncate">{donor.nama}</p>
                    <p className="text-sm text-gray-500">{donor.no_telepon}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Dihapus: {formatDate(donor.deleted_at)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleRestore(donor.id)}
                    disabled={loadingId === donor.id}
                    className="flex items-center gap-1.5 px-3 py-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
                    title="Pulihkan"
                  >
                    {loadingId === donor.id
                      ? <Loader className="w-4 h-4 animate-spin" />
                      : <RotateCcw className="w-4 h-4" />
                    }
                    <span className="hidden sm:inline">Pulihkan</span>
                  </button>
                  <button
                    onClick={() => handleHardDelete(donor.id, donor.nama)}
                    disabled={loadingId === donor.id}
                    className="flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
                    title="Hapus Permanen"
                  >
                    {loadingId === donor.id
                      ? <Loader className="w-4 h-4 animate-spin" />
                      : <Trash2 className="w-4 h-4" />
                    }
                    <span className="hidden sm:inline">Hapus Permanen</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}