import { useState, useEffect, useCallback } from "react";
import { Windows } from "react-bootstrap-icons";

export const useAuth = () => {
  const [userId, setUserId] = useState(false);
  const [username, setUsername] = useState(false);

  const login = useCallback((username, userId) => {
    setUserId(userId);
    setUsername(username);

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
    sessionStorage.clear();
  }, []);

  return { login, logout, userId, username };
};
