import { useEffect, useRef } from 'react';

const useClickOutside = (isOpen: boolean, onClose: () => void) => {
  const navBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && navBarRef.current && !navBarRef.current.contains(event.target as Node)) onClose();
    };

    document.body.style.overflow = isOpen ? "hidden" : ""; // disable scrolling when the popup is open
    document.addEventListener("mousedown", handleClickOutside);

    return () => {// cleanup on unmount or when `isOpen` changes
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return navBarRef;
};

export default useClickOutside;