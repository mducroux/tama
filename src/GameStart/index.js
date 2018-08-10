// @flow
import React from "react";

import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import VirtualStudent from "../VirtualStudent";
import TeacherWelcome from "../Teacher/TeacherWelcome";

const styles = () => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  mainContent: {
    height: "70%"
  },
  group: {
    height: "100%"
  },
  studentName: {
    textAlign: "center",
    alignSelf: "center"
  },
  logo: {
    width: "auto",
    height: "15%",
    margin: "20px"
  }
});

type PropsT = {
  classes: Object,
  onClickStart: void => void,
  studentName: string,
  studentImg: string,
  genderTeacherMale: boolean
};

const GameStart = ({
  classes,
  onClickStart,
  studentName,
  studentImg,
  genderTeacherMale
}: PropsT) => (
  <div className={classes.root}>
    <img src="images/logo.png" alt="logo" className={classes.logo} />
    <Grid container justify="space-around" className={classes.mainContent}>
      <Grid item xs={12} sm={4}>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.group}
        >
          <VirtualStudent
            bubbleText={
              <FormattedMessage
                id="gameStart.studentName"
                defaultMessage="Hello! My name is {studentName}!"
                values={{ studentName }}
              />
            }
            studentImg={studentImg}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.group}
        >
          <TeacherWelcome
            bubbleText={
              <FormattedMessage
                id="gameStart.teacherPresentation"
                defaultMessage={
                  <FormattedMessage
                    id="gameStart.teacherBubble"
                    defaultMessage="Hello {studentName}! I'm {username}, your teacher!"
                    values={{
                      studentName: studentName.replace(/ .*/, ""),
                      username: localStorage.getItem("username")
                    }}
                  />
                }
              />
            }
            genderTeacherMale={genderTeacherMale}
          />
        </Grid>
      </Grid>
    </Grid>
    <Grid container justify="center">
      <Button variant="contained" color="primary" onClick={onClickStart}>
        <FormattedMessage
          id="gameStart.startTeaching"
          defaultMessage="Start teaching {studentName}"
          values={{ studentName: studentName.replace(/ .*/, "") }}
        />
      </Button>
    </Grid>
  </div>
);

export default withStyles(styles)(GameStart);
