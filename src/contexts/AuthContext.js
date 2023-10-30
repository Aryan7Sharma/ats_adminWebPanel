// AuthContext.js
import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children, initialState }) {
  const [user, setUser] = useState(initialState); // State to store user data

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

  
