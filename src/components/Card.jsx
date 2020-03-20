import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EditProfile from "./EditProfile";
import defaultAvatar from "../pages/images/defaultAvatar.png";

const useStyles = makeStyles({
  root: {
    maxWidth: 700,
    marginBottom: 12
  },
  media: {
    height: 30,
    paddingTop: "56.25%", // 16:9,
    marginTop: "30"
  }
});

const CardComponent = props => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const imageInBase16 = new Uint8Array(props.image_src);
  // const base16ToBlob = new Blob([imageInBase16], { type: "image/jpeg" });
  // const imgSrc = URL.createObjectURL(base16ToBlob); //toconvert bytes into image =url (if image stored in db)

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={
            props.image_src
              ? require("../pages/images/" + props.image_src)
              : defaultAvatar
          }
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.cardTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {" "}
            About me : {props.cardBody}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="secondary" onClick={handleClickOpen}>
          Edit Profile
        </Button>
        <EditProfile
          aboutMeEdit={props.cardBody}
          isOpen={open}
          isClosed={handleClose}
        />
      </CardActions>
    </Card>
  );
};

export default CardComponent;
