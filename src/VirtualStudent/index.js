// @flow

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = () => ({
  root: {
    height: "100%"
  },
  bubble: {
    height: "50%"
  },
  student: {
    height: "50%"
  },
  bubbleItem: {
    position: "relative",
    left: "25%"
  },
  textImage: {
    position: "absolute",
    top: "42%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center"
  }
});

const VirtualStudent = ({ classes, bubbleText }) => (
  <div className={classes.root}>
    <Grid
      container
      justify="center"
      alignItems="flex-end"
      className={classes.bubble}
    >
      <div className={classes.bubbleItem}>
        <img
          src="images/virtual_student/bubble.png"
          width="180"
          height="130"
          alt="bubble"
        />
        <div className={classes.textImage}>{bubbleText}</div>
      </div>
    </Grid>
    <Grid
      container
      justify="center"
      alignItems="flex-start"
      className={classes.student}
    >
      <img
        src="images/virtual_student/student.png"
        width="180"
        height="180"
        alt="virtual_student"
      />
    </Grid>
  </div>
);

VirtualStudent.propTypes = {
  classes: PropTypes.object.isRequired,
  bubbleText: PropTypes.object.isRequired
};

export default withStyles(styles)(VirtualStudent);
