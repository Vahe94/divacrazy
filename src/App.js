import React, {Suspense, useEffect, useState} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch, Private} from 'react-router-dom';
import firebase from "firebase";
import './App.css';
import Spinner from './components/Spinner';

import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import PrivateRoute from "./components/PrivateRoute";
import LoginRoute from "./LoginRoute";
import SingleMenu from "./pages/dashboard/SingleMenu";

const App = () =>
{
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) =>
    {
      setIsLoaded(true);
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  console.log(isLoggedIn, 'isLoggedInisLoggedInisLoggedInisLoggedIn')
    return (
      <Suspense fallback={<Spinner />}>
        <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path='/menus' component={Dashboard} isLoggedIn={isLoggedIn} />
              <PrivateRoute path='/menus/:menuId' component={SingleMenu} isLoggedIn={isLoggedIn} />
            </Switch>
        </Router>
      </Suspense>
    )
};

export default App;
