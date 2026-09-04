import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '../types/database.types';

interface AuthContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  locality: string;
  setLocality: (locality: string) => void;
  isAvailable: boolean;
  toggleAvailability: () => void;
  savedProviderIds: string[];
  toggleSaveProvider: (id: string) => void;
  isProviderSaved: (id: string) => boolean;
  user: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('customer');
  const [locality, setLocality] = useState<string>('Latifabad Unit 6');
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [savedProviderIds, setSavedProviderIds] = useState<string[]>(['kaarigar-1']);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const [user, setUser] = useState({
    name: 'Dayanand Sharma',
    email: 'nanddaya12@github.com',
    phone: '0300-1234567',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  });

  const toggleAvailability = () => {
    setIsAvailable((prev) => !prev);
  };

  const toggleSaveProvider = (id: string) => {
    setSavedProviderIds((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };

  const isProviderSaved = (id: string) => savedProviderIds.includes(id);

  const signOut = () => {
    setRole('customer');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        setRole,
        locality,
        setLocality,
        isAvailable,
        toggleAvailability,
        savedProviderIds,
        toggleSaveProvider,
        isProviderSaved,
        user,
        signOut,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
