import {createUserWithEmailAndPassword,signInWithEmailAndPassword,sendPasswordResetEmail,signOut,
    updateProfile,onAuthStateChanged,} from "firebase/auth";
import { auth } from "../firebase";


export const registerUser = async (email, password, displayName = "") => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  if (displayName) {
    await updateProfile(user, { displayName });
  }

  return user;
};


export const loginUser = async (email, password) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};


export const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
  return true;
};

export const logoutUser = async () => {
  await signOut(auth);
};


export const updateUserProfile = async (profileData) => {
  if (!auth.currentUser) throw new Error("No authenticated user");
  await updateProfile(auth.currentUser, profileData);
  return auth.currentUser;
};


export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};
