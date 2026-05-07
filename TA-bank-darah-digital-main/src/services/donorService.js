import { supabaseClient } from '../config/supabase';

class DonorService {

  async getDonors() {
    try {
      const response = await supabaseClient.get('/donors?select=*&deleted_at=is.null&order=created_at.desc');
      return response;
    } catch (error) {
      console.error('Error in getDonors:', error);
      throw error;
    }
  }

  async getTrashedDonors() {
    try {
      const response = await supabaseClient.get('/donors?select=*&deleted_at=not.is.null&order=deleted_at.desc');
      return response;
    } catch (error) {
      console.error('Error in getTrashedDonors:', error);
      throw error;
    }
  }

  async getDonorById(id) {
    try {
      const response = await supabaseClient.get(`/donors?id=eq.${id}&select=*`);
      return response[0];
    } catch (error) {
      console.error('Error in getDonorById:', error);
      throw error;
    }
  }

  async createDonor(donorData) {
    try {
      const response = await supabaseClient.post('/donors', donorData);
      return response;
    } catch (error) {
      console.error('Error in createDonor:', error);
      throw error;
    }
  }

  async updateDonor(id, donorData) {
    try {
      const response = await supabaseClient.patch(`/donors?id=eq.${id}`, donorData);
      return response;
    } catch (error) {
      console.error('Error in updateDonor:', error);
      throw error;
    }
  }

  async softDeleteDonor(id) {
    try {
      const response = await supabaseClient.patch(`/donors?id=eq.${id}`, {
        deleted_at: new Date().toISOString()
      });
      return response;
    } catch (error) {
      console.error('Error in softDeleteDonor:', error);
      throw error;
    }
  }

  async restoreDonor(id) {
    try {
      const response = await supabaseClient.patch(`/donors?id=eq.${id}`, {
        deleted_at: null
      });
      return response;
    } catch (error) {
      console.error('Error in restoreDonor:', error);
      throw error;
    }
  }

  async hardDeleteDonor(id) {
    try {
      await supabaseClient.delete(`/donors?id=eq.${id}`);
      return { success: true };
    } catch (error) {
      console.error('Error in hardDeleteDonor:', error);
      throw error;
    }
  }

  async searchDonors(query) {
    try {
      const response = await supabaseClient.get(
        `/donors?nama=ilike.*${query}*&select=*&deleted_at=is.null&order=created_at.desc`
      );
      return response;
    } catch (error) {
      console.error('Error in searchDonors:', error);
      throw error;
    }
  }

  async filterByBloodType(bloodType) {
    try {
      const response = await supabaseClient.get(
        `/donors?golongan_darah=eq.${bloodType}&select=*&deleted_at=is.null&order=created_at.desc`
      );
      return response;
    } catch (error) {
      console.error('Error in filterByBloodType:', error);
      throw error;
    }
  }
}

export default new DonorService();