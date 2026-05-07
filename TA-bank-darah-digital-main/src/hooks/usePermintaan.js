import { useState, useEffect, useCallback } from 'react';
import permintaanService from '../services/permintaanService';

export function usePermintaan() {
    const [permintaan, setPermintaan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPermintaan = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await permintaanService.getPermintaanWithJoin();
            setPermintaan(data || []);
        } catch (err) {
            setError(err?.message || 'Gagal memuat data permintaan');
            setPermintaan([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchPermintaan(); }, [fetchPermintaan]);

    return { permintaan, loading, error, refetch: fetchPermintaan };
}