import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function useIdleLogout({ idleMs = 15 * 60 * 1000 } = {}) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    let timer;

    const reset = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        logout();
        navigate("/login", { replace: true });
      }, idleMs);
    };

    const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];
    events.forEach((eventName) =>
      window.addEventListener(eventName, reset, { passive: true })
    );

    reset();

    return () => {
      clearTimeout(timer);
      events.forEach((eventName) =>
        window.removeEventListener(eventName, reset)
      );
    };
  }, [idleMs, logout, navigate]);
}
