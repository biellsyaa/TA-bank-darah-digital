// // import React, { useState } from 'react';
// // import { User, Mail, LogOut, Droplet, Heart, Users, Building2, Shield, UserCheck } from 'lucide-react';
// // import { useAuth } from '../hooks/useAuth';

// // export default function ProfilePage() {
// //   const { user, role, logout, isAdmin } = useAuth();
// //   const [loggingOut, setLoggingOut] = useState(false);

// //   const handleLogout = async () => {
// //     if (!window.confirm('Yakin ingin keluar?')) return;
// //     setLoggingOut(true);
// //     await logout();
// //   };

// //   const initials = user?.email ? user.email.substring(0, 2).toUpperCase() : 'U';

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 pb-24">
// //       {/* Header */}
// //       <div className="relative">
// //         <div className="h-40 bg-gradient-to-r from-red-500 via-red-600 to-rose-600 relative overflow-hidden">
// //           <div className="absolute inset-0 flex items-center justify-center">
// //             <Droplet className="w-24 h-24 text-white opacity-10" />
// //           </div>
// //         </div>
// //         <div className="max-w-2xl mx-auto px-4 -mt-14 relative z-10">
// //           <div className="bg-white rounded-2xl shadow-xl p-6">
// //             <div className="flex items-center gap-5">
// //               <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg ring-4 ring-white flex-shrink-0">
// //                 {initials}
// //               </div>
// //               <div className="flex-1 min-w-0">
// //                 <h1 className="text-xl font-bold text-gray-800 truncate">{user?.email}</h1>
// //                 {/* Badge Role */}
// //                 <div className={`inline-flex items-center gap-1.5 mt-1 px-3 py-1 rounded-full text-xs font-semibold ${isAdmin ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
// //                   }`}>
// //                   {isAdmin
// //                     ? <><Shield className="w-3.5 h-3.5" /> Administrator</>
// //                     : <><UserCheck className="w-3.5 h-3.5" /> Pasien</>
// //                   }
// //                 </div>
// //                 <div className="flex items-center gap-1.5 mt-1">
// //                   <div className="w-2 h-2 bg-green-500 rounded-full"></div>
// //                   <span className="text-xs text-gray-500">Aktif</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">
// //         {/* Info Akun */}
// //         <div className="bg-white rounded-2xl shadow-sm p-6">
// //           <h3 className="font-bold text-gray-800 mb-4">Informasi Akun</h3>
// //           <div className="space-y-4">
// //             <div className="flex items-center gap-4">
// //               <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
// //                 <Mail className="w-5 h-5 text-red-600" />
// //               </div>
// //               <div>
// //                 <p className="text-xs text-gray-500">Email</p>
// //                 <p className="font-semibold text-gray-800">{user?.email}</p>
// //               </div>
// //             </div>
// //             <div className="flex items-center gap-4">
// //               <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
// //                 <User className="w-5 h-5 text-blue-600" />
// //               </div>
// //               <div>
// //                 <p className="text-xs text-gray-500">User ID</p>
// //                 <p className="font-semibold text-gray-800 text-sm font-mono">{user?.id?.substring(0, 16)}...</p>
// //               </div>
// //             </div>
// //             <div className="flex items-center gap-4">
// //               <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isAdmin ? 'bg-red-100' : 'bg-blue-100'
// //                 }`}>
// //                 {isAdmin
// //                   ? <Shield className="w-5 h-5 text-red-600" />
// //                   : <UserCheck className="w-5 h-5 text-blue-600" />
// //                 }
// //               </div>
// //               <div>
// //                 <p className="text-xs text-gray-500">Hak Akses</p>
// //                 <p className={`font-semibold text-sm ${isAdmin ? 'text-red-600' : 'text-blue-600'}`}>
// //                   {isAdmin ? 'Administrator — Akses Penuh (Tambah, Edit, Hapus)' : 'Pasien — Akses Lihat & Buat Permintaan'}
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Tentang Aplikasi */}
// //         <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
// //           <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-center">
// //             <Droplet className="w-14 h-14 text-white mx-auto mb-3" />
// //             <h2 className="text-2xl font-bold text-white">Bank Darah Digital</h2>
// //             <p className="text-red-100 text-sm mt-1">Sistem Manajemen Donor Darah</p>
// //           </div>
// //           <div className="p-6 space-y-4">
// //             <p className="text-gray-600 text-sm leading-relaxed">
// //               Aplikasi PWA untuk memudahkan pengelolaan data pendonor darah dan stok darah di PMI.
// //             </p>
// //             <div className="space-y-2">
// //               {[
// //                 { icon: Users, color: 'bg-red-100 text-red-600', label: 'Manajemen Pendonor' },
// //                 { icon: Droplet, color: 'bg-blue-100 text-blue-600', label: 'Monitoring Stok Darah' },
// //                 { icon: Heart, color: 'bg-green-100 text-green-600', label: 'Peringatan Kadaluarsa' },
// //                 { icon: Building2, color: 'bg-purple-100 text-purple-600', label: 'Manajemen Permintaan Darah' },
// //               ].map(({ icon: Icon, color, label }) => (
// //                 <div key={label} className="flex items-center gap-3">
// //                   <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
// //                     <Icon className="w-4 h-4" />
// //                   </div>
// //                   <p className="text-sm text-gray-700 font-medium">{label}</p>
// //                 </div>
// //               ))}
// //             </div>
// //             <div className="flex flex-wrap gap-2 pt-2">
// //               {['React', 'Supabase', 'PWA', 'Tailwind CSS', 'Vite'].map(t => (
// //                 <span key={t} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">{t}</span>
// //               ))}
// //             </div>
// //           </div>
// //         </div>

