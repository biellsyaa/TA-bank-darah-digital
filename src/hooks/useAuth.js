import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Cek session yang sudah ada (dari localStorage otomatis)
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Dengerin perubahan login/logout
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error.message;
    };

    const register = async (email, password) => {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error.message;
    };

    const logout = async () => {
        await supabase.auth.signOut();
    };

    return { user, loading, login, register, logout };
}