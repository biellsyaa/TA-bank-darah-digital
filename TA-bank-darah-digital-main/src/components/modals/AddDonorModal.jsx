import React, { useState } from 'react';
import { X, Save, Loader } from 'lucide-react';
import { useCreateDonor } from '../../hooks/useDonors';

export default function AddDonorModal({ isOpen, onClose, onSuccess }) {
  const { createDonor, loading } = useCreateDonor();
  
  const [formData, setFormData] = useState({
    nama: '',
    golongan_darah: 'A+',
    jenis_kelamin: 'Laki-laki',
    tanggal_lahir: '',
    no_telepon: '',
    alamat: '',
    tanggal_donor_terakhir: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama wajib diisi';
    } else if (formData.nama.trim().length < 3) {
      newErrors.nama = 'Nama minimal 3 karakter';
    }

    if (!formData.tanggal_lahir) {
      newErrors.tanggal_lahir = 'Tanggal lahir wajib diisi';
    }

    if (!formData.no_telepon.trim()) {
      newErrors.no_telepon = 'Nomor telepon wajib diisi';
    } else if (!/^[0-9]{10,13}$/.test(formData.no_telepon.replace(/[^0-9]/g, ''))) {
      newErrors.no_telepon = 'Nomor telepon tidak valid (10-13 digit)';
    }

    if (!formData.alamat.trim()) {
      newErrors.alamat = 'Alamat wajib diisi';
    }

    if (!formData.tanggal_donor_terakhir) {
      newErrors.tanggal_donor_terakhir = 'Tanggal donor terakhir wajib diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    console.log('Submitting donor data:', formData);
    
    const result = await createDonor(formData);
    
    if (result.success) {
      alert('✅ Pendonor berhasil ditambahkan!');
      
      setFormData({
        nama: '',
        golongan_darah: 'A+',
        jenis_kelamin: 'Laki-laki',
        tanggal_lahir: '',
        no_telepon: '',
        alamat: '',
        tanggal_donor_terakhir: ''
      });
      setErrors({});
      
      if (onSuccess) {
        onSuccess();
      }
      
      onClose();
    } else {
      alert('❌ Gagal menambahkan pendonor: ' + (result.error || 'Terjadi kesalahan'));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-start justify-center z-[60] p-4 pt-20">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-red-600 text-white p-4 flex justify-between items-center rounded-t-2xl z-10">
          <h3 className="font-bold text-lg">Tambah Pendonor Baru</h3>
          <button 
            onClick={onClose} 
            disabled={loading}
            className="hover:bg-red-700 p-1 rounded-full transition-colors disabled:opacity-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nama Lengkap */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                errors.nama ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama}</p>}
          </div>

          {/* Golongan Darah & Jenis Kelamin */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Golongan Darah <span className="text-red-500">*</span>
              </label>
              <select
                name="golongan_darah"
                value={formData.golongan_darah}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jenis Kelamin <span className="text-red-500">*</span>
              </label>
              <select
                name="jenis_kelamin"
                value={formData.jenis_kelamin}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
          </div>

          {/* Tanggal Lahir */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Lahir <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="tanggal_lahir"
              value={formData.tanggal_lahir}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                errors.tanggal_lahir ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.tanggal_lahir && <p className="text-red-500 text-xs mt-1">{errors.tanggal_lahir}</p>}
          </div>

          {/* No. Telepon */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              No. Telepon <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="no_telepon"
              value={formData.no_telepon}
              onChange={handleChange}
              placeholder="08123456789"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                errors.no_telepon ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.no_telepon && <p className="text-red-500 text-xs mt-1">{errors.no_telepon}</p>}
          </div>

          {/* Alamat */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alamat Lengkap <span className="text-red-500">*</span>
            </label>
            <textarea
              name="alamat"
              rows="3"
              value={formData.alamat}
              onChange={handleChange}
              placeholder="Masukkan alamat lengkap"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none ${
                errors.alamat ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.alamat && <p className="text-red-500 text-xs mt-1">{errors.alamat}</p>}
          </div>

          {/* Tanggal Donor Terakhir */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Donor Terakhir <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="tanggal_donor_terakhir"
              value={formData.tanggal_donor_terakhir}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                errors.tanggal_donor_terakhir ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.tanggal_donor_terakhir && (
              <p className="text-red-500 text-xs mt-1">{errors.tanggal_donor_terakhir}</p>
            )}
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-blue-800 text-sm">
              💡 <strong>Tips:</strong> Pastikan semua data diisi dengan benar. Data akan langsung tersimpan ke database.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Simpan Data
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}