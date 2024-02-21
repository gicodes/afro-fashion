# Afro Fashion

- is an e-commerce application, aiming to be Africa's original fashion marketplace.
- This app is built on react.js + node.js, styled with custom scss and react-bootstrap.
- This app's node manager runs on npm v18, and has several lightweight dependencies like firebase.

## How to Start App

- Make sure you are in the correct working directory - `cd` into the project root folder `Afro-fashion-main/`
- To install the projects required packges and dependencies, run `npm install`.
  Make sure to do this for both `af-client `and `af-server`
- This app is configured to run/ start the client simultenously with the server, using a run-all --parrallel package that is installed as a dependency for this app.
- Once the packages are installed and your package.json files are updated, to start the app, go to the root directory and run `npm run dev`

## Render Structure

- The routing and data-flow of this app depends on how it is structured.
- You can find two (2) app directories under the main or foot directory:

  > `af-client` 
  > `af-server`

- Most of the application logic and code-base can be found in the af-client directory as it houses the front-end components, pages and other react dependencies.
- The server-side is a simple and light-weight express.js application that handles back-end operations such as nodejs API logic or other third-party api operations.
- Rewriting this tree structure would mean that the existing logic and data-flow would be compromised. Therefore, such actions can only be permitted in cases such as migrations or extreme app scaling.

## Component Structure

The main components of this application can be found under the _src_ directory like so;

- af-client

  - public
  - src
  - App.js
  - App.test.js
  - index.js
  - index.scss
  - reportWebVitals.js
  - setupTests.js
  - package-lock.json
  - package.json
  - App.test.js

  ***

- af-server

  - utils
  - server.js

# Tech Stack

- Cors
- Dot-env
- React.js
- Express.js
- Flutterwave-node-v3
- Flutterwave-react-v3
- Node.js
- Netlify
- Github
- Jest (_testing_)

# Author: Gideon, I
