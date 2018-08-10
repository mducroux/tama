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
  studentName: string,
  studentImg: string
};

const WelcomeMenu = ({
  classes,
  onClickStart,
  studentName,
  studentImg
}: PropsT) => (
  <div className={classes.welcome}>
    <Grid
      container
      justify="center"
      className={classNames(classes.root, classes.logo)}
    >
      <img src="images/logo.png" width="110" height="60" alt="logo" />
    </Grid>
    <Grid
      container
      justify="center"
      className={classNames(classes.root, classes.title)}
    >
      <Typography className={classes.title} variant="title" color="inherit">
        <FormattedMessage
          id="welcomeMenu.descriptionApp"
          defaultMessage="Teach the concept of parallelogram"
        />
      </Typography>
    </Grid>
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classNames(classes.root, classes.student)}
    >
      <VirtualStudent
        bubbleText={
          <FormattedMessage
            id="welcomeMenu.studentName"
            defaultMessage="Hello! My name is {studentName}!"
            values={{ studentName }}
          />
        }
        studentImg={studentImg}
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