// //         <button
// //           onClick={handleLogout}
// //           disabled={loggingOut}
// //           className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50"
// //         >
// //           <LogOut className="w-5 h-5" />
// //           {loggingOut ? 'Keluar...' : 'Keluar dari Akun'}
// //         </button>
// //         <p className="text-center text-gray-400 text-xs pb-4">© 2024 Bank Darah Digital — PMI</p>
// //       </main>
// //     </div>
// //   );
// // }

// import React, { useState, useEffect } from 'react';
// import { User, Mail, LogOut, Phone, MapPin, Calendar, Droplet, Edit2, X, Check, Shield, UserCheck } from 'lucide-react';
// import { useAuth } from '../hooks/useAuth';
// import { supabase } from '../config/supabase';

// export default function ProfilePage() {
//   const { user, role, logout, isAdmin } = useAuth();
//   const [loggingOut, setLoggingOut] = useState(false);
//   const [profile, setProfile] = useState(null);
//   const [loadingProfile, setLoadingProfile] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [form, setForm] = useState({
//     nama: '', no_telepon: '', alamat: '', tanggal_lahir: '', golongan_darah: ''
//   });
//   const [saveMsg, setSaveMsg] = useState('');

//   const GOLONGAN = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

//   useEffect(() => {
//     if (!user) return;
//     fetchProfile();
//   }, [user]);

//   const fetchProfile = async () => {
//     setLoadingProfile(true);
//     const { data, error } = await supabase
//       .from('profiles')
//       .select('*')
//       .eq('id', user.id)
//       .single();
//     if (!error && data) {
//       setProfile(data);
//       setForm({
//         nama: data.nama || '',
//         no_telepon: data.no_telepon || '',
//         alamat: data.alamat || '',
//         tanggal_lahir: data.tanggal_lahir || '',
//         golongan_darah: data.golongan_darah || '',
//       });
//     }
//     setLoadingProfile(false);
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     setSaveMsg('');
//     const { error } = await supabase
//       .from('profiles')
//       .update({ ...form, updated_at: new Date().toISOString() })
//       .eq('id', user.id);
//     if (error) {
//       setSaveMsg('Gagal menyimpan: ' + error.message);
//     } else {
//       setSaveMsg('Profil berhasil disimpan!');
//       setEditing(false);
//       fetchProfile();
//       setTimeout(() => setSaveMsg(''), 3000);
//     }
//     setSaving(false);
//   };

//   const handleLogout = async () => {
//     if (!window.confirm('Yakin ingin keluar?')) return;
//     setLoggingOut(true);
//     await logout();
//   };

