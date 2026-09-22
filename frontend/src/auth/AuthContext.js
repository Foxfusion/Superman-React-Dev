import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext(null);

const API_BASE_URL =
  (typeof process !== "undefined" &&
    process.env &&
    process.env.REACT_APP_API_BASE_URL) ||
  "";

export function AuthProvider({ children }) {
  const existingToken = (() => {
    try {
      return localStorage.getItem("token") || "";
    } catch {
      return "";
    }
  })();

  const [token, setToken] = useState(existingToken);
  const [user, setUser] = useState(null);
  const [busy, setBusy] = useState(false);

  const isAuthenticated = !!token;

  const persistToken = useCallback((nextToken) => {
    try {
      if (nextToken) localStorage.setItem("token", nextToken);
      else localStorage.removeItem("token");
    } catch {
      // localStorage may be unavailable in restricted browser contexts
    }
  }, []);

  const logout = useCallback(() => {
    setToken("");
    setUser(null);
    persistToken("");
  }, [persistToken]);

  const authFetch = useCallback(
    async (path, options = {}) => {
      const headers = options.headers ? { ...options.headers } : {};

      if (token) headers.Authorization = "Bearer " + token;
      if (!headers["Content-Type"] && options.body) {
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(API_BASE_URL + path, {
        ...options,
        headers,
      });

      if (response.status === 401) logout();
      return response;
    },
    [token, logout]
  );

  const fetchMe = useCallback(async () => {
    if (!token) return;

    try {
      const response = await authFetch("/api/auth/me", { method: "GET" });
      if (!response.ok) return;

      const data = await response.json();
      setUser(data.user || data);
    } catch {
      // Keep the token state; a temporary API outage should not crash the UI.
    }
  }, [token, authFetch]);

  useEffect(() => {
    if (token) fetchMe();
    else setUser(null);
  }, [token, fetchMe]);

  const login = useCallback(
    async ({ email, password }) => {
      if (!email || !password) {
        throw new Error("Email and password are required.");
      }

      setBusy(true);
      try {
        const response = await fetch(API_BASE_URL + "/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        let data = null;
        try {
          data = await response.json();
        } catch {
          data = null;
        }

        if (!response.ok) {
          throw new Error((data && data.message) || "Login failed.");
        }

        if (!data || !data.token) {
          throw new Error("Login failed: token missing from server response.");
        }

        setToken(data.token);
        persistToken(data.token);
        setUser(data.user || null);
      } finally {
        setBusy(false);
      }
    },
    [persistToken]
  );

  const value = useMemo(
    () => ({
      token,
      user,
      busy,
      isAuthenticated,
      login,
      logout,
      setUser,
      fetchMe,
      authFetch,
      API_BASE_URL,
    }),
    [token, user, busy, isAuthenticated, login, logout, fetchMe, authFetch]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
