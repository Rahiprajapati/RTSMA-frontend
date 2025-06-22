// // import React, { createContext, useContext, useEffect, useState } from 'react';

// // const AuthContext = createContext();

// // export const useAuth = () => useContext(AuthContext);

// // export const AuthProvider = ({ children }) => {
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     // Check if user is logged in from localStorage
// //     const token = localStorage.getItem('token');
// //     const userData = localStorage.getItem('user');
    
// //     if (token && userData) {
// //       setIsAuthenticated(true);
// //       setUser(JSON.parse(userData));
// //     }
    
// //     setLoading(false);
// //   }, []);

// //   const login = (userData, token) => {
// //     localStorage.setItem('token', token);
// //     localStorage.setItem('user', JSON.stringify(userData));
// //     setIsAuthenticated(true);
// //     setUser(userData);
// //   };

// //   const logout = () => {
// //     localStorage.removeItem('token');
// //     localStorage.removeItem('user');
// //     setIsAuthenticated(false);
// //     setUser(null);
// //   };

// //   const value = {
// //     isAuthenticated,
// //     user,
// //     loading,
// //     login,
// //     logout
// //   };

// //   return (
// //     <AuthContext.Provider value={value}>
// //       {!loading && children}
// //     </AuthContext.Provider>
// //   );
// // };



// // import React, { createContext, useContext, useEffect, useState } from 'react';
// // import { login as apiLogin, register as apiRegister, getUserProfile } from '../services/api';

// // const AuthContext = createContext();

// // export const useAuth = () => useContext(AuthContext);

// // export const AuthProvider = ({ children }) => {
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     // Check if user is logged in from localStorage
// //     const token = localStorage.getItem('token');
    
// //     if (token) {
// //       // Verify token by fetching user profile
// //       getUserProfile()
// //         .then(response => {
// //           setUser(response.user);
// //           setIsAuthenticated(true);
// //         })
// //         .catch(() => {
// //           // If token is invalid, clear localStorage
// //           localStorage.removeItem('token');
// //           localStorage.removeItem('user');
// //         })
// //         .finally(() => {
// //           setLoading(false);
// //         });
// //     } else {
// //       setLoading(false);
// //     }
// //   }, []);

// //   const login = async (credentials) => {
// //     try {
// //       const response = await apiLogin(credentials);
// //       localStorage.setItem('token', response.token);
// //       localStorage.setItem('user', JSON.stringify(response.user));
// //       setIsAuthenticated(true);
// //       setUser(response.user);
// //       return { success: true };
// //     } catch (error) {
// //       return { 
// //         success: false, 
// //         message: error.response?.data?.error || 'Login failed' 
// //       };
// //     }
// //   };

// //   const register = async (userData) => {
// //     try {
// //       const response = await apiRegister(userData);
// //       localStorage.setItem('token', response.token);
// //       localStorage.setItem('user', JSON.stringify(response.user));
// //       setIsAuthenticated(true);
// //       setUser(response.user);
// //       return { success: true };
// //     } catch (error) {
// //       return { 
// //         success: false, 
// //         message: error.response?.data?.error || 'Registration failed' 
// //       };
// //     }
// //   };

// //   const logout = () => {
// //     localStorage.removeItem('token');
// //     localStorage.removeItem('user');
// //     setIsAuthenticated(false);
// //     setUser(null);
// //   };

// //   const value = {
// //     isAuthenticated,
// //     user,
// //     loading,
// //     login,
// //     register,
// //     logout
// //   };

// //   return (
// //     <AuthContext.Provider value={value}>
// //       {!loading && children}
// //     </AuthContext.Provider>
// //   );
// // };





// import React, { createContext, useContext, useEffect, useState } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // This effect runs once on component mount
//   useEffect(() => {
//     // Check if user is logged in from localStorage
//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');
    
//     if (token && userData) {
//       console.log("Found saved authentication data, restoring session");
//       setIsAuthenticated(true);
//       try {
//         setUser(JSON.parse(userData));
//       } catch (e) {
//         console.error("Error parsing user data from localStorage:", e);
//         // If there's an error parsing, clear the invalid data
//         localStorage.removeItem('user');
//       }
//     } else {
//       console.log("No saved authentication data found");
//     }
    
//     setLoading(false);
//   }, []);

//   const login = (userData, token) => {
//     console.log("Logging in user:", userData.username || userData.email);
//     localStorage.setItem('token', token);
//     localStorage.setItem('user', JSON.stringify(userData));
//     setIsAuthenticated(true);
//     setUser(userData);
//   };

//   const logout = () => {
//     console.log("Logging out user");
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setIsAuthenticated(false);
//     setUser(null);
//   };

//   const value = {
//     isAuthenticated,
//     user,
//     loading,
//     login,
//     logout
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };




import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing token on app load
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setToken(savedToken);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      console.log('AuthContext: Attempting registration with:', userData);
      
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log('AuthContext: Registration response:', data);

      if (response.ok && data.success) {
        // Store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        setToken(data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        
        return { success: true, message: data.message };
      } else {
        console.error('Registration failed:', data.error);
        return { success: false, message: data.error || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const login = async (credentials) => {
    try {
      console.log('AuthContext: Attempting login with:', credentials.email);
      
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      console.log('AuthContext: Login response:', data);

      if (response.ok && data.success) {
        // Store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        setToken(data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        
        return { success: true, message: data.message };
      } else {
        console.error('Login failed:', data.error);
        return { success: false, message: data.error || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
