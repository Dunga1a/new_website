import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const protocol = window.location.protocol;
  const domain = window.location.hostname;
  const PORT = process.env.REACT_APP_PORT;
  const url = `${protocol}//${domain}:${PORT}`;
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (value) => {
    setCurrentUser(value);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser !== currentUser) {
      setCurrentUser(storedUser);
    }
    if (storedUser !== null) {
      setTimeout(() => {
        localStorage.setItem("user", null);
        localStorage.removeItem("hasShownPopup");
        window.location.href = "/";
      }, 86000 * 1000);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, url }}>
      {children}
    </AuthContext.Provider>
  );
};
