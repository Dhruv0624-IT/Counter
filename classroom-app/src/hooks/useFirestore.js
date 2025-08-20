import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase"; 


export default function useFirestore(collectionName) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDocuments(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [collectionName]);

  const addDocument = async (data) => {
    return await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: new Date(),
    });
  };

  const updateDocument = async (id, data) => {
    const docRef = doc(db, collectionName, id);
    return await updateDoc(docRef, data);
  };

  const deleteDocument = async (id) => {
    const docRef = doc(db, collectionName, id);
    return await deleteDoc(docRef);
  };

  return {
    documents,
    loading,
    addDocument,
    updateDocument,
    deleteDocument,
  };
}
