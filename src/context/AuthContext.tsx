"use client"

import { useState, useEffect, createContext, useContext } from 'react';
import { auth } from '@/lib/firebaseConfig'; // Make sure to import your Firebase config
import { onAuthStateChanged } from 'firebase/auth';

const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set the user state if authenticated
      setLoading(false); // Set loading to false once the auth state is determined
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user data
export const useUser = () => useContext(UserContext);
