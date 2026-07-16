import { useEffect } from "react";

export default function useKeyboard(handlers) {
  useEffect(() => {
    function onKeyDown(event) {
      const handler = handlers[event.key];
      if (!handler) {
        return;
      }
      handler(event);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [handlers]);
}
