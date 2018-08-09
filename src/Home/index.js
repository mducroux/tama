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
    height: "20%",
    margin: "5%"
  },
  title: {
    margin: "5%"
  },
  text: {
    width: "500px",
    maxWidth: "100%"
  },
  button: {
    marginTop: "10%"
  }
});

type PropsT = {
  classes: Object,
  onClickStart: void => void,
  isRegistered: boolean
};

const WelcomeMenu = ({ classes, isRegistered, onClickStart }: PropsT) => (
  <div className={classes.root}>
    <img src="images/logo.png" alt="logo" className={classes.logo} />
    <Typography variant="title" align="center" className={classes.title}>
      <FormattedMessage
        id="home.title"
        defaultMessage="Welcome to the game of TAMA."
      />
    </Typography>
    <Typography variant="body1" align="center" className={classes.text}>
      In this game you play the role of a teacher. Everytime you play you will
      teach a new student by selecting activities. At the end of the game your
      student passes a test and you earn points depending on the grade obtained.
      Teach well so that your students get the best grades possible!
    </Typography>

    <Button
      variant="contained"
      color="primary"
      onClick={onClickStart}
      className={classes.button}
    >
      <FormattedMessage
        id={isRegistered ? "welcomeMenu.startPlaying" : "welcomeMenu.register"}
        defaultMessage="Start playing"
      />
    </Button>
  </div>
);

export default withStyles(styles)(WelcomeMenu);
