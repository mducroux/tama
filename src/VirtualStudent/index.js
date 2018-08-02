// @flow

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = () => ({
  bubble: {
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
  <div>
    <Grid container justify="center">
      <div className={classes.bubble}>
        <img
          src="images/virtual_student/bubble.png"
          width="200"
          height="150"
          alt="bubble"
        />
        <div className={classes.textImage}>{bubbleText}</div>
      </div>
    </Grid>
    <Grid container justify="center">
      <div>
        <img
          src="images/virtual_student/student.png"
          width="200"
          height="200"
          alt="virtual_student"
        />
      </div>
    </Grid>
  </div>
);

VirtualStudent.propTypes = {
  classes: PropTypes.object.isRequired,
  bubbleText: PropTypes.object.isRequired
};

export default withStyles(styles)(VirtualStudent);
