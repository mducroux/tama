// @flow

import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Slide from "@material-ui/core/Slide";

import Cancel from "@material-ui/icons/Cancel";
import CheckCircle from "@material-ui/icons/CheckCircle";

import TestScoreBar from "./TestScoreBar";

const styles = () => ({
  root: {
    height: "90%",
    overflow: "hidden"
  },
  answer: {
    marginRight: "5px",
    border: "solid black 1px"
  },
  questionList: {
    height: "40%",
    display: "flex",
    flexDirection: "row",
    overflowX: "auto",
    overflowY: "hidden"
  },
  statusIcon: {
    position: "absolute",
    bottom: 0,
    right: 0
  },
  scoreBar: {
    height: "10%",
    display: "flex",
    alignItems: "center"
  },
  bubbles: {
    height: "40%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  avatar: {
    height: "40%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  studentImg: {
    width: "auto",
    height: "auto",
    maxHeight: "100%",
    maxWidth: "100%"
  },
  studentAnswers: {
    height: "40%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  scoreBoard: {
    height: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  scoreBoardPaper: {
    height: "90%",
    width: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  shape: {
    height: "100%",
    width: "auto"
  },
  bottomButton: {
    height: "10%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

const Avatar = ({ img, classes }: any) => (
  <img src={img} alt="student" className={classes.studentImg} />
);

const ScoreBoard = ({ show, classes }: any) => (
  <Paper className={classes.scoreBoardPaper}>
    <Slide in={show > 12} direction="up">
      <span>Starting Score: 200</span>
    </Slide>
    <Slide in={show > 13} direction="up">
      <span>Teaching activities used: -170</span>
    </Slide>
    <Slide in={show > 14} direction="up">
      <span>Grade bonus: 10.000</span>
    </Slide>
    <Slide in={show > 15} direction="up">
      <span>Total Score: 10.030</span>
    </Slide>
  </Paper>
);

const LeaderboardPeek = ({ show, classes }: any) => (
  <Paper className={classes.scoreBoardPaper}>
    <Slide in={show > 17} direction="up">
      <span>Daily score: 2000 => 2050</span>
    </Slide>
    <Slide in={show > 18} direction="up">
      <span>Weekly score: 2000 => 2050</span>
    </Slide>
    <Slide in={show > 19} direction="up">
      <span>All time score: 2000 => 2050</span>
    </Slide>
  </Paper>
);

const Answer = ({ src, isCorrect, show, classes }: any) => (
  <Grow in={show} timeout={400} direction="left">
    <div className={classes.answer}>
      <img src={src} alt="test question" className={classes.shape} />
      {isCorrect ? (
        <CheckCircle color="primary" className={classes.statusIcon} />
      ) : (
        <Cancel color="error" className={classes.statusIcon} />
      )}
    </div>
  </Grow>
);

const QuestionsList = ({ questions, index, classes }: any) => (
  <div className={classes.questionList}>
    {questions
      .filter(q => q.index < index)
      .map(q => (
        <Answer
          key={q.src}
          src={q.src}
          isCorrect={q.isCorrect}
          classes={classes}
          show
        />
      ))}
  </div>
);

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
  index: number
};

class TestStudent extends React.Component<PropsT, StateT> {
  interval: any;

  constructor(props: PropsT) {
    super(props);

    this.state = {
      index: 0
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const index = this.state.index + 1;
      this.setState({ index });
      if (index > 20) {
        clearInterval(this.interval);
      }
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    console.log(this.props);
    const { classes, test, studentImg } = this.props;
    const { index } = this.state;

    const qs = test.questions.map(({ src, valid }, idx) => ({
      src,
      index: idx,
      answer: test.answers[index],
      isCorrect: valid === test.answers[index]
    }));
    const qY = qs.filter(x => x.answer);
    const qN = qs.filter(x => !x.answer);

    return (
      <Grid
        container
        spacing={16}
        className={classes.root}
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={12} className={classes.scoreBar}>
          <TestScoreBar completed={this.state.index} />
        </Grid>
        <Grid item xs={2} className={classes.avatar}>
          <Avatar classes={classes} img={studentImg} />
        </Grid>
        <Grid item xs={2} className={classes.bubbles}>
          <div>PARALLELOGRAMS:</div>
          <div>NOT PARALLELOGRAMS:</div>
        </Grid>
        <Grid item xs={8} className={classes.studentAnswers}>
          <QuestionsList classes={classes} questions={qY} index={index} />
          <QuestionsList classes={classes} questions={qN} index={index} />
        </Grid>
        <Grid item xs={6} className={classes.scoreBoard}>
          <ScoreBoard show={index} classes={classes} />
        </Grid>
        <Grid item xs={6} className={classes.scoreBoard}>
          <LeaderboardPeek show={index} classes={classes} />
        </Grid>
        <Grid item xs={12} className={classes.bottomButton}>
          BUTTON NEW GAME
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(TestStudent);
