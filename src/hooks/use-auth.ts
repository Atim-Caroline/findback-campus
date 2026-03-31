import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    };

    window.addEventListener("storage", checkAuth);
    // Custom event for same-tab updates
    window.addEventListener("auth-change", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("auth-change", checkAuth);
    };
  }, []);

  const login = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
    window.dispatchEvent(new Event("auth-change"));
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    window.dispatchEvent(new Event("auth-change"));
  };

  return { isAuthenticated, login, logout };
};
