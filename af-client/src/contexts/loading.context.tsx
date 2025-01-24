import React, { createContext, useContext, useState, useMemo, memo } from 'react';
import { Modal, Spinner } from 'react-bootstrap';

interface LoadingContextType {
  showLoading: () => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0);

  const showLoading = () => {
    setLoadingCount((prevCount) => prevCount + 1);
  };

  const hideLoading = () => {
    setLoadingCount((prevCount) => Math.max(prevCount - 1, 0));
  };

  // Determine if loading is active
  const isLoading = loadingCount > 0;

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    showLoading,
    hideLoading,
  }), []);

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
      <MemoizedLoadingModal show={isLoading} />
    </LoadingContext.Provider>
  );
};

// Custom hook to use loading context
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

// Memoized LoadingModal component
const LoadingModal = ({ show }) => {
  return (
    <Modal show={show} centered>
      <Modal.Body className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Modal.Body>
    </Modal>
  );
};

const MemoizedLoadingModal = memo(LoadingModal);
