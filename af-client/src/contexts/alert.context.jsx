import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { Alert, Container, Row, Col, Button } from 'react-bootstrap';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  // Memoized function to remove alert by ID
  const removeAlert = useCallback((id) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  }, []);

  // Memoized function to add an auto-close alert
  const addAutoCloseAlert = useCallback((variant, message) => {
    const newAlert = { id: new Date().getTime(), variant, message, autoClose: true };
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);

    setTimeout(() => {
      removeAlert(newAlert.id);
    }, 3000);
  }, [removeAlert]);

  // Memoized function to add a close-button alert
  const addCloseButtonAlert = useCallback((variant, message) => {
    const newAlert = { id: new Date().getTime(), variant, message, autoClose: false };
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
  }, []);

  // Memoized function to add an options alert with Yes/No buttons
  const addOptionsAlert = useCallback((variant, message, onYes, onNo) => {
    const newAlert = { id: new Date().getTime(), variant, message, autoClose: true, onYes, onNo };
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
  }, []);

  // Memoized context value
  const contextValue = useMemo(() => ({
    alerts,
    addAutoCloseAlert,
    addCloseButtonAlert,
    addOptionsAlert,
    removeAlert,
  }), [alerts, addAutoCloseAlert, addCloseButtonAlert, addOptionsAlert, removeAlert]);

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
      <Container
        style={{
          position: 'fixed',
          top: '10px',
          zIndex: 9999,
          margin: 'auto',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Row>
          <Col className="col-md-6 mx-auto">
            {alerts.map((alert) => (
              <Alert
                key={alert.id}
                variant={alert.variant}
                onClose={() => {
                  removeAlert(alert.id);
                  if (alert.onNo) alert.onNo();
                }}
                dismissible={!alert.autoClose}
              >
                <div className="flex-just-center">
                  {alert.message}
                </div>
                {alert.onYes && alert.onNo && (
                  <div className="mt-3 flex-space-bet">
                    <Button variant="success" onClick={alert.onYes}>
                      Yes
                    </Button>{' '}
                    <Button variant="danger" onClick={alert.onNo}>
                      No
                    </Button>  
                  </div>
                )}
              </Alert>
            ))}
          </Col>
        </Row>
      </Container>
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);