import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase";
import * as firebaseui from 'firebaseui';
// Required for side-effects
require("firebase/firestore");

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyALQo-cVJl8CTZOQ0KbVY-I3JCoLXIP5RY",
    authDomain: "diva-crazy-menu.firebaseapp.com",
    projectId: "diva-crazy-menu",
    storageBucket: "diva-crazy-menu.appspot.com",
    messagingSenderId: "479334478977",
    appId: "1:479334478977:web:95df08badc203882678980"
  };
  // Initialize Firebase
 const fb = firebase.initializeApp(firebaseConfig);
const ui = new firebaseui.auth.AuthUI(firebase.auth());
   const db = fb.firestore();

   export {db, ui};
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
