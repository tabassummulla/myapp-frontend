import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withOktaAuth } from "@okta/okta-react";
import CardComponent from "../components/Card";
import "./css/Profile.css";
import getUserService from "../services/getUser";
import loadingGif from "./images/loading.gif";

const Profile = ({ user, authState, accessToken, setProfile, profile }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authState.isPending) {
      setLoading(true);
    }

    if (authState.isAuthenticated) {
      const email = user.user ? user.user.email : null;

      getUserService(accessToken.accessToken, email)
        .then(res => {
          if (res.errors.length === 0) {
            setProfile(res.data.userByEmail);
            setLoading(false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [authState, profile]);

  return (
    <div className="profile-card">
      {loading && profile.length === 0 ? (
        <div className="loading-gif">
          {" "}
          <img src={loadingGif} alt="loading.." />
        </div>
      ) : (
        profile.profile.map(e => (
          <CardComponent
            key={e.id}
            image_src={e.profile_pic}
            imgTitle={e.id}
            cardTitle={e.first_name}
            cardBody={e.about_me}
            profile={profile}
          />
        ))
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  accessToken: state.accessToken,
  user: state.user,
  navBarValue: state.navBarValue,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  setProfile: profile => dispatch({ type: "SET_PROFILE", profile })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withOktaAuth(Profile));
