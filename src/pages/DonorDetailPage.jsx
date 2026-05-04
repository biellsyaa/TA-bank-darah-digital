import React, { useState } from 'react';
import { ArrowLeft, Phone, MapPin, Calendar, User, Droplet, Edit, Trash2 } from 'lucide-react';
import { useDonor, useDeleteDonor } from '../hooks/useDonors';
import { formatDate, calculateAge } from '../utils/helpers';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import EditDonorModal from '../components/modals/EditDonorModal';

export default function DonorDetailPage({ donorId, onBack, isAdmin }) {
  const { donor, loading, error, refetch } = useDonor(donorId);
  const { deleteDonor, loading: deleting } = useDeleteDonor();
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pendonor ini?')) {
      const result = await deleteDonor(donorId);
      if (result.success) {
        alert('Pendonor berhasil dihapus!');
        onBack();
      } else {
        alert('Gagal menghapus pendonor: ' + result.error);
      }
    }
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
          <button onClick={onBack} className="px-4 py-2 bg-red-600 text-white rounded-lg">Kembali</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Kembali</span>
          </button>

          {/* Tombol Edit & Hapus hanya untuk Admin */}
          {isAdmin && (
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
                title="Hapus"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 px-4 py-8 text-center">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
          <span className="text-red-600 font-bold text-2xl">{donor.golongan_darah}</span>
        </div>
        <h1 className="text-2xl font-bold text-white">{donor.nama}</h1>
        <p className="text-red-200 mt-1">Pendonor Aktif</p>
      </div>

      {/* Info Cards */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-bold text-gray-800 mb-4 text-lg">Informasi Pribadi</h3>
          <div className="space-y-3">
            <InfoRow icon={<User className="w-5 h-5 text-red-500" />} label="Nama Lengkap" value={donor.nama} />
            <InfoRow icon={<Droplet className="w-5 h-5 text-red-500" />} label="Golongan Darah" value={donor.golongan_darah} />
            <InfoRow icon={<Calendar className="w-5 h-5 text-red-500" />} label="Tanggal Lahir"
              value={donor.tanggal_lahir ? `${formatDate(donor.tanggal_lahir)} (${calculateAge(donor.tanggal_lahir)} tahun)` : '-'} />
            <InfoRow icon={<Phone className="w-5 h-5 text-red-500" />} label="No. Telepon" value={donor.no_telepon || '-'} />
            <InfoRow icon={<MapPin className="w-5 h-5 text-red-500" />} label="Alamat" value={donor.alamat || '-'} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-bold text-gray-800 mb-4 text-lg">Riwayat Donor</h3>
          <div className="space-y-3">
            <InfoRow icon={<Calendar className="w-5 h-5 text-blue-500" />} label="Donor Terakhir"
              value={donor.tanggal_donor_terakhir ? formatDate(donor.tanggal_donor_terakhir) : 'Belum ada riwayat'} />
            <InfoRow icon={<Droplet className="w-5 h-5 text-blue-500" />} label="Total Donor"
              value={donor.total_donor ? `${donor.total_donor} kali` : '0 kali'} />
          </div>
        </div>

        {donor.catatan && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-gray-800 mb-3 text-lg">Catatan</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{donor.catatan}</p>
          </div>
        )}
      </div>

      {isAdmin && (
        <EditDonorModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          donor={donor}
          onSuccess={() => { setShowEditModal(false); refetch(); }}
        />
      )}
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex-shrink-0">{icon}</div>
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="text-gray-800 font-medium">{value}</p>
      </div>
    </div>
  );
}