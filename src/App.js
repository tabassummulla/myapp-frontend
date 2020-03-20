import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withOktaAuth } from "@okta/okta-react";
import { setAccessToken } from "./reducers/authReducer";
import { setUser } from "./reducers/userReducer";

const App = ({ authService, setAccessToken, setUser }) => {
  useEffect(() => {
    authService.getUser().then(user => setUser(user));
    authService
      .getAccessToken()
      .then(accessToken => setAccessToken(accessToken));
  }, [authService, setUser, setAccessToken]);

  return <BrowserRouter />;
};

const matchDispatchToProps = {
  setUser,
  setAccessToken
};
export default connect(null, matchDispatchToProps)(withOktaAuth(App));
