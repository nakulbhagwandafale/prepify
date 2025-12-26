"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from "react";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signOut: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Cache the auth state to avoid redundant calls
let cachedUser: User | null = null;
let cachedSession: Session | null = null;
let authPromise: Promise<void> | null = null;

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(cachedUser);
    const [session, setSession] = useState<Session | null>(cachedSession);
    const [loading, setLoading] = useState(!cachedUser);

    useEffect(() => {
        let mounted = true;

        const initAuth = async () => {
            // If already loading, wait for it
            if (authPromise) {
                await authPromise;
                if (mounted) {
                    setUser(cachedUser);
                    setSession(cachedSession);
                    setLoading(false);
                }
                return;
            }

            // If we have cached data, use it immediately
            if (cachedUser !== null) {
                if (mounted) {
                    setUser(cachedUser);
                    setSession(cachedSession);
                    setLoading(false);
                }
                return;
            }

            // Create new auth promise
            authPromise = (async () => {
                try {
                    const { supabase } = await import("@/lib/supabase");
                    const { data: { session: currentSession } } = await supabase.auth.getSession();

                    cachedSession = currentSession;
                    cachedUser = currentSession?.user ?? null;

                    if (mounted) {
                        setSession(currentSession);
                        setUser(currentSession?.user ?? null);
                    }
                } catch (error) {
                    console.error("Auth initialization error:", error);
                } finally {
                    if (mounted) {
                        setLoading(false);
                    }
                    authPromise = null;
                }
            })();

            await authPromise;
        };

        initAuth();

        // Set up auth state listener
        let unsubscribe: (() => void) | undefined;

        (async () => {
            const { supabase } = await import("@/lib/supabase");
            const { data: authListener } = supabase.auth.onAuthStateChange(
                (_event, newSession) => {
                    cachedSession = newSession;
                    cachedUser = newSession?.user ?? null;
                    if (mounted) {
                        setSession(newSession);
                        setUser(newSession?.user ?? null);
                    }
                }
            );
            unsubscribe = () => authListener.subscription.unsubscribe();
        })();

        return () => {
            mounted = false;
            unsubscribe?.();
        };
    }, []);

    const signOut = useCallback(async () => {
        const { supabase } = await import("@/lib/supabase");
        await supabase.auth.signOut();
        cachedUser = null;
        cachedSession = null;
        setUser(null);
        setSession(null);
    }, []);

    const refreshUser = useCallback(async () => {
        const { supabase } = await import("@/lib/supabase");
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        cachedSession = currentSession;
        cachedUser = currentSession?.user ?? null;
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
    }, []);

    const value = useMemo(() => ({
        user,
        session,
        loading,
        signOut,
        refreshUser,
    }), [user, session, loading, signOut, refreshUser]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
