// @flow

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import TestScoreBar from "./TestScoreBar";

import Result from "./Result";
import ShowQuestions from "./ShowQuestions";

const styles = () => ({
  root: {
    height: "100%"
  },
  group: {
    display: "flex",
    flexWrap: "wrap"
  },
  question: {
    display: "flex",
    textAlign: "center"
  },
  title: {
    height: "5%"
  },
  mainContent: {
    height: "60%"
  },
  student: {
    height: "100%"
  },
  parallelogram: {
    height: "100%"
  }
});

const ExerciseList = ({ questions, answers }) => {
  console.log(test);
  return (
    <div>
      {questions.map(q => (
        <img
          key={q.src}
          src={q.src}
          alt="test question"
          width="300"
          height="300"
        />
      ))}
    </div>
  );
};

type PropsT = {
  startNewGame: () => void,
  student: Object,
  finalScore: number,
  activityScore: number,
  studentName: string,
  test: Object,
  updateScore: void => void,
  hasSeenQuestionsTest: void => void,
  classes: Object
};

type StateT = {
  indexScore: number
};

class TestStudent extends React.Component<PropsT, StateT> {
  constructor(props: PropsT) {
    super(props);
    this.state = {
      indexScore: 0
    };
  }

  render() {
    console.log(this.props);
    const { classes, test } = this.props;
    return (
      <div className={classes.root}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12}>
            <TestScoreBar completed={this.state.indexScore} />
          </Grid>
          <Grid item xs={12}>
            <ExerciseList {...test} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(TestStudent);
