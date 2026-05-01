import React, { useState } from 'react';
import { Plus, Search, ClipboardList, Clock, CheckCircle, Loader2, Trash2, ChevronDown } from 'lucide-react';
import { usePermintaan } from '../hooks/usePermintaan';
import permintaanService from '../services/permintaanService';
import donorService from '../services/donorService';
import stockService from '../services/stockService';
import { formatDate } from '../utils/helpers';

const STATUS_OPTIONS = ['menunggu', 'diproses', 'selesai', 'ditolak'];
const STATUS_LABEL = { menunggu: 'Menunggu', diproses: 'Diproses', selesai: 'Selesai', ditolak: 'Ditolak' };
const STATUS_COLOR = {
    menunggu: 'bg-yellow-100 text-yellow-700',
    diproses: 'bg-blue-100 text-blue-700',
    selesai: 'bg-green-100 text-green-700',
    ditolak: 'bg-red-100 text-red-700',
};

// Modal Tambah Permintaan
function AddModal({ isOpen, onClose, onSuccess }) {
    const [loading, setLoading] = useState(false);
    const [donors, setDonors] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [form, setForm] = useState({
        nama_pasien: '', golongan_darah: 'A+', jumlah_kantong: 1,
        nama_rumah_sakit: '', nama_dokter: '', catatan: '',
        donor_id: '', stok_id: '', status: 'menunggu'
    });

    React.useEffect(() => {
        if (!isOpen) return;
        donorService.getDonors().then(d => setDonors(d || [])).catch(() => { });
        stockService.getStocks().then(s => setStocks(s || [])).catch(() => { });
    }, [isOpen]);

    const filteredDonors = donors.filter(d => d.golongan_darah === form.golongan_darah);
    const filteredStocks = stocks.filter(s => s.golongan_darah === form.golongan_darah);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value, ...(name === 'golongan_darah' ? { donor_id: '', stok_id: '' } : {}) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.nama_pasien || !form.nama_rumah_sakit) { alert('Nama pasien dan RS wajib diisi'); return; }
        setLoading(true);
        try {
            await permintaanService.createPermintaan({
                ...form,
                jumlah_kantong: parseInt(form.jumlah_kantong),
                donor_id: form.donor_id || null,
                stok_id: form.stok_id || null,
            });
            onSuccess();
            onClose();
            setForm({ nama_pasien: '', golongan_darah: 'A+', jumlah_kantong: 1, nama_rumah_sakit: '', nama_dokter: '', catatan: '', donor_id: '', stok_id: '', status: 'menunggu' });
        } catch (err) {
            alert('Gagal menyimpan: ' + (err || 'Terjadi kesalahan'));
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="bg-red-600 text-white p-4 rounded-t-2xl flex justify-between items-center sticky top-0">
                    <h3 className="font-bold text-lg">Buat Permintaan Darah</h3>
                    <button onClick={onClose} className="text-white hover:text-red-200 text-xl font-bold">×</button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pasien *</label>
                            <input name="nama_pasien" value={form.nama_pasien} onChange={handleChange} placeholder="Nama pasien"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Golongan Darah *</label>
                            <select name="golongan_darah" value={form.golongan_darah} onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-sm">
                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => <option key={g}>{g}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Kantong *</label>
                            <input type="number" name="jumlah_kantong" min="1" value={form.jumlah_kantong} onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-sm" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Rumah Sakit *</label>
                            <input name="nama_rumah_sakit" value={form.nama_rumah_sakit} onChange={handleChange} placeholder="Nama RS / Klinik"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-sm" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Dokter</label>
                            <input name="nama_dokter" value={form.nama_dokter} onChange={handleChange} placeholder="Opsional"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-sm" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pendonor Terkait (opsional — gol. {form.golongan_darah})</label>
                            <select name="donor_id" value={form.donor_id} onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-sm">
                                <option value="">— Pilih pendonor —</option>
                                {filteredDonors.map(d => <option key={d.id} value={d.id}>{d.nama} ({d.golongan_darah})</option>)}
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Stok Terkait (opsional — gol. {form.golongan_darah})</label>
                            <select name="stok_id" value={form.stok_id} onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-sm">
                                <option value="">— Pilih stok —</option>
                                {filteredStocks.map(s => <option key={s.id} value={s.id}>{s.golongan_darah} — {s.jumlah_kantong} kantong</option>)}
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
                            <textarea name="catatan" rows="2" value={form.catatan} onChange={handleChange} placeholder="Keterangan tambahan..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-sm resize-none" />
                        </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50">Batal</button>
                        <button type="submit" disabled={loading} className="flex-1 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50">
                            {loading ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function PermintaanPage() {
    const { permintaan, loading, error, refetch } = usePermintaan();
    const [showAdd, setShowAdd] = useState(false);
    const [search, setSearch] = useState('');
    const [openStatus, setOpenStatus] = useState(null);

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = () => setOpenStatus(null);
        if (openStatus) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [openStatus]);

    const filtered = permintaan.filter(p =>
        p.nama_pasien?.toLowerCase().includes(search.toLowerCase()) ||
        p.golongan_darah?.toLowerCase().includes(search.toLowerCase()) ||
        p.nama_rumah_sakit?.toLowerCase().includes(search.toLowerCase())
    );

    const stats = {
        total: permintaan.length,
        aktif: permintaan.filter(p => p.status === 'menunggu' || p.status === 'diproses').length,
        selesai: permintaan.filter(p => p.status === 'selesai').length,
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await permintaanService.updateStatus(id, newStatus);
            setOpenStatus(null);
            refetch();
        } catch { alert('Gagal mengubah status'); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Hapus permintaan ini?')) return;
        try {
            await permintaanService.deletePermintaan(id);
            refetch();
        } catch { alert('Gagal menghapus'); }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-red-600 sticky top-0 z-40">
                <div className="px-4 pt-6 pb-4">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                <ClipboardList className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Permintaan Darah</h1>
                                <p className="text-red-200 text-xs">Kelola permintaan donor darah</p>
                            </div>
                        </div>
                        <button onClick={() => setShowAdd(true)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-white text-red-600 rounded-xl font-semibold text-sm shadow">
                            <Plus className="w-4 h-4" /> Buat Permintaan
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        {[
                            { label: 'Total', val: stats.total, icon: ClipboardList },
                            { label: 'Aktif', val: stats.aktif, icon: Clock },
                            { label: 'Selesai', val: stats.selesai, icon: CheckCircle },
                        ].map(({ label, val, icon: Icon }) => (
                            <div key={label} className="bg-white/15 rounded-xl p-3 flex items-center gap-2">
                                <Icon className="w-5 h-5 text-white opacity-80" />
                                <div>
                                    <p className="text-red-100 text-xs">{label}</p>
                                    <p className="text-white text-xl font-bold leading-none">{val}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Cari nama pasien atau golongan darah..."
                            value={search} onChange={e => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 bg-white rounded-xl text-sm focus:outline-none shadow" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 py-4 space-y-3">
                {loading && (
                    <div className="flex justify-center py-16">
                        <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
                    </div>
                )}

                {!loading && filtered.length === 0 && (
                    <div className="text-center py-16">
                        <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">Belum ada permintaan</p>
                        <button onClick={() => setShowAdd(true)} className="mt-3 px-5 py-2 bg-red-600 text-white rounded-xl text-sm font-semibold">
                            Buat Permintaan
                        </button>
                    </div>
                )}

                {filtered.map(item => {
                    const stokJumlah = item.stok_darah?.jumlah_kantong ?? '-';
                    const dokter = item.nama_dokter || '-';

                    return (
                        <div key={item.id} className="bg-white rounded-2xl shadow-sm relative">
                            {/* Card header */}
                            <div className="bg-red-600 px-4 py-3 flex justify-between items-center rounded-t-2xl">
                                <div>
                                    <p className="text-white font-bold">{item.nama_pasien}</p>
                                    <p className="text-red-200 text-xs">{item.nama_rumah_sakit}</p>
                                </div>
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                    <span className="text-red-600 font-bold text-sm">{item.golongan_darah}</span>
                                </div>
                            </div>

                            {/* Card body */}
                            <div className="px-4 py-3">
                                <div className="grid grid-cols-3 gap-2 mb-3">
                                    <div>
                                        <p className="text-gray-400 text-xs uppercase tracking-wide">Dokter</p>
                                        <p className="text-gray-800 font-medium text-sm">{dokter}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs uppercase tracking-wide">Kantong</p>
                                        <p className="text-gray-800 font-medium text-sm">{item.jumlah_kantong}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs uppercase tracking-wide">Stok</p>
                                        <p className="text-gray-800 font-medium text-sm">{stokJumlah}</p>
                                    </div>
                                </div>

                                {/* Pendonor info */}
                                {item.donors && (
                                    <div className="bg-blue-50 rounded-lg px-3 py-1.5 mb-3 text-xs text-blue-700">
                                        👤 Pendonor: <span className="font-semibold">{item.donors.nama}</span> ({item.donors.golongan_darah}) — {item.donors.no_telepon}
                                    </div>
                                )}

                                {/* Status dropdown + delete */}
                                <div className="flex items-center justify-between">
                                    <div className="relative z-10">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenStatus(openStatus === item.id ? null : item.id);
                                            }}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${STATUS_COLOR[item.status]}`}
                                        >
                                            {STATUS_LABEL[item.status]}
                                            <ChevronDown className={`w-3 h-3 transition-transform ${openStatus === item.id ? 'rotate-180' : ''}`} />
                                        </button>
                                        
                                        {/* Dropdown Menu - Fixed z-index & positioning */}
                                        {openStatus === item.id && (
                                            <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden min-w-[140px]">
                                                {STATUS_OPTIONS.map(s => (
                                                    <button 
                                                        key={s} 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleStatusChange(item.id, s);
                                                        }}
                                                        className={`block w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors ${
                                                            s === item.status ? 'bg-gray-100 text-red-600' : 'text-gray-700'
                                                        }`}
                                                    >
                                                        {STATUS_LABEL[s]}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="flex items-center gap-3 text-xs text-gray-400">
                                        <span>🩸 {item.golongan_darah}</span>
                                        <button 
                                            onClick={() => handleDelete(item.id)} 
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <AddModal isOpen={showAdd} onClose={() => setShowAdd(false)} onSuccess={refetch} />
        </div>
    );
}