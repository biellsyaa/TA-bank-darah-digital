import React, { useState, useEffect } from 'react';
import { X, Save, Loader } from 'lucide-react';
import { useUpdateStock } from '../../hooks/useStocks';

export default function EditStockModal({ isOpen, onClose, onSuccess, stock }) {
  const { updateStock, loading } = useUpdateStock();
  
  const [formData, setFormData] = useState({
    golongan_darah: '',
    jumlah_kantong: '',
    tanggal_kadaluarsa: '',
    lokasi_penyimpanan: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (stock && isOpen) {
      setFormData({
        golongan_darah: stock.golongan_darah || '',
        jumlah_kantong: stock.jumlah_kantong || '',
        tanggal_kadaluarsa: stock.tanggal_kadaluarsa || '',
        lokasi_penyimpanan: stock.lokasi_penyimpanan || ''
      });
    }
  }, [stock, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.jumlah_kantong || formData.jumlah_kantong <= 0) {
      newErrors.jumlah_kantong = 'Jumlah kantong harus lebih dari 0';
    }

    if (!formData.tanggal_kadaluarsa) {
      newErrors.tanggal_kadaluarsa = 'Tanggal kadaluarsa wajib diisi';
    }

    if (!formData.lokasi_penyimpanan.trim()) {
      newErrors.lokasi_penyimpanan = 'Lokasi penyimpanan wajib diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    console.log('Updating stock:', formData);
    
    const result = await updateStock(stock.id, {
      ...formData,
      jumlah_kantong: parseInt(formData.jumlah_kantong),
      updated_at: new Date().toISOString()
    });
    
    if (result.success) {
      alert('✅ Stok berhasil diperbarui!');
      
      if (onSuccess) {
        onSuccess();
      }
      
      onClose();
    } else {
      alert('❌ Gagal memperbarui stok: ' + (result.error || 'Terjadi kesalahan'));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center rounded-t-2xl">
          <h3 className="font-bold text-lg">Edit Stok Darah</h3>
          <button 
            onClick={onClose}
            disabled={loading}
            className="hover:bg-blue-700 p-1 rounded-full transition-colors disabled:opacity-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Golongan Darah */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Golongan Darah <span className="text-red-500">*</span>
            </label>
            <select
              name="golongan_darah"
              value={formData.golongan_darah}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

          {/* Jumlah Kantong */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jumlah Kantong <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="jumlah_kantong"
              min="1"
              value={formData.jumlah_kantong}
              onChange={handleChange}
              placeholder="Masukkan jumlah kantong"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.jumlah_kantong ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.jumlah_kantong && (
              <p className="text-red-500 text-xs mt-1">{errors.jumlah_kantong}</p>
            )}
          </div>

          {/* Tanggal Kadaluarsa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Kadaluarsa <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="tanggal_kadaluarsa"
              value={formData.tanggal_kadaluarsa}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.tanggal_kadaluarsa ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.tanggal_kadaluarsa && (
              <p className="text-red-500 text-xs mt-1">{errors.tanggal_kadaluarsa}</p>
            )}
          </div>

          {/* Lokasi Penyimpanan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lokasi Penyimpanan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lokasi_penyimpanan"
              value={formData.lokasi_penyimpanan}
              onChange={handleChange}
              placeholder="Contoh: Lemari Es A1"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.lokasi_penyimpanan ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.lokasi_penyimpanan && (
              <p className="text-red-500 text-xs mt-1">{errors.lokasi_penyimpanan}</p>
            )}
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
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Simpan Perubahan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}