# Afro Fashion

- is an e-commerce application, aiming to be Africa's original fashion marketplace.
- This app is built on react.js + node.js, styled with custom scss and react-bootstrap.
- This app's node manager runs on npm v18, and has several lightweight dependencies like firebase.

## How to Start App

- Make sure you are in the correct working directory - `cd` into the project root folder `Afro-fashion-main/`packages and dependencies, run `npm install`.![alt text](<Screenshot_npm_install.png>)
- The previous command should install npm packages for both directories, however in case it does NOT achieve that, you may want to manually install the packages by navigating to the directory: client or server or both (via terminal) and run `npm install`
- When all the necessary dependencies, packages and scripts are installed, you can start the apps, individually (Higher systen resource - Not recommended), or you can start them simultenously (from the root directory)
- This app is configured to run the client start-script simultenously with the server, using a run-all --parrallel package that is installed as a dependency for this app.
- Once the packages are installed and your package.json files are updated, to start the app, go to the root directory and run `npm run dev`
![alt text](<Screenshot_npm_run_dev.png>)


## Render Structure

- The routing and data-flow of this app depends on how it is structured.
- You can find two (2) app directories under the main or foot directory:

  > `af-client` 
  > `af-server`


## Component Structure

The main components of this application can be found under the _src_ directory like so;

- af-client

  - public/
  - src/
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

  - utils/
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
