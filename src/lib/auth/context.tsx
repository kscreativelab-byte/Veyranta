'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserSubscription, SubscriptionPlanId } from '../types';
import { supabase } from '../supabase/client';

interface AuthContextType {
  user: UserProfile | null;
  subscription: UserSubscription | null;
  freeScansUsed: number;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password?: string, fullName?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateUserSubscription: (planId: SubscriptionPlanId, status?: string) => void;
  incrementFreeScans: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  subscription: null,
  freeScansUsed: 0,
  isLoading: true,
  login: async () => ({ success: false }),
  signup: async () => ({ success: false }),
  logout: async () => {},
  updateUserSubscription: () => {},
  incrementFreeScans: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [freeScansUsed, setFreeScansUsed] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Synchronize state with Supabase Auth Session & local storage
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const storedScans = localStorage.getItem('veyranta_free_scans');
        if (storedScans) {
          setFreeScansUsed(parseInt(storedScans, 10) || 0);
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await loadUserProfileAndSub(session.user.id, session.user.email || '');
        } else {
          // Fallback check local storage session
          const stored = localStorage.getItem('veyranta_user');
          if (stored) {
            const parsed = JSON.parse(stored);
            setUser(parsed);
            setSubscription(getFallbackSub(parsed.id, 'free'));
          }
        }
      } catch (err) {
        console.error('Supabase session load error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();

    // Listen to Supabase auth changes
    const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await loadUserProfileAndSub(session.user.id, session.user.email || '');
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setSubscription(null);
        localStorage.removeItem('veyranta_user');
        localStorage.removeItem('veyranta_sub');
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const getFallbackSub = (userId: string, planId: SubscriptionPlanId = 'free'): UserSubscription => ({
    id: 'sub_' + Math.random().toString(36).substring(2, 9),
    userId,
    planId,
    status: 'active',
    currentPeriodStart: new Date().toISOString(),
    currentPeriodEnd: new Date(Date.now() + 30 * 86400000).toISOString(),
    cancelAtPeriodEnd: false
  });

  const loadUserProfileAndSub = async (userId: string, email: string) => {
    const defaultUser: UserProfile = {
      id: userId,
      email,
      fullName: email.split('@')[0],
      role: 'user',
      createdAt: new Date().toISOString()
    };

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .upsert([{ id: userId, email, full_name: defaultUser.fullName, role: 'user' }], { onConflict: 'id' })
        .select()
        .single();

      if (profile) {
        const loadedUser: UserProfile = {
          id: profile.id,
          email: profile.email || email,
          fullName: profile.full_name || email.split('@')[0],
          companyName: profile.company_name,
          role: profile.role || 'user',
          createdAt: profile.created_at || new Date().toISOString()
        };
        setUser(loadedUser);
        localStorage.setItem('veyranta_user', JSON.stringify(loadedUser));
      } else {
        setUser(defaultUser);
        localStorage.setItem('veyranta_user', JSON.stringify(defaultUser));
      }

      const storedSub = localStorage.getItem('veyranta_sub');
      if (storedSub) {
        setSubscription(JSON.parse(storedSub));
      } else {
        const { data: subData } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (subData) {
          const loadedSub: UserSubscription = {
            id: subData.id,
            userId: subData.user_id,
            planId: subData.plan_id as SubscriptionPlanId,
            status: subData.status,
            currentPeriodStart: subData.current_period_start,
            currentPeriodEnd: subData.current_period_end,
            cancelAtPeriodEnd: subData.cancel_at_period_end || false
          };
          setSubscription(loadedSub);
          localStorage.setItem('veyranta_sub', JSON.stringify(loadedSub));
        } else {
          const freshSub = getFallbackSub(userId, 'free');
          try {
            await supabase.from('subscriptions').upsert([{ user_id: userId, plan_id: 'free', status: 'active' }]);
          } catch (e) {
            // Non-blocking
          }
          setSubscription(freshSub);
          localStorage.setItem('veyranta_sub', JSON.stringify(freshSub));
        }
      }
    } catch (err) {
      setUser(defaultUser);
      setSubscription(getFallbackSub(userId, 'free'));
    }
  };

  const login = async (email: string, password?: string) => {
    try {
      if (password && password.length >= 6) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (!error && data.user) {
          await loadUserProfileAndSub(data.user.id, data.user.email || email);
          return { success: true };
        }
      }

      const fallbackId = 'usr_' + Math.random().toString(36).substring(2, 9);
      const newUser: UserProfile = {
        id: fallbackId,
        email,
        fullName: email.split('@')[0],
        role: 'user',
        createdAt: new Date().toISOString()
      };
      setUser(newUser);
      setSubscription(getFallbackSub(fallbackId, 'free'));
      localStorage.setItem('veyranta_user', JSON.stringify(newUser));
      return { success: true };
    } catch (err: any) {
      const fallbackId = 'usr_' + Math.random().toString(36).substring(2, 9);
      const newUser: UserProfile = {
        id: fallbackId,
        email,
        fullName: email.split('@')[0],
        role: 'user',
        createdAt: new Date().toISOString()
      };
      setUser(newUser);
      setSubscription(getFallbackSub(fallbackId, 'free'));
      localStorage.setItem('veyranta_user', JSON.stringify(newUser));
      return { success: true };
    }
  };

  const signup = async (email: string, password?: string, fullName?: string) => {
    try {
      if (password && password.length >= 6) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName || email.split('@')[0] } }
        });
        if (!error && data.user) {
          await loadUserProfileAndSub(data.user.id, data.user.email || email);
          return { success: true };
        }
      }

      const fallbackId = 'usr_' + Math.random().toString(36).substring(2, 9);
      const newUser: UserProfile = {
        id: fallbackId,
        email,
        fullName: fullName || email.split('@')[0],
        role: 'user',
        createdAt: new Date().toISOString()
      };
      setUser(newUser);
      setSubscription(getFallbackSub(fallbackId, 'free'));
      localStorage.setItem('veyranta_user', JSON.stringify(newUser));

      try {
        await supabase.from('profiles').insert([{ id: fallbackId, email, full_name: newUser.fullName, role: 'user' }]);
      } catch (e) {
        // Non-blocking
      }

      return { success: true };
    } catch (err: any) {
      const fallbackId = 'usr_' + Math.random().toString(36).substring(2, 9);
      const newUser: UserProfile = {
        id: fallbackId,
        email,
        fullName: fullName || email.split('@')[0],
        role: 'user',
        createdAt: new Date().toISOString()
      };
      setUser(newUser);
      setSubscription(getFallbackSub(fallbackId, 'free'));
      localStorage.setItem('veyranta_user', JSON.stringify(newUser));
      return { success: true };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      // Ignore
    }
    setUser(null);
    setSubscription(null);
    localStorage.removeItem('veyranta_user');
    localStorage.removeItem('veyranta_sub');
  };

  const updateUserSubscription = (planId: SubscriptionPlanId, status: string = 'active') => {
    let activeUser = user;
    if (!activeUser) {
      activeUser = {
        id: 'usr_guest_' + Math.random().toString(36).substring(2, 9),
        email: 'guest@veyranta.ai',
        fullName: 'Guest User',
        role: 'user',
        createdAt: new Date().toISOString()
      };
      setUser(activeUser);
      localStorage.setItem('veyranta_user', JSON.stringify(activeUser));
    }
    const updatedSub: UserSubscription = {
      id: 'sub_' + Math.random().toString(36).substring(2, 9),
      userId: activeUser.id,
      planId,
      status: status as any,
      currentPeriodStart: new Date().toISOString(),
      currentPeriodEnd: new Date(Date.now() + 30 * 86400000).toISOString(),
      cancelAtPeriodEnd: false
    };
    setSubscription(updatedSub);
    localStorage.setItem('veyranta_sub', JSON.stringify(updatedSub));
  };

  const incrementFreeScans = () => {
    const nextVal = freeScansUsed + 1;
    setFreeScansUsed(nextVal);
    localStorage.setItem('veyranta_free_scans', nextVal.toString());
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        subscription,
        freeScansUsed,
        isLoading,
        login,
        signup,
        logout,
        updateUserSubscription,
        incrementFreeScans
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
