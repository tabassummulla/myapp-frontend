import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import App from "../App";
import oktaParams from "../app.config";
import NavBar from "./NavBar";
import Profile from "../pages/Profile";
import Home from "../pages/Home";

const oktaConfig = {
  issuer: `${oktaParams.orgURL}/oauth2/default`,
  redirectUri: window.location.origin + "/implicit/callback",
  clientId: oktaParams.clientID,
  pkce: true
};

const AppHandler = () => {
  return (
    <Router>
      <Security {...oktaConfig}>
        <NavBar />
        <Route path="/implicit/callback" component={LoginCallback} />
        <SecureRoute exact path="/" component={App} />
        <Route exact={true} path="/profile" component={Profile} />
        <Route exact={true} path="/" component={Home} />
      </Security>
    </Router>
  );
};

export default AppHandler;
