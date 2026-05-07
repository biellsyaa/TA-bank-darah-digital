import React from 'react';
import { Droplet, Calendar, MapPin, AlertTriangle } from 'lucide-react';
import { formatDate, getStockStatus, getDaysUntilExpiry, isExpiringSoon } from '../../utils/helpers';

export default function StockCard({ stock, onClick }) {
  const stockStatus = getStockStatus(stock.jumlah_kantong);
  const daysUntilExpiry = getDaysUntilExpiry(stock.tanggal_kadaluarsa);
  const expiringSoon = isExpiringSoon(stock.tanggal_kadaluarsa);

  return (
    <div
      onClick={() => onClick(stock.id)}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden group relative"
    >
      {/* Warning Badge for Expiring Soon */}
      {expiringSoon && (
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
            <AlertTriangle className="w-3 h-3" />
            Segera Kadaluarsa
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-4 left-4 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute bottom-4 right-4 w-32 h-32 bg-white rounded-full"></div>
        </div>
        
        <div className="relative z-10">
          <Droplet className="w-16 h-16 text-white mx-auto mb-3 drop-shadow-lg" />
          <h3 className="text-white font-bold text-4xl mb-2">{stock.golongan_darah}</h3>
          <p className="text-red-100 text-sm">Golongan Darah</p>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        {/* Quantity */}
        <div className="text-center bg-red-50 rounded-xl p-4">
          <p className="text-gray-600 text-sm mb-1">Jumlah Tersedia</p>
          <p className="text-5xl font-bold text-red-600">{stock.jumlah_kantong}</p>
          <p className="text-gray-500 text-sm mt-1">Kantong Darah</p>
        </div>

        {/* Status Badge */}
        <div className={`text-center py-2 px-4 rounded-lg border ${stockStatus.color}`}>
          <p className="font-semibold text-sm">{stockStatus.status}</p>
        </div>

        {/* Expiry Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-red-500" />
            <span>Kadaluarsa: {formatDate(stock.tanggal_kadaluarsa)}</span>
          </div>
          
          {daysUntilExpiry >= 0 && (
            <div className={`text-xs px-3 py-1 rounded-full inline-block ${
              daysUntilExpiry <= 7 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
            }`}>
              {daysUntilExpiry === 0 ? 'Kadaluarsa Hari Ini' : `${daysUntilExpiry} hari lagi`}
            </div>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-600 pt-2 border-t border-gray-100">
          <MapPin className="w-4 h-4 text-red-500" />
          <span>{stock.lokasi_penyimpanan}</span>
        </div>
      </div>

      {/* Footer - Hover Effect */}
      <div className="px-6 pb-6">
        <div className="text-center py-2 bg-gray-50 rounded-lg group-hover:bg-red-50 transition-colors">
          <span className="text-sm text-gray-600 group-hover:text-red-600 font-medium">
            Lihat Detail →
          </span>
        </div>
      </div>
    </div>
  );
}