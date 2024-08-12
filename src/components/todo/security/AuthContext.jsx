import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuthenticated, username, setUsername }}
    >
      {children}
    </AuthContext.Provider>
  );
}
