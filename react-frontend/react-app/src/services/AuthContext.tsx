import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { memberService, api } from '../services/MemberService';

interface AuthContextType {
  user: any;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(() => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const initAuth = () => {
      const user = memberService.getCurrentUser();
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
        setIsAdmin(user.is_admin); // Make sure to use is_admin not isAdmin
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await memberService.login(email, password);
      const userData = response.member;
      setUser(userData);
      setIsAuthenticated(true);
      setIsAdmin(response.member.is_admin); // Make sure to use is_admin not isAdmin
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    memberService.logout();
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  const register = async (userData: any) => {
    await memberService.register(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        isAdmin,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};