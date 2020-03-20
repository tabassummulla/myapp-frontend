import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withOktaAuth } from "@okta/okta-react";
import updateUser from "../services/updateUser";
import { connect } from "react-redux";
import { Input, useFormControl } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";

export const AlertComponent = ({ isSaved, openAlert, openErr }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {}, [open]);
  return (
    <div>
      {openAlert && isSaved ? (
        <Collapse in={open}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                onClick={() => setOpen(false)}
                color="inherit"
                size="small"
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            You have successfuly saved your changes
          </Alert>
        </Collapse>
      ) : (
        <div> </div>
      )}

      {openErr && !isSaved ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Your changes have failed to save
        </Alert>
      ) : (
        <div></div>
      )}
    </div>
  );
};

const EditProfile = ({
  accessToken,
  isOpen,
  isClosed,
  aboutMeEdit,
  setProfile,
  profile
}) => {
  const [aboutmeValue, setAboutmeValue] = useState([]);
  const [newProfilePic, setProfilePic] = useState("");
  const [open, setOpen] = useState(false);
  const [openErr, setOpenErr] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSaveChanges = () => {
    const userBody = profile.profile[0];
    const displayPicture =
      newProfilePic.length > 0 ? newProfilePic : userBody.profile_pic;
    setOpen(false);
    updateUser(accessToken.accessToken, displayPicture, userBody, aboutmeValue)
      .then(response => {
        if (response.errors.length === 0) {
          setOpen(true);
          setSaved(true);
          setProfile(response.data.addUser);
        }
      })
      .catch(err => {
        setOpenErr(true);

        return err;
      });
  };

  useEffect(
    () => {
      if (!accessToken) return;
    },
    [accessToken],
    [setAboutmeValue, open, openErr]
  );

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={isClosed}
        aria-labelledby="form-dialog-title"
      >
        <AlertComponent openAlert={open} isSaved={saved} openErr={openErr} />
        <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please update your about me section :
          </DialogContentText>
          <TextField
            multiline
            rowsMax="4"
            autoFocus
            margin="dense"
            color="secondary"
            id="aboutme"
            label="About Me"
            fullWidth
            defaultValue={aboutMeEdit}
            onChange={e => setAboutmeValue(e.target.value)}
          />
          Change profile pic?{" "}
          <Input
            type="file"
            color="secondary"
            onChange={e => {
              setProfilePic(e.target.files[0].name);
            }}
          ></Input>
        </DialogContent>
        <DialogActions>
          <Button onClick={isClosed} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => ({
  accessToken: state.accessToken,
  user: state.user,
  navBarValue: state.navBarValue,
  profile: state.profile
});

export default connect(mapStateToProps)(withOktaAuth(EditProfile));
