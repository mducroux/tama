// @flow

import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  textImage: {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    width: "90%"
  },
  bubble: {
    position: "relative",
    left: "10%",
    width: "55%"
  },
  bubbleImage: {
    width: "100%",
    height: "auto"
  },
  teacherImage: {
    marginLeft: "20%",
    width: "80%",
    height: "auto"
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
    <div className={classes.root}>
      <div className={classes.bubble}>
        <img
          src="images/teacher/bubble-answer.png"
          alt="bubble"
          className={classes.bubbleImage}
        />
        <div className={classes.textImage}>{bubbleText}</div>
      </div>
      <img src={teacherImage} alt="teacher" className={classes.teacherImage} />
    </div>
  );
};

export default withStyles(styles)(TeacherWelcome);
