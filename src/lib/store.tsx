"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DEMO_ACCOUNT, seedProfiles } from "./data";
import type { Appearance, Profile, UserAccount } from "./types";
import { cloneProfile } from "./utils";

const AUTH_KEY = "qora-auth";
const DATA_KEY = "qora-data";

type Toast = { id: string; message: string };

type Store = {
  ready: boolean;
  user: UserAccount | null;
  profiles: Profile[];
  toasts: Toast[];
  login: (email: string, password: string) => string | null;
  signup: (name: string, email: string, password: string) => string | null;
  logout: () => void;
  saveProfile: (profile: Profile) => void;
  deleteProfile: (id: string) => void;
  getProfile: (id: string) => Profile | undefined;
  notify: (message: string) => void;
  dismissToast: (id: string) => void;
  updateAppearanceDefaults: (appearance: Appearance, applyTo?: string) => void;
  appearanceDefaults: Appearance | null;
};

const StoreContext = createContext<Store | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<UserAccount | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>(seedProfiles);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [appearanceDefaults, setAppearanceDefaults] = useState<Appearance | null>(null);

  useEffect(() => {
    try {
      const auth = localStorage.getItem(AUTH_KEY);
      if (auth) setUser(JSON.parse(auth) as UserAccount);
      const data = localStorage.getItem(DATA_KEY);
      if (data) {
        const parsed = JSON.parse(data) as {
          profiles: Profile[];
          appearanceDefaults: Appearance | null;
        };
        if (parsed.profiles?.length) setProfiles(parsed.profiles);
        if (parsed.appearanceDefaults) setAppearanceDefaults(parsed.appearanceDefaults);
      }
    } catch {
      /* ignore malformed demo storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(
      DATA_KEY,
      JSON.stringify({ profiles, appearanceDefaults })
    );
  }, [profiles, appearanceDefaults, ready]);

  const persistUser = (next: UserAccount | null) => {
    setUser(next);
    if (next) localStorage.setItem(AUTH_KEY, JSON.stringify(next));
    else localStorage.removeItem(AUTH_KEY);
  };

  const notify = useCallback((message: string) => {
    const id = String(Date.now() + Math.random());
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800);
  }, []);

  const login = (email: string, password: string) => {
    if (!email.includes("@")) return "Enter a valid email.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    persistUser({
      name: email === DEMO_ACCOUNT.email ? DEMO_ACCOUNT.name : email.split("@")[0],
      email,
      plan: "pro",
    });
    notify("Signed in. Welcome back.");
    return null;
  };

  const signup = (name: string, email: string, password: string) => {
    if (name.trim().length < 2) return "Please add your name.";
    if (!email.includes("@")) return "Enter a valid email.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    persistUser({ name, email, plan: "free" });
    notify("Account created. Let’s build your first profile.");
    return null;
  };

  const logout = () => persistUser(null);

  const saveProfile = (profile: Profile) => {
    setProfiles((list) => {
      const i = list.findIndex((p) => p.id === profile.id);
      if (i === -1) return [profile, ...list];
      const next = [...list];
      next[i] = cloneProfile(profile);
      return next;
    });
  };

  const deleteProfile = (id: string) => {
    setProfiles((list) => list.filter((p) => p.id !== id));
    notify("Profile removed from this demo session.");
  };

  const getProfile = (id: string) => profiles.find((p) => p.id === id);

  const value = useMemo(
    () => ({
      ready,
      user,
      profiles,
      toasts,
      login,
      signup,
      logout,
      saveProfile,
      deleteProfile,
      getProfile,
      notify,
      dismissToast: (id: string) => setToasts((t) => t.filter((x) => x.id !== id)),
      updateAppearanceDefaults: (appearance: Appearance, applyTo?: string) => {
        setAppearanceDefaults(appearance);
        if (applyTo) {
          setProfiles((list) =>
            list.map((p) => (p.id === applyTo ? { ...p, appearance } : p))
          );
        }
      },
      appearanceDefaults,
    }),
    // Demo store: action helpers close over latest state each render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ready, user, profiles, toasts, appearanceDefaults, notify]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useApp() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
