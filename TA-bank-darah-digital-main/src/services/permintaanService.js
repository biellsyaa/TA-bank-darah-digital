import { supabaseClient } from '../config/supabase';

class PermintaanService {

    // JOIN 3 tabel: permintaan_darah + donors + stok_darah
    async getPermintaanWithJoin() {
        try {
            const response = await supabaseClient.get(
                '/permintaan_darah?select=*,donors(id,nama,golongan_darah,no_telepon),stok_darah(id,golongan_darah,jumlah_kantong,lokasi_penyimpanan)&order=created_at.desc'
            );
            return response;
        } catch (error) {
            console.error('Error getPermintaanWithJoin:', error);
            throw error;
        }
    }

    async createPermintaan(data) {
        try {
            const response = await supabaseClient.post('/permintaan_darah', data);
            return response;
        } catch (error) {
            console.error('Error createPermintaan:', error);
            throw error;
        }
    }

    async updateStatus(id, status) {
        try {
            const response = await supabaseClient.patch(
                `/permintaan_darah?id=eq.${id}`,
                { status, updated_at: new Date().toISOString() }
            );
            return response;
        } catch (error) {
            console.error('Error updateStatus:', error);
            throw error;
        }
    }

    async deletePermintaan(id) {
        try {
            await supabaseClient.delete(`/permintaan_darah?id=eq.${id}`);
            return { success: true };
        } catch (error) {
            console.error('Error deletePermintaan:', error);
            throw error;
        }
    }
}

export default new PermintaanService();