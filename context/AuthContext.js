"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Dynamic import of Firestore to avoid initial bundle bloat
          const { doc, getDoc } = await import('firebase/firestore');
          const { db } = await import('../lib/firebase');
          
          if (!db) {
            console.error("Database not initialized for RBAC check.");
            firebaseSignOut(auth);
            setCurrentUser(null);
            setLoading(false);
            return;
          }

          const userDoc = await getDoc(doc(db, "users", user.uid));
          
          if (userDoc.exists() && userDoc.data().role === 'admin') {
            setCurrentUser(user);
          } else {
            console.warn("Unauthorized login attempt blocked by RBAC. Only the owner can access this portal.");
            firebaseSignOut(auth);
            setCurrentUser(null);
          }
        } catch (error) {
          console.error("Error verifying admin role:", error);
          firebaseSignOut(auth);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = () => {
    return firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
