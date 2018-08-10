// @flow

import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";

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
    height: "40%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  shape: {
    height: "100%",
    width: "auto"
  }
});

const Avatar = ({ img, classes }) => (
  <img src={img} alt="student" className={classes.studentImg} />
);

const ScoreBoard = ({ img, classes }) => "scoreboard";

const LeaderboardPeek = ({ img, classes }) => "leaderboard";

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
      if (index > 10) {
        clearInterval(this.interval);
      }
    }, 750);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    console.log(this.props);
    const { classes, test, studentImg } = this.props;
    const { index } = this.state;

    const qs = test.questions.map(({ src, valid }, index) => ({
      src,
      index,
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
          <div>I think these ARE correct</div>
          <div>I think these are NOT correct</div>
        </Grid>
        <Grid item xs={8} className={classes.studentAnswers}>
          <QuestionsList classes={classes} questions={qY} index={index} />
          <QuestionsList classes={classes} questions={qN} index={index} />
        </Grid>
        <Grid item xs={6} className={classes.scoreBoard}>
          <ScoreBoard />
        </Grid>
        <Grid item xs={6} className={classes.scoreBoard}>
          <LeaderboardPeek />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(TestStudent);
