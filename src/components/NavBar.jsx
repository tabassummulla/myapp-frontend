import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { switchTabs } from "../reducers/navBarReducer";
import { connect } from "react-redux";
import { withOktaAuth } from "@okta/okta-react";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useLocation } from "react-router-dom";

const NavBar = ({ authService, accessToken, navBarValue, switchTabs }) => {
  useEffect(() => {
    if (!accessToken) return;
  }, [accessToken]);

  const pages = ["/", "/profile"];

  let location = useLocation();

  const navBarDefaultValue = location => {
    const path = location.pathname;
    const value = pages.indexOf(path);
    return value !== -1 ? value : 0;
  };

  const defaultValue = navBarDefaultValue(location);

  const logout = async () => {
    authService.logout("/");
  };

  return (
    <Paper square>
      <Tabs
        centered
        value={
          navBarValue.navBarValue != null
            ? navBarValue.navBarValue
            : defaultValue
        }
        indicatorColor="secondary"
        textColor="secondary"
        onChange={(e, newValue) => switchTabs(newValue)}
      >
        <Tab icon={<HomeIcon />} label="Home" to={pages[0]} component={Link} />
        <Tab
          icon={<PersonIcon />}
          label="Profile"
          to={pages[1]}
          component={Link}
        />
        <Tab icon={<ExitToAppIcon />} onClick={logout} label="Logout" />
      </Tabs>
    </Paper>
  );
};

const mapStateToProps = state => ({
  accessToken: state.accessToken,
  user: state.user,
  navBarValue: state.navBarValue
});

const mapDispatchToProps = {
  switchTabs
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withOktaAuth(NavBar));
