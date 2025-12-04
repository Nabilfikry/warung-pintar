import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

// Demo accounts data
const DEMO_ACCOUNTS = {
  'test@warung.com': {
    user: {
      id: 1,
      name: 'Demo UMKM',
      email: 'test@warung.com',
      user_type: 'umkm',
      business_name: 'Warung Demo',
      business_category: 'Retail',
      address: 'Jl. Demo No. 123, Jakarta',
      phone: '081234567890',
    },
    token: 'demo-token-umkm-12345',
  },
  'investor@test.com': {
    user: {
      id: 2,
      name: 'Demo Investor',
      email: 'investor@test.com',
      user_type: 'investor',
      business_name: 'Investor Demo',
      business_category: 'Investor',
      address: 'Jl. Investor No. 456, Jakarta',
      phone: '081234567891',
    },
    token: 'demo-token-investor-12345',
  },
};

// Check if email/password is a demo account
const isDemoAccount = (email, password) => {
  return (
    (email === 'test@warung.com' && password === 'password123') ||
    (email === 'investor@test.com' && password === 'password123')
  );
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Check if this is a demo account
    if (isDemoAccount(email, password)) {
      const demoData = DEMO_ACCOUNTS[email];
      if (demoData) {
        localStorage.setItem('token', demoData.token);
        localStorage.setItem('user', JSON.stringify(demoData.user));
        
        setUser(demoData.user);
        setIsAuthenticated(true);
        
        return { success: true };
      }
    }

    // Try real API login
    try {
      const response = await authAPI.login(email, password);
      const { user, token } = response.data.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setUser(user);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login gagal. Periksa email dan password Anda.' 
      };
    }
  };

  const register = async (data) => {
    try {
      const response = await authAPI.register(data);
      const { user, token } = response.data.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setUser(user);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registrasi gagal. Silakan coba lagi.' 
      };
    }
  };

  const logout = async () => {
    const token = localStorage.getItem('token');
    const isDemoToken = token && token.startsWith('demo-token-');
    
    // Only call API if not a demo account
    if (!isDemoToken) {
      try {
        await authAPI.logout();
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = async (data) => {
    const token = localStorage.getItem('token');
    const isDemoToken = token && token.startsWith('demo-token-');
    
    // For demo accounts, update locally
    if (isDemoToken && user) {
      const updatedUser = { ...user, ...data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return { success: true };
    }
    
    // Try real API update
    try {
      const response = await authAPI.updateProfile(data);
      const updatedUser = response.data.data;
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Gagal memperbarui profil.' 
      };
    }
  };

  const changePassword = async (currentPassword, newPassword, newPasswordConfirmation) => {
    const token = localStorage.getItem('token');
    const isDemoToken = token && token.startsWith('demo-token-');
    
    // For demo accounts, just return success
    if (isDemoToken) {
      return { success: true };
    }
    
    // Try real API change password
    try {
      await authAPI.changePassword({
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: newPasswordConfirmation,
      });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Gagal mengubah password.' 
      };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      loading,
      isAuthenticated,
      login,
      register,
      logout,
      updateProfile,
      changePassword,
    }}>
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

