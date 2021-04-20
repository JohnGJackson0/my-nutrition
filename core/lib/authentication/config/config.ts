import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBqmtnyjHdW5ovUpBMpCB45gHhCbcVjFis",
  authDomain: "my-nutrition-d71db.firebaseapp.com",
  projectId: "my-nutrition-d71db",
  storageBucket: "my-nutrition-d71db.appspot.com",
  messagingSenderId: "1085403798002",
  appId: "1:1085403798002:web:434a4adbf151a431f1736b",
  measurementId: "G-N5GB20B4TF",
};

firebase.initializeApp(firebaseConfig);

require("firebase/app");
require("firebase/auth");
require("firebase/database");

export const db = firebase.database();
