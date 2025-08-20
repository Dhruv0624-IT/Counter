// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register new user
  async function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Login existing user
  async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Logout
  async function logout() {
    return signOut(auth);
  }

  // Update user profile (e.g., displayName, photoURL)
  async function updateUserProfile(profile) {
    if (!auth.currentUser) return;
    return updateProfile(auth.currentUser, profile);
  }

  // Watch for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
