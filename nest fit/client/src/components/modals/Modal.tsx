import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode; // ✅ Add this line
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div ref={modalRef} className="bg-white rounded-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2"
          aria-label="Close modal"
        >
          ×
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("portal-root")!
  );
};
