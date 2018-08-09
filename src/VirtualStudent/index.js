// @flow

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = () => ({
  bubbleItem: {
    position: "relative",
    left: "50%"
  },
  textImage: {
    position: "absolute",
    top: "42%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center"
  }
});

const VirtualStudent = ({ classes, bubbleText, studentImg }) => (
  <div>
    <Grid container justify="center">
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
    <Grid container justify="center">
      <img src={studentImg} width="108" height="180" alt="virtual_student" />
    </Grid>
  </div>
);

VirtualStudent.propTypes = {
  classes: PropTypes.object.isRequired,
  bubbleText: PropTypes.object.isRequired,
  studentImg: PropTypes.string.isRequired
};

export default withStyles(styles)(VirtualStudent);