//   const initials = profile?.nama
//     ? profile.nama.substring(0, 2).toUpperCase()
//     : user?.email?.substring(0, 2).toUpperCase() || 'U';

//   return (
//     <div className="min-h-screen bg-gray-50 pb-24">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-red-600 to-red-700 pt-10 pb-16 px-4 text-center relative">
//         <h1 className="text-white font-bold text-xl mb-1">Profil Saya</h1>
//         <p className="text-red-200 text-sm">{user?.email}</p>
//       </div>

//       {/* Avatar card — overlap header */}
//       <div className="max-w-lg mx-auto px-4 -mt-10 relative z-10">
//         <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4">
//           <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow">
//             {initials}
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className="font-bold text-gray-800 text-lg truncate">
//               {profile?.nama || 'Belum diisi'}
//             </p>
//             <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${isAdmin ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
//               }`}>
//               {isAdmin ? <><Shield className="w-3 h-3" /> Admin</> : <><UserCheck className="w-3 h-3" /> Pasien</>}
//             </span>
//           </div>
//           <button
//             onClick={() => setEditing(true)}
//             className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
//           >
//             <Edit2 className="w-5 h-5" />
//           </button>
//         </div>
//       </div>

//       <div className="max-w-lg mx-auto px-4 mt-4 space-y-4">
//         {saveMsg && (
//           <div className={`p-3 rounded-xl text-sm font-medium text-center ${saveMsg.includes('Gagal') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
//             }`}>
//             {saveMsg}
//           </div>
//         )}

//         {/* Info Pribadi */}
//         <div className="bg-white rounded-2xl shadow-sm p-5">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="font-bold text-gray-800">Informasi Pribadi</h3>
//             {!editing && (
//               <button onClick={() => setEditing(true)} className="text-red-500 text-sm flex items-center gap-1 hover:text-red-700">
//                 <Edit2 className="w-3.5 h-3.5" /> Edit
//               </button>
//             )}
//           </div>

//           {loadingProfile ? (
//             <div className="flex justify-center py-6">
//               <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
//             </div>
//           ) : editing ? (
//             /* Form Edit */
//             <div className="space-y-3">
//               <div>
//                 <label className="text-xs text-gray-500 mb-1 block">Nama Lengkap</label>
//                 <input
//                   value={form.nama}
//                   onChange={e => setForm(p => ({ ...p, nama: e.target.value }))}
//                   placeholder="Masukkan nama lengkap"
//                   className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="text-xs text-gray-500 mb-1 block">No. Telepon</label>
//                 <input
//                   value={form.no_telepon}
//                   onChange={e => setForm(p => ({ ...p, no_telepon: e.target.value }))}
//                   placeholder="08xxxxxxxxxx"
//                   type="tel"
//                   className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="text-xs text-gray-500 mb-1 block">Alamat</label>
//                 <textarea
//                   value={form.alamat}
//                   onChange={e => setForm(p => ({ ...p, alamat: e.target.value }))}
//                   placeholder="Alamat lengkap"
//                   rows={2}
//                   className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none resize-none"
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="text-xs text-gray-500 mb-1 block">Tanggal Lahir</label>
//                   <input
//                     type="date"
//                     value={form.tanggal_lahir}
//                     onChange={e => setForm(p => ({ ...p, tanggal_lahir: e.target.value }))}
//                     className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-xs text-gray-500 mb-1 block">Golongan Darah</label>
//                   <select
//                     value={form.golongan_darah}
//                     onChange={e => setForm(p => ({ ...p, golongan_darah: e.target.value }))}
//                     className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none"
//                   >
//                     <option value="">— Pilih —</option>
//                     {GOLONGAN.map(g => <option key={g} value={g}>{g}</option>)}
//                   </select>
//                 </div>
//               </div>

