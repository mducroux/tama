import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

import VirtualStudent from "../../VirtualStudent";

const styles = theme => ({
  root: {
    height: "100%"
  },
  group: {
    height: "100%"
  },
  blackboard: {
    position: "relative"
  },
  textImage: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    color: theme.palette.common.white
  }
});

class ShowLesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentAlreadyKnow: this.props.student.alreadyKnowLesson(
        this.props.lesson.shapeFeatures
      )
    };
  }

  componentDidMount() {
    this.props.recordLessonActivity(this.state.studentAlreadyKnow);
    this.props.updateScore();
    this.props.student.learnLesson(this.props.lesson.shapeFeatures);
    setTimeout(() => {
      this.props.getBackToMenu();
    }, 3000);
  }

  render() {
    const { classes } = this.props;
    let bubbleText;
    if (this.state.studentAlreadyKnow) {
      bubbleText = this.props.student.feedbackLessonAlreadyKnow;
    } else {
      bubbleText = this.props.student.feedbackLessonDidntKnow;
    }

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={6}>
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.group}
          >
            <VirtualStudent bubbleText={bubbleText} />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.group}
          >
            <div className={classes.blackboard}>
              <img
                src="images/blackboard.jpg"
                alt="Blackboard"
                width="400"
                height="300"
              />
              <div className={classes.textImage}>
                <Typography variant="title" color="inherit">
                  {this.props.lesson.title}
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

ShowLesson.propTypes = {
  classes: PropTypes.object.isRequired,
  getBackToMenu: PropTypes.func.isRequired,
  lesson: PropTypes.object.isRequired,
  updateScore: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
  recordLessonActivity: PropTypes.func.isRequired
};

export default withStyles(styles)(ShowLesson);
