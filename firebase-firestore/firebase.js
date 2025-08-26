import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAinp-ZnOFbud5BG9D7npvEInkL_jtQkPg",
  authDomain: "fir-79fb4.firebaseapp.com",
  projectId: "fir-79fb4",
  storageBucket: "fir-79fb4.firebasestorage.app",
  messagingSenderId: "67730898978",
  appId: "1:67730898978:web:d931819215954727800a7b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

export {auth,db};