//               <div className="flex gap-3 pt-1">
//                 <button
//                   onClick={() => { setEditing(false); fetchProfile(); }}
//                   className="flex-1 py-2.5 border border-gray-300 rounded-xl text-gray-600 text-sm font-medium flex items-center justify-center gap-1.5 hover:bg-gray-50"
//                 >
//                   <X className="w-4 h-4" /> Batal
//                 </button>
//                 <button
//                   onClick={handleSave}
//                   disabled={saving}
//                   className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-1.5 hover:bg-red-700 disabled:opacity-50"
//                 >
//                   <Check className="w-4 h-4" /> {saving ? 'Menyimpan...' : 'Simpan'}
//                 </button>
//               </div>
//             </div>
//           ) : (
//             /* Tampilan Data */
//             <div className="space-y-3">
//               <InfoRow icon={<User className="w-4 h-4 text-red-500" />} label="Nama" value={profile?.nama || '—'} />
//               <InfoRow icon={<Mail className="w-4 h-4 text-red-500" />} label="Email" value={user?.email} />
//               <InfoRow icon={<Phone className="w-4 h-4 text-red-500" />} label="Telepon" value={profile?.no_telepon || '—'} />
//               <InfoRow icon={<MapPin className="w-4 h-4 text-red-500" />} label="Alamat" value={profile?.alamat || '—'} />
//               <InfoRow icon={<Calendar className="w-4 h-4 text-red-500" />} label="Tanggal Lahir"
//                 value={profile?.tanggal_lahir
//                   ? new Date(profile.tanggal_lahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
//                   : '—'} />
//               <InfoRow icon={<Droplet className="w-4 h-4 text-red-500" />} label="Golongan Darah"
//                 value={profile?.golongan_darah
//                   ? <span className="font-bold text-red-600">{profile.golongan_darah}</span>
//                   : '—'} />
//             </div>
//           )}
//         </div>

//         {/* Tombol Logout */}
//         <button
//           onClick={handleLogout}
//           disabled={loggingOut}
//           className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 shadow transition-all disabled:opacity-50"
//         >
//           <LogOut className="w-5 h-5" />
//           {loggingOut ? 'Keluar...' : 'Keluar dari Akun'}
//         </button>
//       </div>
//     </div>
//   );
// }

// function InfoRow({ icon, label, value }) {
//   return (
//     <div className="flex items-start gap-3 py-1">
//       <div className="mt-0.5 flex-shrink-0">{icon}</div>
//       <div className="flex-1 min-w-0">
//         <p className="text-xs text-gray-400">{label}</p>
//         <p className="text-gray-800 text-sm font-medium truncate">{value}</p>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { User, Mail, LogOut, Phone, MapPin, Calendar, Droplet, Edit2, X, Check, Shield, UserCheck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../config/supabase';

