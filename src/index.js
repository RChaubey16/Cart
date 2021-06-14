import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as firebase from "firebase";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCAdEEyBT0jzWY4H0mkjfc74p3sLceSR4",
  authDomain: "cart-9affe.firebaseapp.com",
  projectId: "cart-9affe",
  storageBucket: "cart-9affe.appspot.com",
  messagingSenderId: "824499035985",
  appId: "1:824499035985:web:bdfb0fac21ab9b402cbd70",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
