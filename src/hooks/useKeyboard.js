import { useEffect, useRef } from "react";

export default function useKeyboard(handlers) {
  const paused = useRef(false);

  function pause() {
    paused.current = true;
  }

  function resume() {
    paused.current = false;
  }

  useEffect(() => {
    function onKeyDown(event) {
      const handler = handlers[event.key];
      if (!handler) {
        return;
      }
      if (event.key === " " && paused.current) {
        return;
      }
      handler(event);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [handlers]);

  return { pause, resume };
}
