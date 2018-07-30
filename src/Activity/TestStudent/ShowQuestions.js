// @flow

import React from "react";

import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import VirtualStudent from "../../VirtualStudent";

const styles = () => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "25px"
  },
  title: {
    display: "flex",
    textAlign: "center"
  }
});

type StateT = { thinking: boolean, index: number, answer: boolean };

type PropsT = {
  classes: Object,
  displayResultTest: () => void,
  questions: Object[],
  answers: boolean[],
  student: any,
}

class ShowQuestions extends React.Component<PropsT, StateT> {
  constructor(props) {
    super(props);
    this.state = { thinking: true, index: 0, answer: false };
  }

  componentDidMount() {
    setTimeout(() => this.answerQuestion(), 500);
  }

  answerQuestion() {
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
    setTimeout(() => this.answerQuestion(), 500);
  }

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
      <div>
        <Grid container justify="center" className={classes.root}>
          <Typography variant="title" className={classes.title}>
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
        <Grid container justify="center" className={classes.root}>
          <img
            src={this.props.questions[this.state.index].src}
            alt="parallelogram"
            width="300"
            height="300"
          />
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <VirtualStudent bubbleText={bubbleText} />
        </Grid>
        <Grid container justify="center" className={classes.root}>
          {this.props.questions.length !== this.state.index + 1 && <Button
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
          }
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
