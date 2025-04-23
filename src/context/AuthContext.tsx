
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type UserRole = "job-seeker" | "recruiter";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyName?: string; // Added companyName as optional property
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem("isAuthenticated");
    const userData = localStorage.getItem("user");
    
    if (auth === "true" && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    // Mock login - in a real app you would verify with a backend
    const userId = Math.random().toString(36).substring(2, 15);
    const user: User = { 
      id: userId, 
      name: email.split('@')[0], 
      email, 
      role,
      // Add default companyName for recruiters
      ...(role === "recruiter" ? { companyName: "My Company" } : {})
    };
    
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(user));
    
    setIsAuthenticated(true);
    setUser(user);
  };

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    // Mock signup - in a real app you would register with a backend
    const userId = Math.random().toString(36).substring(2, 15);
    const user: User = { 
      id: userId, 
      name, 
      email, 
      role,
      // Add default companyName for recruiters
      ...(role === "recruiter" ? { companyName: "My Company" } : {})
    };
    
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(user));
    
    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
