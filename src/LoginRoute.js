import React, { Suspense, PureComponent } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Login from './pages/login/Login';

class LoginRoute extends PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />>
      </Switch>
    );
  }
}

export default LoginRoute;
