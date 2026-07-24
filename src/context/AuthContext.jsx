import { createContext, useContext, useEffect, useState } from "react";
import { api, getToken, setToken, clearToken } from "../lib/api";

// Real API-backed auth: talks to the Express backend in /backend, which
// issues JWTs. The token is kept in localStorage and sent as a Bearer
// header on every authenticated request (see src/lib/api.js).

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const bootstrap = async () => {
      const token = getToken();
      if (!token) {
        setReady(true);
        return;
      }
      try {
        const { user: me } = await api.me();
        setUser(me);
      } catch {
        clearToken();
      } finally {
        setReady(true);
      }
    };
    bootstrap();
  }, []);

  const signup = async ({ name, email, password }) => {
    const { token, user: newUser } = await api.signup({ name, email, password });
    setToken(token);
    setUser(newUser);
    return newUser;
  };

  const login = async ({ email, password }) => {
    const { token, user: loggedInUser } = await api.login({ email, password });
    setToken(token);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, ready, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
