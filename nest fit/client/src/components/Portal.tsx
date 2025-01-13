import { createPortal } from "react-dom";

export const Portal: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const portalRoot = document.getElementById("portal-root");
  if (!portalRoot) return null;

  return createPortal(children, portalRoot);
};
