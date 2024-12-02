import { useContext } from "react";
import { AuthContext } from "../contextos/AuthContext"; // Cambiar a exportación nombrada

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
