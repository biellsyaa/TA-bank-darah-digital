// import { useState, useEffect } from 'react';
// import { supabase } from '../config/supabase';

// export function useAuth() {
//     const [user, setUser] = useState(null);
//     const [role, setRole] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const fetchRole = async (userId) => {
//         if (!userId) {
//             setRole(null);
//             return;
//         }
//         // Timeout 5 detik — kalau Supabase lambat/RLS block, tidak hang selamanya
//         const timeout = new Promise((_, reject) =>
//             setTimeout(() => reject(new Error('timeout')), 5000)
//         );
//         const query = supabase
//             .from('profiles')
//             .select('role')
//             .eq('id', userId)
//             .single();

//         try {
//             const { data, error } = await Promise.race([query, timeout]);
//             if (error) {
//                 console.warn('fetchRole error (pakai default pasien):', error.message);
//                 setRole('pasien');
//             } else {
//                 setRole(data?.role ?? 'pasien');
//             }
//         } catch (e) {
//             console.warn('fetchRole timeout/exception (pakai default pasien):', e.message);
//             setRole('pasien');
//         }
//     };

//     useEffect(() => {
//         let mounted = true;

//         const init = async () => {
//             try {
//                 const { data: { session } } = await supabase.auth.getSession();
//                 if (!mounted) return;
//                 if (session?.user) {
//                     setUser(session.user);
//                     await fetchRole(session.user.id);
//                 } else {
//                     setUser(null);
//                     setRole(null);
//                 }
//             } catch (e) {
//                 console.error('Session init error:', e);
//             } finally {
//                 if (mounted) setLoading(false);
//             }
//         };

//         init();

//         const { data: { subscription } } = supabase.auth.onAuthStateChange(
//             async (_event, session) => {
//                 if (!mounted) return;
//                 if (session?.user) {
//                     setUser(session.user);
//                     await fetchRole(session.user.id);
//                 } else {
//                     setUser(null);
//                     setRole(null);
//                 }
//             }
//         );

//         return () => {
//             mounted = false;
//             subscription.unsubscribe();
//         };
//     }, []);

//     const login = async (email, password) => {
//         const { error } = await supabase.auth.signInWithPassword({ email, password });
//         if (error) throw error.message;
//     };

//     const register = async (email, password) => {
//         const { data, error } = await supabase.auth.signUp({ email, password });
//         if (error) throw error.message;
//         if (data?.user) {
//             const { error: profileError } = await supabase
//                 .from('profiles')
//                 .insert([{ id: data.user.id, email: email, role: 'pasien' }]);
//             if (profileError) {
//                 console.error('Error insert profile:', profileError.message);
//             }
//         }
//     };

//     const logout = async () => {
//         await supabase.auth.signOut();
//         setUser(null);
//         setRole(null);
//     };

//     const isAdmin = role === 'admin';
//     const isPasien = role === 'pasien';

//     return { user, role, loading, login, register, logout, isAdmin, isPasien };
// }

import { useState, useEffect, useRef } from 'react';
import { supabase } from '../config/supabase';

export function useAuth() {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    // Pakai ref untuk track fetch yang sedang berjalan — cegah race condition
    const fetchingRef = useRef(false);
    const lastUserIdRef = useRef(null);

    const fetchRole = async (userId) => {
        if (!userId) {
            setRole(null);
            return;
        }

        // Kalau user sama dan sedang fetch, skip — jangan double fetch
        if (fetchingRef.current && lastUserIdRef.current === userId) return;

        fetchingRef.current = true;
        lastUserIdRef.current = userId;

        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', userId)
                .single();

            // Cek lagi apakah userId masih sama (belum ganti user)
            if (lastUserIdRef.current !== userId) return;

            if (error) {
                console.warn('fetchRole error:', error.message);
                setRole('pasien');
            } else {
                setRole(data?.role ?? 'pasien');
            }
        } catch (e) {
            console.warn('fetchRole exception:', e.message);
            setRole('pasien');
        } finally {
            fetchingRef.current = false;
        }
    };

    useEffect(() => {
        let mounted = true;

        // Hanya init() yang set loading=false
        // onAuthStateChange hanya update user+role setelah init selesai
        let initDone = false;

        const init = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!mounted) return;

                if (session?.user) {
                    setUser(session.user);
                    await fetchRole(session.user.id);
                } else {
                    setUser(null);
                    setRole(null);
                }
            } catch (e) {
                console.error('Session init error:', e);
            } finally {
                initDone = true;
                if (mounted) setLoading(false);
            }
        };

        init();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                if (!mounted) return;
                // Tunggu init selesai dulu sebelum onAuthStateChange override state
                if (!initDone) return;

                if (session?.user) {
                    // Reset ref saat user berubah
                    if (lastUserIdRef.current !== session.user.id) {
                        fetchingRef.current = false;
                        lastUserIdRef.current = null;
                    }
                    setUser(session.user);
                    await fetchRole(session.user.id);
                } else {
                    setUser(null);
                    setRole(null);
                    fetchingRef.current = false;
                    lastUserIdRef.current = null;
                }
            }
        );

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const login = async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error.message;
    };

    const register = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error.message;
        if (data?.user) {
            const { error: profileError } = await supabase
                .from('profiles')
                .insert([{ id: data.user.id, email: email, role: 'pasien' }]);
            if (profileError) {
                console.error('Error insert profile:', profileError.message);
            }
        }
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setRole(null);
        fetchingRef.current = false;
        lastUserIdRef.current = null;
    };

    const isAdmin = role === 'admin';
    const isPasien = role === 'pasien';

    return { user, role, loading, login, register, logout, isAdmin, isPasien };
}