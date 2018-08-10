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

type StateT = { thinking: boolean, index: number, answer: boolean };

type PropsT = {
  classes: Object,
  displayResultTest: () => void,
  questions: Object[],
  answers: boolean[],
  student: any,
  indexScore: number,
  incrementIndexScore: void => void,
  studentImg: string
};

class ShowQuestions extends React.Component<PropsT, StateT> {
  constructor(props) {
    super(props);
    this.state = { thinking: true, index: 0, answer: false };
  }

  componentDidMount() {
    setTimeout(() => this.answerQuestion(), 300);
  }

  answerQuestion() {
    if (
      this.props.questions[this.state.index].valid ===
      this.props.answers[this.state.index]
    ) {
      this.props.incrementIndexScore();
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
    setTimeout(() => this.answerQuestion(), 300);
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
            <TestScoreBar completed={this.props.indexScore} />
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
              defaultMessage="Question {index} / {numberOfQuestions}: Is it a parallelogram?"
              values={{
                index: this.state.index + 1,
                numberOfQuestions: this.props.questions.length
              }}
            />
          </Typography>
        </Grid>
        <Grid container className={classes.mainContent}>
          <Grid item xs={12} sm={6}>
            <Grid
              container
              justify="center"
              alignItems="center"
              className={classes.student}
            >
              <VirtualStudent
                bubbleText={bubbleText}
                studentImg={this.props.studentImg}
              />
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
          {this.props.questions.length !== this.state.index + 1 ? (
            <div>
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
              <Button
                className={classes.button}
                onClick={this.props.displayResultTest}
                color="primary"
                size="large"
              >
                <FormattedMessage
                  id="testShowQuestions.skipToResult"
                  defaultMessage="Skip to result"
                />
              </Button>
            </div>
          ) : (
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
          )}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(ShowQuestions);
