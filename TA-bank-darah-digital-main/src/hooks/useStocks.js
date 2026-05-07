import { useState, useEffect, useCallback } from 'react';
import stockService from '../services/stockService';

export function useStocks() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStocks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await stockService.getStocks();
      setStocks(data || []);
    } catch (err) {
      console.error('Error fetching stocks:', err);
      const errorMessage = typeof err === 'string' 
        ? err 
        : err?.message || 'Terjadi kesalahan saat memuat data stok darah';
      setError(errorMessage);
      setStocks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStocks();
  }, [fetchStocks]);

  return {
    stocks,
    loading,
    error,
    refetch: fetchStocks,
  };
}

export function useStock(id) {
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStock = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await stockService.getStockById(id);
      setStock(data);
    } catch (err) {
      console.error('Error fetching stock:', err);
      const errorMessage = typeof err === 'string' 
        ? err 
        : err?.message || 'Terjadi kesalahan saat memuat data stok';
      setError(errorMessage);
      setStock(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchStock();
  }, [fetchStock]);

  return {
    stock,
    loading,
    error,
    refetch: fetchStock,
  };
}

export function useCreateStock() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createStock = async (stockData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      await stockService.createStock(stockData);
      setSuccess(true);
      return { success: true };
    } catch (err) {
      console.error('Error creating stock:', err);
      const errorMessage = typeof err === 'string' 
        ? err 
        : err?.message || 'Gagal menambahkan stok darah';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    createStock,
    loading,
    error,
    success,
  };
}

export function useUpdateStock() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateStock = async (id, stockData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      await stockService.updateStock(id, stockData);
      setSuccess(true);
      return { success: true };
    } catch (err) {
      console.error('Error updating stock:', err);
      const errorMessage = typeof err === 'string' 
        ? err 
        : err?.message || 'Gagal memperbarui stok darah';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    updateStock,
    loading,
    error,
    success,
  };
}

export function useDeleteStock() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const deleteStock = async (id) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      await stockService.deleteStock(id);
      setSuccess(true);
      return { success: true };
    } catch (err) {
      console.error('Error deleting stock:', err);
      const errorMessage = typeof err === 'string' 
        ? err 
        : err?.message || 'Gagal menghapus stok darah';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteStock,
    loading,
    error,
    success,
  };
}