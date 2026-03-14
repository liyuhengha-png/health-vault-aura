import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

export interface User {
  pseudonym: string;
  email: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (pseudonym: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = "healthvault_users";
const CURRENT_USER_KEY = "healthvault_current_user";

interface StoredUser {
  pseudonym: string;
  email: string;
  password: string;
  createdAt: string;
}

function getStoredUsers(): StoredUser[] {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function setStoredUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Restore session on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CURRENT_USER_KEY);
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const login = useCallback((email: string, password: string): boolean => {
    const users = getStoredUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return false;

    const currentUser: User = {
      pseudonym: found.pseudonym,
      email: found.email,
      createdAt: found.createdAt,
    };
    setUser(currentUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    return true;
  }, []);

  const signup = useCallback((pseudonym: string, email: string, password: string): boolean => {
    const users = getStoredUsers();
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return false;

    const newUser: StoredUser = {
      pseudonym,
      email,
      password,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    setStoredUsers(users);

    const currentUser: User = {
      pseudonym: newUser.pseudonym,
      email: newUser.email,
      createdAt: newUser.createdAt,
    };
    setUser(currentUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
