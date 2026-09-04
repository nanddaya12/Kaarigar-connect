import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, Profile } from '../types/database.types';

interface AuthContextType {
  user: Profile | null;
  role: UserRole;
  setRole: (role: UserRole) => void;
  locality: string;
  setLocality: (locality: string) => void;
  login: (email: string, role?: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const defaultUser: Profile = {
  id: 'cust-101',
  full_name: 'Shahid Mehmood',
  email: 'shahid@example.com',
  phone: '0301-5544332',
  role: 'customer',
  location: 'Latifabad Unit 6, Hyderabad',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(defaultUser);
  const [role, setRoleState] = useState<UserRole>('customer');
  const [locality, setLocality] = useState<string>('Latifabad Unit 6');

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (user) {
      setUser({ ...user, role: newRole });
    }
  };

  const login = (email: string, userRole: UserRole = 'customer') => {
    setUser({
      ...defaultUser,
      email,
      role: userRole
    });
    setRoleState(userRole);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        setRole,
        locality,
        setLocality,
        login,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
