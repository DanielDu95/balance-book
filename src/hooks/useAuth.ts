import { useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { User } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial fetch
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user ?? null); // ✅ This is correct
      setLoading(false);
    };
    getUser();

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setUser(data.user ?? null);
    setLoading(false);
    if (error) throw error;
    return data.user;
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    setUser(data.user ?? null);
    setLoading(false);
    if (error) throw error;
    return data.user;
  }, []);

  const signOut = useCallback(async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setUser(null);
    setLoading(false);
    if (error) throw error;
  }, []);

  return { user, loading, signIn, signUp, signOut };
}
