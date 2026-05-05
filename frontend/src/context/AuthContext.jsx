import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(null);

const API_BASE_URL = "http://localhost:3000";
const AUTH_STORAGE_KEY = "edumentor-auth";

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    if (typeof window === "undefined") return null;

    const storedAuth = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return storedAuth ? JSON.parse(storedAuth) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (auth) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
    } else {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [auth]);

  const login = async (payload) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ user: payload }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const token = (data.token || "").replace(/^Bearer\s+/i, "");
      const nextAuth = {
        token,
        user: data.user,
      };

      setAuth(nextAuth);
      return data.user;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (payload) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ user: payload }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors?.join(", ") || data.message || "Signup failed");
      }

      const token = (data.token || "").replace(/^Bearer\s+/i, "");
      const nextAuth = {
        token,
        user: data.user,
      };

      setAuth(nextAuth);
      return data.user;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (!auth?.token) {
      setAuth(null);
      return;
    }

    try {
      await fetch(`${API_BASE_URL}/api/v1/logout`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
    } finally {
      setAuth(null);
    }
  };

  const value = useMemo(
    () => ({
      user: auth?.user || null,
      token: auth?.token || null,
      isAuthenticated: Boolean(auth?.token && auth?.user),
      isLoading,
      login,
      signup,
      logout,
    }),
    [auth, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
