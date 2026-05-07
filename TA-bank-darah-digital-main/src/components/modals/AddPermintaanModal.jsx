import React, { useState, useEffect } from 'react';
import { X, Save, Loader } from 'lucide-react';
import permintaanService from '../../services/permintaanService';
import donorService from '../../services/donorService';
import stockService from '../../services/stockService';

export default function AddPermintaanModal({ isOpen, onClose, onSuccess }) {
    const [loading, setLoading] = useState(false);
    const [donors, setDonors] = useState([]);
    const [stocks, setStocks] = useState([]);

    const [formData, setFormData] = useState({
        nama_pasien: '',
        golongan_darah: 'A+',
        jumlah_kantong: 1,
        nama_rumah_sakit: '',
        nama_dokter: '',
        catatan: '',
        donor_id: '',
        stok_id: '',
        status: 'menunggu'
    });

    useEffect(() => {
        if (isOpen) {
            // Load donors dan stok sebagai referensi pilihan
            donorService.getDonors().then(d => setDonors(d || [])).catch(() => { });
            stockService.getStocks().then(s => setStocks(s || [])).catch(() => { });
        }
    }, [isOpen]);

    // Filter donor dan stok berdasarkan golongan darah yang dipilih
    const filteredDonors = donors.filter(d => d.golongan_darah === formData.golongan_darah);
    const filteredStocks = stocks.filter(s => s.golongan_darah === formData.golongan_darah);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            // Reset donor/stok kalau golongan darah berubah
            ...(name === 'golongan_darah' ? { donor_id: '', stok_id: '' } : {})
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.nama_pasien || !formData.nama_rumah_sakit) {
            alert('❌ Nama pasien dan rumah sakit wajib diisi');
            return;
        }

        setLoading(true);
        try {
            const payload = {
                ...formData,
                jumlah_kantong: parseInt(formData.jumlah_kantong),
                donor_id: formData.donor_id || null,
                stok_id: formData.stok_id || null,
            };
            await permintaanService.createPermintaan(payload);
            alert('✅ Permintaan darah berhasil ditambahkan!');
            if (onSuccess) onSuccess();
            onClose();
            setFormData({
                nama_pasien: '', golongan_darah: 'A+', jumlah_kantong: 1,
                nama_rumah_sakit: '', nama_dokter: '', catatan: '',
                donor_id: '', stok_id: '', status: 'menunggu'
            });
        } catch (err) {
            alert('❌ Gagal menambahkan: ' + (err || 'Terjadi kesalahan'));
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-red-600 text-white p-4 flex justify-between items-center rounded-t-2xl z-10">
                    <h3 className="font-bold text-lg">Tambah Permintaan Darah</h3>
                    <button onClick={onClose} disabled={loading} className="hover:bg-red-700 p-1 rounded-full">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Pasien *</label>
                            <input type="text" name="nama_pasien" value={formData.nama_pasien} onChange={handleChange}
                                placeholder="Nama lengkap pasien"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Golongan Darah *</label>
                            <select name="golongan_darah" value={formData.golongan_darah} onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Rumah Sakit *</label>
                            <input type="text" name="nama_rumah_sakit" value={formData.nama_rumah_sakit} onChange={handleChange}
                                placeholder="RS / Klinik"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Dokter</label>
                            <input type="text" name="nama_dokter" value={formData.nama_dokter} onChange={handleChange}
                                placeholder="Opsional"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Kantong *</label>
                            <input type="number" name="jumlah_kantong" min="1" value={formData.jumlah_kantong} onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <select name="status" value={formData.status} onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
                                <option value="menunggu">Menunggu</option>
                                <option value="diproses">Diproses</option>
                                <option value="selesai">Selesai</option>
                                <option value="ditolak">Ditolak</option>
                            </select>
                        </div>
                    </div>

                    {/* Link ke Pendonor */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Pendonor Terkait (opsional)
                            <span className="ml-2 text-xs text-gray-400">— golongan {formData.golongan_darah}</span>
                        </label>
                        <select name="donor_id" value={formData.donor_id} onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
                            <option value="">— Pilih pendonor —</option>
                            {filteredDonors.map(d => (
                                <option key={d.id} value={d.id}>{d.nama} ({d.golongan_darah})</option>
                            ))}
                        </select>
                        {filteredDonors.length === 0 && (
                            <p className="text-xs text-orange-500 mt-1">Tidak ada pendonor dengan golongan {formData.golongan_darah}</p>
                        )}
                    </div>

                    {/* Link ke Stok */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Stok Darah Terkait (opsional)
                            <span className="ml-2 text-xs text-gray-400">— golongan {formData.golongan_darah}</span>
                        </label>
                        <select name="stok_id" value={formData.stok_id} onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
                            <option value="">— Pilih stok —</option>
                            {filteredStocks.map(s => (
                                <option key={s.id} value={s.id}>{s.golongan_darah} — {s.jumlah_kantong} kantong ({s.lokasi_penyimpanan})</option>
                            ))}
                        </select>
                    </div>

                    {/* Catatan */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Catatan</label>
                        <textarea name="catatan" rows="2" value={formData.catatan} onChange={handleChange}
                            placeholder="Keterangan tambahan..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 resize-none" />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} disabled={loading}
                            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                            Batal
                        </button>
                        <button type="submit" disabled={loading}
                            className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2">
                            {loading ? <><Loader className="w-5 h-5 animate-spin" />Menyimpan...</> : <><Save className="w-5 h-5" />Simpan</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}