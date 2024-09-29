# Afro Fashion

  Afro Fashion is an e-commerce platform, aimed at becoming Africa's premier fashion marketplace. Built with React.js and Node.js, it offers a seamless user experience, leveraging Firebase for backend functionality and custom SCSS for styling.

## Features

  - User authentication with Google and Firebase
  - Dynamic cart and category management
  - Brand-specific storefronts for sellers
  - Responsive UI for both desktop and mobile
  - Secure payment integration via Flutterwave
  - WriteBatch and Firestore for efficient data transactions

## Tech Stack

  - `Frontend`: React.js, React-Bootstrap, SCSS
  - `Backend`: Node.js, Firebase, Firestore

  - **Authentication**: Firebase Auth, Google Sign-In
  - **Database**: Firestore (NoSQL)
  - **State Management**: React Context API
  - **Deployment**: Netlify, GitHub
  - **Testing**: Jest

## Getting Started

  ### Prerequisites
  Ensure that you have Node.js (v18+) installed on your machine.

  ### Installation

  1. Clone the repository and navigate to the `af-client` directory:
    
    git clone https://github.com/your-repo/afro-fashion.git
    cd afro-fashion/af-client

  2. Install dependencies
      `npm install`

  3. Create an .env.local file in the root of the `af-client` directory with necessary environment variables (API kets, Firebase config, etc.).

  4. Start the development server
      `npm start`

    The app will run on http://localhost:3000 or the port specified in your environment file.


## Core Components and Contexts
    The app is structured around key components and contexts to handle data and state:

  ### Contexts:

  1. alert.context: 
      Manages alert notifications across the app.
  2. brand.context: 
      Handles brand-specific data and UI rendering.
  3. cart.context: 
      Manages cart operations and item storage.
  4. category.context: 
      Tracks and filters products by category.
  5. loading.context: 
      Displays a loading modal during user interactions.
  6. user.context: 
      Manages user session and authentication state.

  ### Utilities:

    firebase.utils: Functions for authentication, Firestore, and writeBatch for batch operations.


## App Architecture

  The routing and UX are designed with responsiveness in mind, targeting two screen sizes (lg for desktop and sm for mobile). The core React app is wrapped in multiple context providers, which manage state for alerts, users, categories, brands, and cart operations

  <React.StrictMode>
    <BrowserRouter>
      <AlertProvider>
        <UserProvider>
          <CategoriesProvider>
            <BrandProvider>
              <CartProvider>
                <LoadingProvider>
                  <App />
                </LoadingProvider>
              </CartProvider>
            </BrandProvider>
          </CategoriesProvider>
        </UserProvider>
      </AlertProvider>
    </BrowserRouter>
  </React.StrictMode>

## Contribution
  Contributions are welcome! Please follow these steps:

  1. Fork the repository.

  2. Create a new branch for your feature/fix:
      `git checkout -b feature-branch`

  3. Commit your changes and push the branch:
      `git commit -m "<feature description>"`
      `git push origin <feature-branch>`

  4. Create a pull request.

  ### Authors and Contributors
        Author: Gideon I.
        Contributors: Adeola A.##

## License
  This project is licensed under the MIT License.
