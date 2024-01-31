import { createContext, useContext, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0);

  const showLoading = () => {
    setLoadingCount((prevCount) => prevCount + 1);
  };

  const hideLoading = () => {
    setLoadingCount((prevCount) => Math.max(prevCount - 1, 0));
  };

  const isLoading = loadingCount > 0;

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}
      <LoadingModal show={isLoading} />
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

const LoadingModal = ({ show }) => {
  return (
    <Modal show={show} centered>
      <Modal.Body className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading...</p>
      </Modal.Body>
    </Modal>
  );
};
