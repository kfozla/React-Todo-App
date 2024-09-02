import { createContext, useContext, useState } from "react";
import { executeBasicAuthenticationService } from "../api/TodoApiService";
import { apiClient } from "../api/ApiClient";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticationValue, setAuthenticationValue] = useState(null);
  const [token, setToken] = useState("");
  async function authenticate() {
    const basicToken = "Basic " + window.btoa(username + ":" + password);
    try {
      const response = await executeBasicAuthenticationService(basicToken);
      if (response.status == 200) {
        setAuthenticated(true);
        setUsername(username);
        setToken(basicToken);
        apiClient.interceptors.request.use((config) => {
          config.headers.Authorization = basicToken;
          return config;
        });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        username,
        setUsername,
        password,
        setPassword,
        authenticationValue,
        setAuthenticationValue,
        authenticate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
