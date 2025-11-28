import { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  tier: 'basic' | 'pro' | 'enterprise';
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isNewUser: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  dismissWelcome: () => void;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
  company?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('roktenh_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('roktenh_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock authentication - in production, this would call your backend
    if (email && password.length >= 6) {
      const mockUser: User = {
        id: 'user_' + Date.now(),
        email,
        name: email.split('@')[0],
        tier: 'pro',
        role: email.includes('admin') ? 'admin' : 'user'
      };
      
      setUser(mockUser);
      localStorage.setItem('roktenh_user', JSON.stringify(mockUser));
    } else {
      throw new Error('Invalid credentials');
    }
  }, []);

  const signup = useCallback(async (data: SignupData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Mock signup - in production, this would call your backend
    const newUser: User = {
      id: 'user_' + Date.now(),
      email: data.email,
      name: data.name,
      company: data.company,
      tier: 'basic',
      role: 'user'
    };

    setUser(newUser);
    setIsNewUser(true);
    localStorage.setItem('roktenh_user', JSON.stringify(newUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsNewUser(false);
    localStorage.removeItem('roktenh_user');
  }, []);

  const dismissWelcome = useCallback(() => {
    setIsNewUser(false);
  }, []);

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    isLoading,
    isNewUser,
    login,
    signup,
    logout,
    dismissWelcome
  }), [user, isLoading, isNewUser, login, signup, logout, dismissWelcome]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
