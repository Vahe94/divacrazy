import React, {Suspense, useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import firebase from "firebase";
import {db} from './index.js';
import Spinner from './components/Spinner';
import { auth } from "./helpers/loginHelper";


const Login = React.lazy(() => import('./pages/Login')); // Lazy-loaded
const Dashboard = React.lazy(() => import('./pages/Dashboard')); // Lazy-loaded


function addUser() {

}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      setIsLoaded(false);
      if (user) {
        setIsLoggedIn(true);
        console.log(user);
        // User is signed in.
      } else {
        setIsLoggedIn(false);
        // No user is signed in.
      }
    });
  }, []);

//   db.collection("users").add({
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
// })
// .then((docRef) => {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch((error) => {
//     console.error("Error adding document: ", error);
// });

// db.collection("users").get().then((querySnapshot) => {
//   console.log(querySnapshot, 'asdafdaefawfaf')
//     querySnapshot.forEach((doc) => {
//         console.log(`${doc.id} => `, 'all users');
//         console.log(doc.data())
//     });
// });
    return isLoaded
        ? <Spinner />
        : <Router>
        <Suspense fallback={<Spinner />}>
          {
            isLoggedIn
              ? <Switch>
                <Route exact path={'/'} component={Dashboard} />
                <Route path={'/dashboard'} component={Dashboard} />
                <Route path={'/login'} component={Login} />
                <Redirect to={'/'} />
              </Switch>
              : <Switch>
                <Route exact path={'/'} component={Login} />
                <Route path={'/login'} component={Login} />
                <Redirect to={'/'} />
              </Switch>
          }
        </Suspense>
      </Router>;
}
