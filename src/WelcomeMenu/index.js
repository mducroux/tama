// @flow
import React from "react";

import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import VirtualStudent from "../VirtualStudent";

const styles = () => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "50px"
  },
  studentName: {
    textAlign: "center",
    alignSelf: "center"
  }
});

type PropsT = {
  classes: Object,
  onClickStart: void => void,
  studentName: string
};

const WelcomeMenu = ({ classes, onClickStart, studentName }: PropsT) => (
  <div>
    <Grid container justify="center" className={classes.root}>
      <img src="images/logo.png" alt="logo" />
    </Grid>
    <Grid container justify="center" className={classes.root}>
      <Typography className={classes.title} variant="title" color="inherit">
        <FormattedMessage
          id="welcomeMenu.descriptionApp"
          defaultMessage="Teach the concept of parallelogram"
        />
      </Typography>
    </Grid>
    <Grid container justify="center" className={classes.root}>
      <VirtualStudent
        bubbleText={
          <FormattedMessage
            id="welcomeMenu.studentName"
            defaultMessage="Hello! My name is {studentName}!"
            values={{ studentName }}
          />
        }
      />
    </Grid>
    <Grid container justify="center" className={classes.root}>
      <Button variant="contained" color="primary" onClick={onClickStart}>
        <FormattedMessage
          id="welcomeMenu.startPlaying"
          defaultMessage="Start playing"
        />
      </Button>
    </Grid>
  </div>
);

export default withStyles(styles)(WelcomeMenu);
