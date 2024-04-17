import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/user.context';
import { CartProvider } from './contexts/cart.context';
import { AlertProvider } from './contexts/alert.context';
import { BrandProvider } from './contexts/brand.context';
import { LoadingProvider } from './contexts/loading.context';
import { CategoriesProvider } from './contexts/categories.context';

import './index.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <AlertProvider>
          <UserProvider>
            <CategoriesProvider>
              <BrandProvider>
                <CartProvider>
                  <App />
                </CartProvider>
              </BrandProvider>
            </CategoriesProvider>
          </UserProvider>
        </AlertProvider>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
