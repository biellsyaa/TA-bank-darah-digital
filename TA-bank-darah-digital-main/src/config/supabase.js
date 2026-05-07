import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Axios untuk CRUD (tetap dipakai semua service)
const supabaseClient = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`,
  headers: {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  },
  timeout: 10000,
});

supabaseClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

supabaseClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorMessage = error.response?.data?.message ||
      error.message || 'Terjadi kesalahan';
    return Promise.reject(errorMessage);
  }
);

// Supabase JS Client — untuk Auth (session otomatis tersimpan)
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export { supabaseClient, supabase, SUPABASE_URL };
export default supabaseClient;