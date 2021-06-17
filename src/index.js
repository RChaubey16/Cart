import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import firebase from "firebase/app";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCkS-DvuuUocGJ2kGOgfeRWkJd00KQERzg",
  authDomain: "cart-2a6a5.firebaseapp.com",
  projectId: "cart-2a6a5",
  storageBucket: "cart-2a6a5.appspot.com",
  messagingSenderId: "454726075809",
  appId: "1:454726075809:web:ba6db57589c1ff6ca5b7e0",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
