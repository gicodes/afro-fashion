# afro-fashion.app

- is a react application designed for e-commerce: Africa's original fashion marketplace.
- This project was built on ReactJS & npm ^18, custom sass, stripe, firebase & firestore.


## Render Structure
  
- The absolute routing & responsiveness of this app's UI depends on the render structure.
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
    
- In this application, App.js is nested under CartProvider and uses her context for the UX.
- CartProvider is nested under CategoriesProvider and uses her context for the app data UI.
- CategoriesProvider is nested under UserProvider and uses her context for user-session-log. 
- UserProvider is nested under BrowserRouter and uses her memory to navigate the entire app.
- BrowserRouter is rendered by React.StrictMode- StrictMode wraps and sets the component tree. 


## Component Structure

  The main components of this application can be found under the *src* directory like so;
  
* src
  * components 
    * > assets
    * > buttons
    * > cartsets
      * > cart-content
      * > cart-dropdown
      * > cart-icon
      * > checkout 
    * > collection
    * > directory
    * > products
    * > routes
      * > authentication
      * > category
      * > home
      * > navbar
      * > shop
  * contexts
    * > cart.context
    * > categories.context
    * > users.context
  * utils
    * > firebase.utils
   

## assets
The assets used include SVG elements that are integral and unique to the brand or consistency of the application's UI.

## buttons
The buttons hold .jsx and .scss components dynamically used and rendered throughout the application's UI.

## cartsets
The cartsets directory is a parent to cart components and functionality used and rendered throughout the application.

## collection
The collection holds .jsx and .scss components responsible for categorizing data for the application's UI.

## directory
The directory is a single, integral .jsx component responsible for reacting and rendering of the collection components.

## products
The products hold .jsx and .scss components dynamically used and rendered throughout the application's UI.

## routes
The routes directory is a parent to router components and routing functionalities rendered throughout the application.

## cart.context
The cart.context holds the context and providers for cart components and renders throughout the application.

## categories.context
The categories.context holds the context and value provider for data categories and renders throughout the application.

## users.context
The users.context holds the context and providers for user-session-log and renders throughout the application.

## firebase.utils
The firebase.utils hold configurations for firebase, firestore and google providers used as authentication in the application.


# Designed & Developed by Gideon, I
