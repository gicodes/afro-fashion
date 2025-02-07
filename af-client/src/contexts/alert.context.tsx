import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { Alert, Container, Row, Col, Button } from 'react-bootstrap';

interface AlertProp {
  id: number;
  variant: string;
  message: string;
  autoClose: boolean;
  onYes?: () => void;
  onNo?: () => void;
}

interface AlertContextType {
  alerts: AlertProp[];
  addAutoCloseAlert: (variant: string, message: string) => void;
  addCloseButtonAlert: (variant: string, message: string) => void;
  addOptionsAlert: (variant: string, message: string, onYes: () => void, onNo: () => void) => void;
  removeAlert: (id: number) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertProp[]>([]);

  const removeAlert = useCallback((id: number) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  }, []);

  const addAutoCloseAlert = useCallback((variant: string, message: string) => {
    const newAlert = { id: new Date().getTime(), variant, message, autoClose: true };
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);

    setTimeout(() => {
      removeAlert(newAlert.id);
    }, 3000);
  }, [removeAlert]);

  const addCloseButtonAlert = useCallback((variant: string, message: string) => {
    const newAlert = { id: new Date().getTime(), variant, message, autoClose: false };
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
  }, []);

  const addOptionsAlert = useCallback((variant: string, message: string, onYes: () => void, onNo: () => void) => {
    const newAlertId = new Date().getTime();
    const newAlert = { id: newAlertId, variant, message, autoClose: false, 
      onYes: () => {
        onYes?.(); 
        removeAlert(newAlertId); 
      }, 
      onNo: () => {
        onNo?.();
        removeAlert(newAlertId); 
      } 
    };
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
  }, [removeAlert]);

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

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};