export default function ProfilePage() {
  const { user, role, logout, isAdmin } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    nama: '', no_telepon: '', alamat: '', tanggal_lahir: '', golongan_darah: ''
  });
  const [saveMsg, setSaveMsg] = useState('');

  const GOLONGAN = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  useEffect(() => {
    if (!user) return;
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    setLoadingProfile(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    if (!error && data) {
      setProfile(data);
      setForm({
        nama: data.nama || '',
        no_telepon: data.no_telepon || '',
        alamat: data.alamat || '',
        tanggal_lahir: data.tanggal_lahir || '',
        golongan_darah: data.golongan_darah || '',
      });
    }
    setLoadingProfile(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg('');
    const { error } = await supabase
      .from('profiles')
      .update({ ...form, updated_at: new Date().toISOString() })
      .eq('id', user.id);

    if (error) {
      setSaveMsg('Gagal menyimpan: ' + error.message);
    } else {
      // Langsung update state lokal — tidak perlu fetch ulang
      setProfile(prev => ({ ...prev, ...form }));
      setEditing(false);
      setSaveMsg('Profil berhasil disimpan!');
      setTimeout(() => setSaveMsg(''), 3000);
    }
    setSaving(false);
  };

  const handleCancel = () => {
    // Reset form ke data profile yang tersimpan
    setForm({
      nama: profile?.nama || '',
      no_telepon: profile?.no_telepon || '',
      alamat: profile?.alamat || '',
      tanggal_lahir: profile?.tanggal_lahir || '',
      golongan_darah: profile?.golongan_darah || '',
    });
    setEditing(false);
  };

  const handleLogout = async () => {
    if (!window.confirm('Yakin ingin keluar?')) return;
    setLoggingOut(true);
    await logout();
  };

  const initials = profile?.nama
    ? profile.nama.substring(0, 2).toUpperCase()
    : user?.email?.substring(0, 2).toUpperCase() || 'U';

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 pt-10 pb-16 px-4 text-center">
        <h1 className="text-white font-bold text-xl mb-1">Profil Saya</h1>
        <p className="text-red-200 text-sm">{user?.email}</p>
      </div>

      {/* Avatar card */}
      <div className="max-w-lg mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-800 text-lg truncate">
              {profile?.nama || 'Belum diisi'}
            </p>
            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${isAdmin ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
              }`}>
              {isAdmin ? <><Shield className="w-3 h-3" /> Admin</> : <><UserCheck className="w-3 h-3" /> Pasien</>}
            </span>
          </div>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
            >
              <Edit2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-4 space-y-4">
        {saveMsg && (
          <div className={`p-3 rounded-xl text-sm font-medium text-center ${saveMsg.includes('Gagal') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
            }`}>
            {saveMsg}
          </div>
        )}

        {/* Info Pribadi */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Informasi Pribadi</h3>
            {!editing && (
              <button onClick={() => setEditing(true)} className="text-red-500 text-sm flex items-center gap-1 hover:text-red-700">
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
            )}
          </div>

          {loadingProfile ? (
            <div className="flex justify-center py-6">
              <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : editing ? (
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Nama Lengkap</label>
                <input
                  value={form.nama}
                  onChange={e => setForm(p => ({ ...p, nama: e.target.value }))}
                  placeholder="Masukkan nama lengkap"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">No. Telepon</label>
                <input
                  value={form.no_telepon}
                  onChange={e => setForm(p => ({ ...p, no_telepon: e.target.value }))}
                  placeholder="08xxxxxxxxxx"
                  type="tel"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Alamat</label>
                <textarea
                  value={form.alamat}
                  onChange={e => setForm(p => ({ ...p, alamat: e.target.value }))}
                  placeholder="Alamat lengkap"
                  rows={2}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Tanggal Lahir</label>
                  <input
                    type="date"
                    value={form.tanggal_lahir}
                    onChange={e => setForm(p => ({ ...p, tanggal_lahir: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Golongan Darah</label>
                  <select
                    value={form.golongan_darah}
                    onChange={e => setForm(p => ({ ...p, golongan_darah: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none"
                  >
                    <option value="">— Pilih —</option>
                    {GOLONGAN.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  onClick={handleCancel}
                  className="flex-1 py-2.5 border border-gray-300 rounded-xl text-gray-600 text-sm font-medium flex items-center justify-center gap-1.5 hover:bg-gray-50"
                >
                  <X className="w-4 h-4" /> Batal
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-1.5 hover:bg-red-700 disabled:opacity-50"
                >
                  <Check className="w-4 h-4" /> {saving ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <InfoRow icon={<User className="w-4 h-4 text-red-500" />} label="Nama" value={profile?.nama || '—'} />
              <InfoRow icon={<Mail className="w-4 h-4 text-red-500" />} label="Email" value={user?.email} />
              <InfoRow icon={<Phone className="w-4 h-4 text-red-500" />} label="Telepon" value={profile?.no_telepon || '—'} />
              <InfoRow icon={<MapPin className="w-4 h-4 text-red-500" />} label="Alamat" value={profile?.alamat || '—'} />
              <InfoRow
                icon={<Calendar className="w-4 h-4 text-red-500" />}
                label="Tanggal Lahir"
                value={profile?.tanggal_lahir
                  ? new Date(profile.tanggal_lahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
                  : '—'}
              />
              <InfoRow
                icon={<Droplet className="w-4 h-4 text-red-500" />}
                label="Golongan Darah"
                value={profile?.golongan_darah
                  ? <span className="font-bold text-red-600">{profile.golongan_darah}</span>
                  : '—'}
              />
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 shadow transition-all disabled:opacity-50"
        >
          <LogOut className="w-5 h-5" />
          {loggingOut ? 'Keluar...' : 'Keluar dari Akun'}
        </button>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-1">
      <div className="mt-0.5 flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-gray-800 text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}