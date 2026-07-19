import { useEffect, useRef } from "react";

export default function Modal({ isOpen, onClose, children }) {
  const ref = useRef();

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
      return;
    }
    ref.current?.close();
  }, [isOpen]);

  return (
    <dialog ref={ref} onCancel={onClose} className="modal">
      {children}
      <button onClick={onClose}>Close</button>
    </dialog>
  );
}
