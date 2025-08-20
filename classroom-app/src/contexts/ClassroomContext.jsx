import { createContext, useContext, useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const ClassroomContext = createContext();

export function ClassroomProvider({ children }) {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClassrooms = async () => {
    const querySnapshot = await getDocs(collection(db, "classrooms"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setClassrooms(data);
  };

  const addClassroom = async (classroom) => {
    const docRef = await addDoc(collection(db, "classrooms"), classroom);
    setClassrooms([...classrooms, { id: docRef.id, ...classroom }]);
  };

  const getClassroom = async (id) => {
    const docRef = doc(db, "classrooms", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  };

  useEffect(() => {
    fetchClassrooms().finally(() => setLoading(false));
  }, []);

  return (
    <ClassroomContext.Provider
      value={{ classrooms, fetchClassrooms, addClassroom, getClassroom }}
    >
      {!loading && children}
    </ClassroomContext.Provider>
  );
}

export function useClassroom() {
  return useContext(ClassroomContext);
}
