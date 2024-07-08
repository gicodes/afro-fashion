import { useEffect } from 'react';

function AutoCloseOnClick({ isOpen, onClose }) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.dropdown')) {
        onClose();
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return null; 
}

export default AutoCloseOnClick;
