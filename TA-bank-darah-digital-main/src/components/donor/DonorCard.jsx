import React from 'react';
import { Phone, MapPin, Calendar, User } from 'lucide-react';
import { formatDate, calculateAge } from '../../utils/helpers';

export default function DonorCard({ donor, onClick }) {
  return (
    <div
      onClick={() => onClick(donor.id)}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden group"
    >
      {/* Header dengan Golongan Darah */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
        <div className="flex items-center justify-between relative z-10">
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg mb-1">{donor.nama}</h3>
            <p className="text-red-100 text-sm flex items-center gap-1">
              <User className="w-4 h-4" />
              {donor.jenis_kelamin}
            </p>
          </div>
          <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
            <span className="text-red-600 font-bold text-xl">{donor.golongan_darah}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <Phone className="w-4 h-4 text-red-500 mt-0.5" />
          <span>{donor.no_telepon}</span>
        </div>

        <div className="flex items-start gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-red-500 mt-0.5" />
          <span className="line-clamp-2">{donor.alamat}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 text-red-500" />
          <span>Donor terakhir: {formatDate(donor.tanggal_donor_terakhir)}</span>
        </div>

        {/* Age Badge */}
        <div className="pt-2 border-t border-gray-100">
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
            Usia: {calculateAge(donor.tanggal_lahir)} tahun
          </span>
        </div>
      </div>

      {/* Footer - Hover Effect */}
      <div className="px-4 pb-4">
        <div className="text-center py-2 bg-gray-50 rounded-lg group-hover:bg-red-50 transition-colors">
          <span className="text-sm text-gray-600 group-hover:text-red-600 font-medium">
            Lihat Detail →
          </span>
        </div>
      </div>
    </div>
  );
}