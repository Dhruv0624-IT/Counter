import { useContext } from "react";
import { useAuth } from "../contexts/AuthContext"; 
export function useAuth() {
  return useContext(AuthContext);
}
