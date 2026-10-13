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

  function onClick(event) {
    if (!event.target.classList.contains("modal")) {
      return;
    }
    onClose();
  }

  return (
    <dialog ref={ref} onCancel={onClose} className="modal" onClick={onClick}>
      <div className="modal-content">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </dialog>
  );
}
