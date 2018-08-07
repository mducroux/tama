// @flow

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import type { VirtualStudent, ShapeFeatures } from "../../VirtualStudent/types";
import VirtualStudentComponent from '../../VirtualStudent'

const styles = () => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "50px"
  },
  group: {
    position: "relative"
  },
  textImage: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
});

type StateT = {
  studentAlreadyKnow: boolean
}

type PropsT = {
  student: VirtualStudent,
  lesson: { shapeFeatures: ShapeFeatures, title: string },
  classes: Object,
  getBackToMenu: Function,
  updateScore: Function,
  recordLessonActivity: Function
}

class ShowLesson extends React.Component<PropsT, StateT> {
  constructor(props) {
    super(props);
    const { student, lesson } = this.props
    this.state = {
      studentAlreadyKnow: student.alreadyKnowLesson(lesson.shapeFeatures)
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
      <div>
        <Grid container justify="center" className={classes.root}>
          <div className={classes.group}>
            <img
              src="images/blackboard.jpg"
              alt="Blackboard"
              width="400"
              height="300"
            />
            <div className={classes.textImage}>{this.props.lesson.title}</div>
          </div>
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <VirtualStudentComponent bubbleText={bubbleText} />
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(ShowLesson);
