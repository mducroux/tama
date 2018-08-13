// @flow

import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  bubble: {
    position: "relative",
    left: "40%",
    width: "55%"
  },
  textImage: {
    position: "absolute",
    top: "39%",
    left: "52%",
    transform: "translate(-50%, -50%) scaleX(1)",
    textAlign: "center"
  },
  bubbleImage: {
    width: "100%",
    height: "auto"
  },
  teacherImage: {
    width: "80%",
    height: "auto"
  }
});

const TeacherChoosingActivity = ({
  classes,
  genderTeacherMale,
  teacherBubble,
  bubbleText
}: {
  classes: Object,
  genderTeacherMale: boolean,
  teacherBubble: Object,
  bubbleText: string
}) => {
  const teacherImage = genderTeacherMale
    ? "images/teacher/teacher_male.png"
    : "images/teacher/teacher_female.png";
  return (
    <div>
      <div className={classes.bubble}>
        <img src={teacherBubble} alt="bubble" className={classes.bubbleImage} />
        <div className={classes.textImage}>{bubbleText}</div>
      </div>
      <img src={teacherImage} alt="teacher" className={classes.teacherImage} />
    </div>
  );
};

export default withStyles(styles)(TeacherChoosingActivity);
