import React, { useState, useEffect } from 'react';
import { Droplet, Heart } from 'lucide-react';

export default function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            setFadeOut(true);

            setTimeout(() => {
              if (onFinish) onFinish();
            }, 500);
          }, 300);

          return 100;
        }
        return prev + 5;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center 
      bg-gradient-to-br from-red-500 via-red-600 to-rose-600 
      transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl animate-pulse delay-300"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <div className="mb-8 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-white opacity-20 rounded-full blur-xl animate-pulse"></div>
          </div>

          <div className="relative animate-bounce-slow">
            <Droplet className="w-24 h-24 text-white mx-auto drop-shadow-2xl" />
            <Heart className="w-12 h-12 text-red-200 absolute bottom-0 right-0 animate-pulse" />
          </div>
        </div>

        {/* Name */}
        <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg animate-fade-in">
          Bank Darah Digital
        </h1>
        <p className="text-xl text-red-100 mb-12 animate-fade-in-delay">
          Sistem Manajemen Donor Darah
        </p>

        {/* Loading Bar */}
        <div className="w-64 mx-auto">
          <div className="h-2 bg-white bg-opacity-30 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-white rounded-full transition-all duration-300 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-white text-sm mt-3 font-medium">{progress}%</p>
        </div>

        {/* Tagline */}
        <p className="text-red-100 text-sm mt-12 animate-fade-in-delay-2">
          Setiap tetes darah adalah harapan hidup
        </p>
      </div>
    </div>
  );
}
