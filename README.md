# afro-fashion.app

- is a react application designed for e-commerce: Africa's original fashion marketplace.
- This project was built on ReactJS & npm ^18, custom sass, stripe, firebase & firestore.


## Render Structure
  
- The absolute routing & responsiveness of this app's UI depends on how the components are rendered.
- Rewriting "create-react-app" default config, App.js is rendered inside the *index.js* file like so;

  *import App from './App' ;*

  *ReactDOM.createRoot(document.getElementById('root'))
    .render(
      <React.StrictMode>
        <BrowserRouter>
         <UserProvider>
          <CategoriesProvider>
           <CartProvider>
            <App />
           </CartProvider>
          </CategoriesProvider>
         </UserProvider>
        </BrowserRouter>
      </React.StrictMode>
   );*
    
- In this application, App.js is nested under CartProvider and uses her context for our UX.
- CartProvider is nested under CategoriesProvider and uses her context for our app data UI.
- CategoriesProvider is nested under UserProvider and uses her context for user-session-log. 
- UserProvider is nested under BrowserRouter and uses her memory to navigate the entire app.
- BrowserRouter is rendered by React.StrictMode- StrictMode wraps and sets the component tree. 


## Component Structure

  The main components of this application can be found under the *src* directory like so;
  
* src
  * components 
    * > 0-hero-components
    * > 1-header-components
    * > 2-terminal-components
    * > 3-summary-components
    * > 4-resume-components
    * > 5-abme-components
    * > 6-xp-components
    * > 8-sppro-components
    * > 9-footer-components
   

## 0-hero-components
The Hero component holds a Bulma style used dynamically from 1-header-components to 9-footer-components.

## 1-header-components
The header components run the header and toobar section of this app and renders to both mobile and larger viewports.

## 2-terminal-components
The terminal component is a single, integral 'fa-' element that renders to both mobile and larger viewports.

## 3-summary-components
The summary components show the summary and rotating image section, and renders to both mobile and larger viewports.

## 4-resume-components
The resume components hold a resume document, displays modal and renders to both mobile and larger viewports.

## 5-abme-components
The abme components show a png image, 'ABOUT ME' and sub-components, and renders to both mobile and larger viewports.

## 6-xp-components
The xp components run the 'EXPERIENCE' and xp-cards section, and renders to both mobile and larger viewports.

## 8-sppro-components
The sppro components show the 'PREVIOUS PROJECTS' and images section, and renders to both mobile and larger viewports.

## 9-footer-components
The footer components run the footer and contact icons section and renders to both mobile and larger viewports.


# Designed & Developed by Gideon, I
