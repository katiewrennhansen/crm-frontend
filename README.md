# Front-End Component of CRM system for Real Estate purposes.

## Downloading the App

After downloading this repository, run `npm install` to install all project dependancies


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Project Contents

This project contains 4 distinct sections: 

### Admin Portal Pages

This contains all of the components that are specific to the admin portal sysetem. Each folder contains a file/multiple files that make up a single admin view. 

### Broker Portal Pages

This contains all of the components that are specific to the broker portal sysetem. Each folder contains a file/multiple files that make up a single broker view. 

### User Portal Pages

This contains all of the components that are specific to the user portal sysetem. Each folder contains a file/multiple files that make up a single user view. 

### Utilities

This folder contains all of the components that are reused throughout this application. These components include forms, components to display various property data, customer data displays and so on.

### Other Notible Folders

This project also contains contexts and services folders. The context folder contains contexts that are specific to each portal while the services folder contains verious services for api calls, token authentication and form validation. 