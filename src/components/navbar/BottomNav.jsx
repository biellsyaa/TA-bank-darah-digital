import React from 'react';
import { Users, Droplet, User, ClipboardList } from 'lucide-react';

export default function BottomNav({ currentPage, onNavigate }) {
  const navItems = [
    { id: 'donors', label: 'Pendonor', icon: Users },
    { id: 'stocks', label: 'Stok', icon: Droplet },
    { id: 'permintaan', label: 'Permintaan', icon: ClipboardList },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button key={item.id} onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${isActive ? 'text-red-600' : 'text-gray-400'}`}>
              <Icon className={`w-6 h-6 mb-1 ${isActive ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
              <span className={`text-xs ${isActive ? 'font-semibold' : 'font-medium'}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}