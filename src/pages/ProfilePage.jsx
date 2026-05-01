import React, { useState } from 'react';
import { User, Mail, LogOut, Droplet, Heart, Users, Building2, Phone } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (!window.confirm('Yakin ingin keluar?')) return;
    setLoggingOut(true);
    await logout();
  };

  // Ambil inisial dari email
  const initials = user?.email ? user.email.substring(0, 2).toUpperCase() : 'U';

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 pb-24">
      {/* Header */}
      <div className="relative">
        <div className="h-40 bg-gradient-to-r from-red-500 via-red-600 to-rose-600 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Droplet className="w-24 h-24 text-white opacity-10" />
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 -mt-14 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg ring-4 ring-white flex-shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold text-gray-800 truncate">{user?.email}</h1>
                <p className="text-red-500 font-medium text-sm mt-0.5">Pengguna Terdaftar</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-500">Aktif</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Info Akun */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-bold text-gray-800 mb-4">Informasi Akun</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-semibold text-gray-800">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">User ID</p>
                <p className="font-semibold text-gray-800 text-sm font-mono">{user?.id?.substring(0, 16)}...</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tentang Aplikasi */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-center">
            <Droplet className="w-14 h-14 text-white mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-white">Bank Darah Digital</h2>
            <p className="text-red-100 text-sm mt-1">Sistem Manajemen Donor Darah</p>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-gray-600 text-sm leading-relaxed">
              Aplikasi PWA untuk memudahkan pengelolaan data pendonor darah dan stok darah di PMI.
            </p>
            <div className="space-y-2">
              {[
                { icon: Users, color: 'bg-red-100 text-red-600', label: 'Manajemen Pendonor' },
                { icon: Droplet, color: 'bg-blue-100 text-blue-600', label: 'Monitoring Stok Darah' },
                { icon: Heart, color: 'bg-green-100 text-green-600', label: 'Peringatan Kadaluarsa' },
                { icon: Building2, color: 'bg-purple-100 text-purple-600', label: 'Manajemen Permintaan Darah' },
              ].map(({ icon: Icon, color, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <p className="text-sm text-gray-700 font-medium">{label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {['React', 'Supabase', 'PWA', 'Tailwind CSS', 'Vite'].map(t => (
                <span key={t} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Tombol Logout */}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50"
        >
          <LogOut className="w-5 h-5" />
          {loggingOut ? 'Keluar...' : 'Keluar dari Akun'}
        </button>

        <p className="text-center text-gray-400 text-xs pb-4">© 2024 Bank Darah Digital — PMI</p>
      </main>
    </div>
  );
}