import React, { useState } from 'react';
import { Droplet, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
    const { login, register } = useAuth();
    const [isRegister, setIsRegister] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); setSuccess('');
        if (!formData.email || !formData.password) { setError('Email dan password wajib diisi'); return; }
        if (isRegister && formData.password !== formData.confirmPassword) { setError('Password tidak cocok'); return; }
        if (formData.password.length < 6) { setError('Password minimal 6 karakter'); return; }

        setLoading(true);
        try {
            if (isRegister) {
                await register(formData.email, formData.password);
                setSuccess('Registrasi berhasil! Cek email untuk verifikasi, lalu login.');
                setIsRegister(false);
                setFormData({ email: formData.email, password: '', confirmPassword: '' });
            } else {
                await login(formData.email, formData.password);
                // App.jsx otomatis redirect karena useAuth deteksi session
            }
        } catch (err) {
            setError(typeof err === 'string' ? err : 'Email atau password salah');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-rose-800 flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-white opacity-5 rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-white opacity-5 rounded-full"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
                        <Droplet className="w-10 h-10 text-red-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Bank Darah Digital</h1>
                    <p className="text-red-200 mt-1 text-sm">Sistem Manajemen Donor Darah</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Tab */}
                    <div className="flex">
                        <button
                            onClick={() => { setIsRegister(false); setError(''); setSuccess(''); }}
                            className={`flex-1 py-4 text-sm font-semibold transition-colors ${!isRegister ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >
                            Masuk
                        </button>
                        <button
                            onClick={() => { setIsRegister(true); setError(''); setSuccess(''); }}
                            className={`flex-1 py-4 text-sm font-semibold transition-colors ${isRegister ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >
                            Daftar
                        </button>
                    </div>

                    <div className="p-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">
                            {isRegister ? 'Buat Akun Baru' : 'Selamat Datang'}
                        </h2>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">❌ {error}</div>
                        )}
                        {success && (
                            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">✅ {success}</div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                                        placeholder="contoh@email.com"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange}
                                        placeholder="Minimal 6 karakter"
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {isRegister && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input type={showPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                                            placeholder="Ulangi password"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                                    </div>
                                </div>
                            )}

                            <button type="submit" disabled={loading}
                                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all shadow-lg disabled:opacity-50 mt-2">
                                {loading ? 'Memproses...' : isRegister ? 'Daftar Sekarang' : 'Masuk'}
                            </button>
                        </form>
                    </div>
                </div>
                <p className="text-center text-red-200 text-sm mt-6">© 2024 Bank Darah Digital — PMI</p>
            </div>
        </div>
    );
}