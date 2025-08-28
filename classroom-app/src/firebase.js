// src/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔑 Firebase config from your project settings
const firebaseConfig = {
  apiKey: "AIzaSyBnXqQ-B3IXL1XHPxJ0dH8fa9jDE34-Bxk",
  authDomain: "classroom-app-ecd05.firebaseapp.com",
  projectId: "classroom-app-ecd05",
  storageBucket: "classroom-app-ecd05.appspot.com",
  messagingSenderId: "759181349461",
  appId: "1:759181349461:web:f1086438df189b0a7abadc"
};

// ✅ Prevent re-initialization in dev (Vite/HMR)
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
