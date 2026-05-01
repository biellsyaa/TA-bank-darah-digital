import React, { useState } from 'react';
import { ArrowLeft, Phone, MapPin, Calendar, User, Droplet, Edit, Trash2 } from 'lucide-react';
import { useDonor, useSoftDeleteDonor } from '../hooks/useDonors';
import { formatDate, calculateAge } from '../utils/helpers';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import EditDonorModal from '../components/modals/EditDonorModal';

export default function DonorDetailPage({ donorId, onBack }) {
  const { donor, loading, error, refetch } = useDonor(donorId);
  const { softDeleteDonor, loading: deleting } = useSoftDeleteDonor();
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Pindahkan pendonor ini ke sampah? Kamu bisa memulihkannya nanti di halaman Sampah.')) {
      const result = await softDeleteDonor(donorId);
      if (result.success) {
        alert('🗑️ Pendonor dipindahkan ke sampah!');
        onBack();
      } else {
        alert('❌ Gagal memindahkan ke sampah: ' + result.error);
      }
    }
  };

  const handleEditSuccess = () => {
    refetch();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center">
        <LoadingSpinner message="Memuat detail pendonor..." />
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

  if (!donor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Pendonor tidak ditemukan</p>
          <button onClick={onBack} className="px-4 py-2 bg-red-600 text-white rounded-lg">
            Kembali
          </button>
        </div>
      </div>
    );
  }

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
              onClick={() => setShowEditModal(true)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              title="Pindah ke Sampah"
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
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-40 h-40 bg-white rounded-full"></div>
            </div>
            <div className="relative z-10">
              <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg">
                <User className="w-12 h-12 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">{donor.nama}</h2>
              <div className="inline-block bg-white px-6 py-2 rounded-full mt-2">
                <span className="text-red-600 font-bold text-2xl">{donor.golongan_darah}</span>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Jenis Kelamin</p>
                  <p className="font-semibold text-gray-800">{donor.jenis_kelamin}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Tanggal Lahir</p>
                  <p className="font-semibold text-gray-800">{formatDate(donor.tanggal_lahir)}</p>
                  <p className="text-sm text-gray-500">Usia: {calculateAge(donor.tanggal_lahir)} tahun</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">No. Telepon</p>
                  <p className="font-semibold text-gray-800">{donor.no_telepon}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Droplet className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Donor Terakhir</p>
                  <p className="font-semibold text-gray-800">{formatDate(donor.tanggal_donor_terakhir)}</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="border-t pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Alamat Lengkap</p>
                  <p className="font-semibold text-gray-800 leading-relaxed">{donor.alamat}</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Informasi Tambahan</h3>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• Data pendonor ini tercatat sejak {formatDate(donor.created_at)}</li>
                <li>• Pastikan data selalu diperbarui untuk akurasi informasi</li>
                <li>• Hubungi pendonor minimal 3 hari sebelum donor berikutnya</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <EditDonorModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSuccess={handleEditSuccess}
        donor={donor}
      />
    </div>
  );
}