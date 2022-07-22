import { useState, useEffect, useCallback } from "react";
import { Windows } from "react-bootstrap-icons";

export const useAuth = () => {
  const [userId, setUserId] = useState(false);
  const [username, setUsername] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback((username, userId) => {

    console.log("setting session storage now.... username: " + username + "    userId: " + userId)
    setUserId(userId);
    setUsername(username);
    setIsLoggedIn(true);

    sessionStorage.setItem(
      "session",
      JSON.stringify({
        username: username,
        userId: userId,
      })
    );
  }, []);

  const logout = useCallback(() => {
    console.log("Logging out method called [AUTH-HOOK]...");
    setUserId(null);
    setUsername(null);
    setIsLoggedIn(false);
    sessionStorage.clear();
  }, []);

  return { login, logout, userId, username, isLoggedIn };
};
