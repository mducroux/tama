// @flow

import React from "react";

import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import VirtualStudent from "../VirtualStudent";

const styles = () => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "1%"
  },
  welcome: {
    height: "100%"
  },
  studentName: {
    textAlign: "center",
    alignSelf: "center"
  },
  logo: {
    height: "10%"
  },
  title: {
    height: "3%"
  },
  student: {
    height: "60%"
  }
});

type PropsT = {
  classes: Object,
  onClickStart: void => void,
  studentName: string
};

const WelcomeMenu = ({ classes }: PropsT) => (
  <div className={classes.welcome}>
    <img src="images/logo.png" width="110" height="60" alt="logo" />
    <Typography className={classes.title} variant="title" color="inherit">
      <FormattedMessage
        id="home.title"
        defaultMessage="Welcome to the game of TAMA."
      />
    </Typography>
    <p>
      Welcome to the game of TAMA. In this game you play the role of a teacher. Everytime you play you will teach a new student by selecting activities. At the end of the game your student passes a test and you earn points depending on the grade obtained. Try to teach well so that your students get the best grades possible!
    </p>
  </div>
);

export default withStyles(styles)(WelcomeMenu);
