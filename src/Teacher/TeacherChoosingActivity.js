import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = () => ({
  bubble: {
    position: "relative",
    transform: "scaleX(-1)",
    left: "-52%",
    overflow: "hidden"
  },
  textImage: {
    position: "absolute",
    top: "39%",
    left: "52%",
    transform: "translate(-50%, -50%) scaleX(-1)",
    textAlign: "center"
  },
  bubbles: {
    display: "flex",
    flexWrap: "noWrap"
  }
});

class TeacherChoosingActivity extends React.Component {
  constructor(props) {
    super(props);
    this.teacherImage = this.props.genderTeacherMale
      ? "images/teacher/teacher_male.png"
      : "images/teacher/teacher_female.png";
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container justify="center" alignItems="flex-end">
          <div className={classes.bubbles}>
            <div className={classes.bubble}>
              <img
                src={this.props.teacherBubble}
                width="180"
                height="140"
                alt="bubble"
              />
              <div className={classes.textImage}>{this.props.bubbleText}</div>
            </div>
          </div>
        </Grid>
        <Grid container justify="center" alignItems="flex-start">
          <img src={this.teacherImage} width="250" height="232" alt="teacher" />
        </Grid>
      </div>
    );
  }
}

TeacherChoosingActivity.propTypes = {
  classes: PropTypes.object.isRequired,
  bubbleText: PropTypes.object.isRequired,
  teacherBubble: PropTypes.string.isRequired,
  genderTeacherMale: PropTypes.bool.isRequired
};

export default withStyles(styles)(TeacherChoosingActivity);
