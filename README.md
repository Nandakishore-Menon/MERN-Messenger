# Simple MERN Messenger

## Overview

This is my implementation of a MERN stack chat room application with google authentication using Firebase. I have used Pusher to update the chats in real-time from MongoDB. The application allows creating and sending messages and Twemojis (Twitter emojis) in multiple chat rooms. You can also search for different chat rooms.

## Instructions to run

### Preparing files

- Clone this repository to your device.
- Create a file named `.env` in `/frontend` which contains the following code:

  ```jsx
  REACT_APP_FIREBASE_API_KEY=
  REACT_APP_FIREBASE_AUTH_DOMAIN=
  REACT_APP_FIREBASE_PROJECT_ID=
  REACT_APP_FIREBASE_STORAGE_BUCKET=
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
  REACT_APP_FIREBASE_APP_ID=
  REACT_APP_PUSHER_APP_KEY=
  REACT_APP_PUSHER_CLUSTER=
  REACT_APP_BASE_URL=
  ```

- Create another file `.env` in the root directory and type in the following code:

  ```jsx
  REACT_APP_PUSHER_APP_ID=
  REACT_APP_PUSHER_APP_KEY=
  REACT_APP_PUSHER_APP_SECRET=
  REACT_APP_PUSHER_CLUSTER=
  MONGODB_URI=
  ```

- Create your application on [Firebase](https://firebase.google.com/) and [Pusher](https://pusher.com/) and paste the configuration properties into the appropriate variables in both `.env` files.

  As an example, a firebase config will be of the form:

  ```jsx
  const firebaseConfig = {
    apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    authDomain: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    projectId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    storageBucket: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    messagingSenderId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    appId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  };
  ```

  Paste the `apiKey` value as the value for `REACT_APP_FIREBASE_API_KEY` .

- Create a cluster on MongoDB Atlas and paste the URL as a value for `MONGODB_URI` in the `.env` file in the root directory. Make sure you have given access to your local machine's IP on MongoDB Atlas.
- Run `npm install` in the `root` and `/frontend` directories. This will install all the dependencies required for the application to run.

### Running the application

- Open the root directory and run `node server.js`
- Open the `/frontend` folder and run `npm start`

This should open the application in your browser. Sign-in using your Google account and start chatting!

The application has also been deployed on Heroku [here](https://simple-mern-messenger.herokuapp.com).
