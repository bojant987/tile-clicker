# Tile Clicker

Are you ready to click some tiles?

## Installation
Makes sure you have node installed first. 
Then, install the project using npm or yarn, ie:

```sh
npm install
```

## Running the project

To run project in dev env with webpack-dev-server, source maps and hot reloading, run:
```sh
npm run dev
```

To run project in prod env with express server and minification of resources, run:
```sh
npm start
```

To run cypress integration tests, make sure you have the app running on local port 8080, and run:
```sh
npm run cypress
```
If you want to run the app on another port, just make sure you change the app location constant in ./cypress/util/visitApp.js

This project uses my own react/redux boilerplate: https://github.com/bojant987/react-go

