import { supabaseClient } from '../config/supabase';

class StockService {

  async getStocks() {
    try {
      const response = await supabaseClient.get('/stok_darah?select=*&order=golongan_darah.asc');
      return response;
    } catch (error) {
      console.error('Error in getStocks:', error);
      throw error;
    }
  }

  async getStockById(id) {
    try {
      const response = await supabaseClient.get(`/stok_darah?id=eq.${id}&select=*`);
      return response[0];
    } catch (error) {
      console.error('Error in getStockById:', error);
      throw error;
    }
  }

  async getStockByBloodType(bloodType) {
    try {
      const response = await supabaseClient.get(
        `/stok_darah?golongan_darah=eq.${bloodType}&select=*`
      );
      return response[0];
    } catch (error) {
      console.error('Error in getStockByBloodType:', error);
      throw error;
    }
  }

  async createStock(stockData) {
    try {
      const response = await supabaseClient.post('/stok_darah', stockData);
      return response;
    } catch (error) {
      console.error('Error in createStock:', error);
      throw error;
    }
  }

  async updateStock(id, stockData) {
    try {
      const response = await supabaseClient.patch(`/stok_darah?id=eq.${id}`, stockData);
      return response;
    } catch (error) {
      console.error('Error in updateStock:', error);
      throw error;
    }
  }

  async deleteStock(id) {
    try {
      await supabaseClient.delete(`/stok_darah?id=eq.${id}`);
      return { success: true };
    } catch (error) {
      console.error('Error in deleteStock:', error);
      throw error;
    }
  }

  async updateStockQuantity(id, quantity) {
    try {
      const currentStock = await this.getStockById(id);
      const newQuantity = currentStock.jumlah_kantong + quantity;
      
      if (newQuantity < 0) {
        throw new Error('Stok tidak boleh negatif');
      }

      const response = await supabaseClient.patch(
        `/stok_darah?id=eq.${id}`,
        { jumlah_kantong: newQuantity, updated_at: new Date().toISOString() }
      );
      return response;
    } catch (error) {
      console.error('Error in updateStockQuantity:', error);
      throw error;
    }
  }

  async getLowStocks(threshold = 20) {
    try {
      const response = await supabaseClient.get(
        `/stok_darah?jumlah_kantong=lt.${threshold}&select=*&order=jumlah_kantong.asc`
      );
      return response;
    } catch (error) {
      console.error('Error in getLowStocks:', error);
      throw error;
    }
  }

  async getExpiringSoonStocks(days = 7) {
    try {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + days);
      const dateString = futureDate.toISOString().split('T')[0];
      
      const response = await supabaseClient.get(
        `/stok_darah?tanggal_kadaluarsa=lt.${dateString}&select=*&order=tanggal_kadaluarsa.asc`
      );
      return response;
    } catch (error) {
      console.error('Error in getExpiringSoonStocks:', error);
      throw error;
    }
  }
}

export default new StockService();