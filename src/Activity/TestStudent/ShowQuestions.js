// @flow

import React from "react";

import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import VirtualStudent from "../../VirtualStudent";
import TestScoreBar from "./TestScoreBar";

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
  testScoreBar: {
    height: "18%"
  },
  title: {
    height: "5%"
  },
  main: {
    height: "60%"
  },
  student: {
    height: "100%"
  },
  parallelogram: {
    height: "100%"
  }
});

type StateT = { thinking: boolean, index: number, answer: boolean };

type PropsT = {
  classes: Object,
  displayResultTest: () => void,
  questions: Object[],
  answers: boolean[],
  student: any,
  test: Object,
  gridScores: Array<number>
};

class ShowQuestions extends React.Component<PropsT, StateT> {
  indexScore: number;

  constructor(props) {
    super(props);
    this.state = { thinking: true, index: 0, answer: false };
    this.indexScore = 0;
  }

  componentDidMount() {
    setTimeout(() => this.answerQuestion(), 200);
  }

  answerQuestion() {
    if (
      this.props.test.questions[this.state.index].valid ===
      this.props.test.answers[this.state.index]
    ) {
      this.indexScore += 1;
    }
    this.setState({
      thinking: false,
      answer: this.props.answers[this.state.index]
    });
  }

  handleNextQuestion = () => {
    this.setState({
      index: this.state.index + 1,
      thinking: true
    });
    setTimeout(() => this.answerQuestion(), 200);
  };

  render() {
    const { classes } = this.props;

    let bubbleText;
    if (this.state.thinking === true) {
      bubbleText = this.props.student.thinkingAboutExam;
    } else if (this.state.answer === true) {
      bubbleText = this.props.student.givePositiveAnswer;
    } else {
      bubbleText = this.props.student.giveNegativeAnswer;
    }

    return (
      <div className={classes.root}>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.testScoreBar}
        >
          <Grid item sm={11}>
            <TestScoreBar
              completed={this.indexScore}
              gridScores={this.props.gridScores}
            />
          </Grid>
        </Grid>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.title}
        >
          <Typography variant="title" className={classes.question}>
            <FormattedMessage
              id="testShowQuestions.question"
              defaultMessage="Question: {index} / {numberOfQuestions}: Is it a parallelogram?"
              values={{
                index: this.state.index + 1,
                numberOfQuestions: this.props.questions.length
              }}
            />
          </Typography>
        </Grid>
        <Grid container className={classes.main}>
          <Grid item xs={12} sm={6}>
            <Grid
              container
              justify="center"
              alignItems="center"
              className={classes.student}
            >
              <VirtualStudent bubbleText={bubbleText} />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid
              container
              justify="center"
              alignItems="center"
              className={classes.parallelogram}
            >
              <img
                src={this.props.questions[this.state.index].src}
                alt="parallelogram"
                width="300"
                height="300"
                border="1px solid"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.navigation}
        >
          {this.props.questions.length !== this.state.index + 1 && (
            <Button
              className={classes.button}
              onClick={this.handleNextQuestion}
              color="primary"
              size="large"
            >
              <FormattedMessage
                id="testShowQuestions.nextQuestion"
                defaultMessage="Next question"
              />
            </Button>
          )}
          <Button
            className={classes.button}
            onClick={this.props.displayResultTest}
            color="primary"
            size="large"
          >
            <FormattedMessage
              id="testShowQuestions.seeResult"
              defaultMessage="See result"
            />
          </Button>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(ShowQuestions);
