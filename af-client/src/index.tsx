import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from "./contexts/user.context.tsx";
import { CartProvider } from "./contexts/cart.context.tsx";
import { AlertProvider } from "./contexts/alert.context.tsx";
import { BrandProvider } from "./contexts/brand.context.tsx";
import { LoadingProvider } from "./contexts/loading.context.tsx";
import { CategoriesProvider } from "./contexts/categories.context.tsx";
import App from './App.tsx';
import "./index.scss";

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
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
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
