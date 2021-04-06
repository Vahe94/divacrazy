import firebase from "firebase";
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
const db = fb.firestore();

export {db};
