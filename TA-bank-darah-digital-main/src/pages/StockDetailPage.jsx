import React, { useState } from 'react';
import { ArrowLeft, Droplet, Calendar, MapPin, AlertTriangle, Edit, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { useStock, useDeleteStock, useUpdateStock } from '../hooks/useStocks';
import { formatDate, getStockStatus, getDaysUntilExpiry, isExpiringSoon } from '../utils/helpers';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import EditStockModal from '../components/modals/EditStockModal';

export default function StockDetailPage({ stockId, onBack }) {
  const { stock, loading, error, refetch } = useStock(stockId);
  const { deleteStock, loading: deleting } = useDeleteStock();
  const { updateStock, loading: updating } = useUpdateStock();
  
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [quantityAction, setQuantityAction] = useState('add');
  const [quantityChange, setQuantityChange] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus stok ${stock?.golongan_darah}?`)) {
      const result = await deleteStock(stockId);
      if (result.success) {
        alert('✅ Stok berhasil dihapus!');
        onBack();
      } else {
        alert('❌ Gagal menghapus stok: ' + result.error);
      }
    }
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleEditSuccess = () => {
    refetch();
  };

  const handleQuantityUpdate = async () => {
    if (!quantityChange || parseInt(quantityChange) <= 0) {
      alert('❌ Jumlah harus lebih dari 0');
      return;
    }

    const change = quantityAction === 'add' 
      ? parseInt(quantityChange) 
      : -parseInt(quantityChange);

    const newQuantity = stock.jumlah_kantong + change;

    if (newQuantity < 0) {
      alert('❌ Stok tidak boleh negatif');
      return;
    }

    const result = await updateStock(stockId, {
      jumlah_kantong: newQuantity,
      golongan_darah: stock.golongan_darah,
      tanggal_kadaluarsa: stock.tanggal_kadaluarsa,
      lokasi_penyimpanan: stock.lokasi_penyimpanan,
      updated_at: new Date().toISOString()
    });

    if (result.success) {
      const action = quantityAction === 'add' ? 'ditambahkan' : 'dikurangi';
      alert(`✅ Stok berhasil ${action}!\n\nStok sebelumnya: ${stock.jumlah_kantong}\nPerubahan: ${change > 0 ? '+' : ''}${change}\nStok baru: ${newQuantity}`);
      setShowQuantityModal(false);
      setQuantityChange('');
      refetch();
    } else {
      alert('❌ Gagal memperbarui stok: ' + result.error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center">
        <LoadingSpinner message="Memuat detail stok..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center p-4">
        <ErrorMessage message={error} onRetry={onBack} />
      </div>
    );
  }

  if (!stock) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Stok tidak ditemukan</p>
          <button onClick={onBack} className="px-4 py-2 bg-red-600 text-white rounded-lg">
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const stockStatus = getStockStatus(stock.jumlah_kantong);
  const daysUntilExpiry = getDaysUntilExpiry(stock.tanggal_kadaluarsa);
  const expiringSoon = isExpiringSoon(stock.tanggal_kadaluarsa);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Kembali</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              title="Hapus"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Card */}
          <div className="bg-gradient-to-br from-red-500 to-red-600 p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-40 h-40 bg-white rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <Droplet className="w-20 h-20 text-white mx-auto mb-4 drop-shadow-lg" />
              <h2 className="text-5xl font-bold text-white mb-2">{stock.golongan_darah}</h2>
              <p className="text-red-100">Golongan Darah</p>
            </div>
          </div>

          {/* Quantity Display */}
          <div className="p-8 border-b border-gray-100">
            <div className="bg-red-50 rounded-2xl p-8 text-center">
              <p className="text-gray-600 mb-2">Jumlah Tersedia</p>
              <p className="text-7xl font-bold text-red-600 mb-2">{stock.jumlah_kantong}</p>
              <p className="text-gray-500">Kantong Darah</p>
            </div>
          </div>

          {/* Status & Details */}
          <div className="p-8 space-y-6">
            {/* Status Badge */}
            <div className={`text-center py-4 px-6 rounded-xl border-2 ${stockStatus.color}`}>
              <p className="font-bold text-lg mb-1">{stockStatus.status}</p>
              <p className="text-sm">{stockStatus.text}</p>
            </div>

            {/* Expiry Warning */}
            {expiringSoon && (
              <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-orange-600 mt-1" />
                <div>
                  <p className="font-semibold text-orange-900 mb-1">Peringatan Kadaluarsa!</p>
                  <p className="text-orange-700 text-sm">
                    Stok ini akan kadaluarsa dalam {daysUntilExpiry} hari. Segera gunakan atau buang jika sudah lewat tanggal.
                  </p>
                </div>
              </div>
            )}

            {/* Info Grid */}
            <div className="grid md:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Tanggal Kadaluarsa</p>
                  <p className="font-semibold text-gray-800">{formatDate(stock.tanggal_kadaluarsa)}</p>
                  <p className={`text-sm mt-1 ${daysUntilExpiry <= 7 ? 'text-orange-600' : 'text-green-600'}`}>
                    {daysUntilExpiry >= 0 ? `${daysUntilExpiry} hari lagi` : 'Sudah kadaluarsa'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Lokasi Penyimpanan</p>
                  <p className="font-semibold text-gray-800">{stock.lokasi_penyimpanan}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Terakhir Diperbarui</p>
                  <p className="font-semibold text-gray-800">{formatDate(stock.updated_at || stock.created_at)}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Droplet className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">ID Stok</p>
                  <p className="font-semibold text-gray-800 text-xs">{stock.id.substring(0, 8)}...</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-800 mb-4">Aksi Cepat</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    setQuantityAction('add');
                    setShowQuantityModal(true);
                  }}
                  disabled={updating}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors border border-green-200 disabled:opacity-50"
                >
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-medium">Tambah Stok</span>
                </button>
                <button
                  onClick={() => {
                    setQuantityAction('reduce');
                    setShowQuantityModal(true);
                  }}
                  disabled={updating}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors border border-orange-200 disabled:opacity-50"
                >
                  <TrendingDown className="w-5 h-5" />
                  <span className="font-medium">Kurangi Stok</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Quantity Update Modal */}
      {showQuantityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className={`${quantityAction === 'add' ? 'bg-green-600' : 'bg-orange-600'} text-white p-4 rounded-t-2xl`}>
              <h3 className="font-bold text-lg">
                {quantityAction === 'add' ? 'Tambah Stok' : 'Kurangi Stok'}
              </h3>
              <p className="text-sm opacity-90">
                {quantityAction === 'add' ? 'Masukkan jumlah kantong yang akan ditambahkan' : 'Masukkan jumlah kantong yang akan dikurangi'}
              </p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah Kantong
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantityChange}
                  onChange={(e) => setQuantityChange(e.target.value)}
                  placeholder="Masukkan jumlah"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  autoFocus
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-800 text-sm">
                  <strong>Stok saat ini:</strong> {stock.jumlah_kantong} kantong<br />
                  {quantityChange && (
                    <>
                      <strong>Stok setelah perubahan:</strong> {stock.jumlah_kantong + (quantityAction === 'add' ? parseInt(quantityChange) : -parseInt(quantityChange))} kantong
                    </>
                  )}
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowQuantityModal(false);
                    setQuantityChange('');
                  }}
                  disabled={updating}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  onClick={handleQuantityUpdate}
                  disabled={updating || !quantityChange}
                  className={`flex-1 px-4 py-3 ${quantityAction === 'add' ? 'bg-green-600 hover:bg-green-700' : 'bg-orange-600 hover:bg-orange-700'} text-white rounded-lg transition-colors disabled:opacity-50 font-medium`}
                >
                  {updating ? 'Memproses...' : 'Simpan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Stock Modal */}
      <EditStockModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSuccess={handleEditSuccess}
        stock={stock}
      />
    </div>
  );
}