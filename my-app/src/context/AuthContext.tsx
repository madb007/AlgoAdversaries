'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter} from 'next/navigation';


interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  confirmPassword: (email: string, code: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children} : {children:React.ReactNode}) {
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    checkSession().finally(() => setIsLoading(false));
  },[]);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if(currentUser) {
      currentUser.getSession((err: any, session: any) => {
        if(session.isValid()) {
          setIsAuthenticated(true);
          setUser({
            email: currentUser.getUsername(),
            cognitoUser: currentUser,
          });
        }
      });
    }
  }, []);
  
  const login = async(email: string, password: string) => {
    try {
      const result = await authService.signIn(email,password) as SignInResult;
      setIsAuthenticated(true);
      setUser({
        email,
        cognitoUser: result.user,
      });
      toast.success("Successfully Logged In");
    } catch(err : any){
      toast.error(err.message);
      throw err;
    }
  };

  const register = async(email: string, password: string) => {
    try {
      await authService.signUp(email,password);
      toast.success("Successfully registered! Check your email for verification.");
    } catch(err: any){
      toast.error(err.message);
      throw err;
    }
  };

  const logout = async() => {
    try {
      await authService.signOut();
      toast.success("Sueccessfully logged out!");
    } catch(err : any){
      toast.error("err.message");
      throw err;
    }
  };

  const checkSession = async () => {
    const currentUser = authService.getCurrentUser();
    if(currentUser) {
      try {
        await new Promise((resolve, reject) => {
          currentUser.getSession((err: any, session: any) => {
            if (err) reject(err);
            else resolve(session);
          }); 
        });
        setIsAuthenticated(true);
        setUser({
          email: currentUser.getUsername(),
          cognitoUser: currentUser,
        });
      } catch(err : any){
        toast.error('Session check failed',err);
        await logout();
      }
    }
  }

  return (
    <AuthContext.Provider value = {{isAuthenticated, user, login, logout, register}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if(context === undefined) {
    throw new Error('useAuth must be used within AuthProvider context');
  }
  return context;
};