import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 bg-white rounded-2xl shadow-2xl p-4 z-40">
      <button
        onClick={() => setShowPrompt(false)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
      >
        <X className="w-5 h-5" />
      </button>
      
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <Download className="w-6 h-6 text-red-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 mb-1">
            Install Bank Darah Digital
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Akses lebih cepat dengan install aplikasi
          </p>
          <button
            onClick={handleInstall}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600"
          >
            Install Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}