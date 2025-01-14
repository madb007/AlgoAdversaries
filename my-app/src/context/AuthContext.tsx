'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { authService } from '../lib/auth/cognito';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children} : {children:React.ReactNode}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [User, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if(currentUser) {
      currentUser.getSession((err: any, session: any) => {
        if(session.isValid()) {
          setIsAuthenticated(true);
          setUser(currentUser);
        }
      });
    }
  }, []);
}