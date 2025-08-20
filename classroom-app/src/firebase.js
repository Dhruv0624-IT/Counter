// src/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBnXqQ-B3IXL1XHPxJ0dH8fa9jDE34-Bxk",
  authDomain: "classroom-app-ecd05.firebaseapp.com",
  projectId: "classroom-app-ecd05",
  storageBucket: "classroom-app-ecd05.appspot.com", // ✅ FIXED
  messagingSenderId: "759181349461",
  appId: "1:759181349461:web:f1086438df189b0a7abadc"
};

// ✅ Prevent duplicate initialization (important in Vite/React HMR)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
