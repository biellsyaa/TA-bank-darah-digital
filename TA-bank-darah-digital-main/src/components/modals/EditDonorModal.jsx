import React, { useState, useEffect } from 'react';
import { X, Save, Loader } from 'lucide-react';
import { useUpdateDonor } from '../../hooks/useDonors';

export default function EditDonorModal({ isOpen, onClose, onSuccess, donor }) {
  const { updateDonor, loading } = useUpdateDonor();
  
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

  useEffect(() => {
    if (donor && isOpen) {
      setFormData({
        nama: donor.nama || '',
        golongan_darah: donor.golongan_darah || 'A+',
        jenis_kelamin: donor.jenis_kelamin || 'Laki-laki',
        tanggal_lahir: donor.tanggal_lahir || '',
        no_telepon: donor.no_telepon || '',
        alamat: donor.alamat || '',
        tanggal_donor_terakhir: donor.tanggal_donor_terakhir || ''
      });
    }
  }, [donor, isOpen]);

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
    }

    if (!formData.tanggal_lahir) {
      newErrors.tanggal_lahir = 'Tanggal lahir wajib diisi';
    }

    if (!formData.no_telepon.trim()) {
      newErrors.no_telepon = 'Nomor telepon wajib diisi';
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

    const result = await updateDonor(donor.id, formData);
    
    if (result.success) {
      alert('✅ Data pendonor berhasil diperbarui!');
      
      if (onSuccess) {
        onSuccess();
      }
      
      onClose();
    } else {
      alert('❌ Gagal memperbarui pendonor: ' + (result.error || 'Terjadi kesalahan'));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-blue-600 text-white p-4 flex justify-between items-center rounded-t-2xl z-10">
          <h3 className="font-bold text-lg">Edit Data Pendonor</h3>
          <button onClick={onClose} disabled={loading} className="hover:bg-blue-700 p-1 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap *</label>
            <input type="text" name="nama" value={formData.nama} onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.nama ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Golongan Darah *</label>
              <select name="golongan_darah" value={formData.golongan_darah} onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Kelamin *</label>
              <select name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Lahir *</label>
            <input type="date" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.tanggal_lahir ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.tanggal_lahir && <p className="text-red-500 text-xs mt-1">{errors.tanggal_lahir}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">No. Telepon *</label>
            <input type="tel" name="no_telepon" value={formData.no_telepon} onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.no_telepon ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.no_telepon && <p className="text-red-500 text-xs mt-1">{errors.no_telepon}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap *</label>
            <textarea name="alamat" rows="3" value={formData.alamat} onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none ${errors.alamat ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.alamat && <p className="text-red-500 text-xs mt-1">{errors.alamat}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Donor Terakhir *</label>
            <input type="date" name="tanggal_donor_terakhir" value={formData.tanggal_donor_terakhir} onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.tanggal_donor_terakhir ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.tanggal_donor_terakhir && <p className="text-red-500 text-xs mt-1">{errors.tanggal_donor_terakhir}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} disabled={loading}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50">
              Batal
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <><Loader className="w-5 h-5 animate-spin" />Menyimpan...</> : <><Save className="w-5 h-5" />Simpan Perubahan</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}