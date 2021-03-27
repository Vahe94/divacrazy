import React, {Suspense, useEffect, useState} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch, useHistory} from 'react-router-dom';
import firebase from "firebase";
import './App.css';
import Spinner from './components/Spinner';

const Login = React.lazy(() => import('./pages/login/Login')); // Lazy-loaded
const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard')); // Lazy-loaded

export default function App()
{
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user)
    {
      setIsLoaded(true);
      if (user) {
        setIsLoggedIn(true);
        history.push("/menus");
        // User is signed in.
      } else {
        setIsLoggedIn(false);
        // No user is signed in.
        history.push("/login");
      }
    });
  }, []);

    return isLoaded ? (
      <Router>
        <Suspense fallback={<Spinner />}>
            <Switch>
              <Route exact path={'/'} component={Login} />
              <Route path={'/menus'} component={Dashboard} />
              <Route path={'/login'} component={Login} />
              <Redirect to={'/'} />
            </Switch>
        </Suspense>
      </Router>
    ) : <Spinner />;
}
