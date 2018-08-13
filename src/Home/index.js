// @flow

import React from "react";

import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  logo: {
    width: "auto",
    height: "15%",
    margin: "20px"
  },
  title: {
    display: "flex",
    alignItems: "center",
    height: "20%"
  },
  text: {
    display: "flex",
    alignItems: "center",
    width: "500px",
    maxWidth: "100%",
    height: "30%"
  },
  button: {
    margin: "20px"
  }
});

type PropsT = {
  classes: Object,
  onClickStart: void => void,
  isRegistered: boolean
};

const Home = ({ classes, isRegistered, onClickStart }: PropsT) => (
  <div className={classes.root}>
    <img src="images/logo.png" alt="logo" className={classes.logo} />
    <Typography variant="title" align="center" className={classes.title}>
      <FormattedMessage
        id="home.title"
        defaultMessage="Welcome to the game of TAMA"
      />
    </Typography>
    <Typography variant="subheading" align="center" className={classes.text}>
      <FormattedMessage
        id="home.description"
        defaultMessage="In this game you play the role of a teacher whose purpose is to teach the
        concept of parallelograms. Teach well so that your student gets the best
        possible grade!"
      />
    </Typography>

    <Button
      variant="contained"
      color="primary"
      onClick={onClickStart}
      className={classes.button}
    >
      <FormattedMessage
        id={isRegistered ? "home.startPlaying" : "home.register"}
        defaultMessage="Start playing"
      />
    </Button>
  </div>
);

export default withStyles(styles)(Home);
