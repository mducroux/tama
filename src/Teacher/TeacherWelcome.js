// @flow
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = () => ({
  bubble: {
    position: "relative",
    left: "-30%",
    overflow: "hidden"
  },
  textImage: {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    width: "90%"
  }
});

type PropsT = {
  classes: Object,
  genderTeacherMale: boolean,
  bubbleText: string
};

const TeacherWelcome = ({ classes, bubbleText, genderTeacherMale }: PropsT) => {
  const teacherImage = genderTeacherMale
    ? "images/teacher/teacher_male.png"
    : "images/teacher/teacher_female.png";
  return (
    <div>
      <Grid container justify="center">
        <div className={classes.bubble}>
          <img
            src="images/teacher/bubble-answer.png"
            width="180"
            height="130"
            alt="bubble"
          />
          <div className={classes.textImage}>{bubbleText}</div>
        </div>
      </Grid>
      <Grid container justify="center" alignItems="flex-start">
        <img src={teacherImage} width="250" height="232" alt="teacher" />
      </Grid>
    </div>
  );
};

export default withStyles(styles)(TeacherWelcome);
