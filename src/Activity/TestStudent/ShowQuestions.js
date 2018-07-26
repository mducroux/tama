import React from "react";

import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
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

class ShowQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { thinking: true, indexQuestion: 0, answer: false };
  }

  componentDidMount() {
    setTimeout(() => this.answerQuestion(), 200);
  }

  answerQuestion() {
    const answer = this.props.student.answerParallelogram(
      this.props.examQuestions[this.state.indexQuestion].shapeFeatures
    );
    if (
      answer
        ? this.props.examQuestions[this.state.indexQuestion].valid
        : !this.props.examQuestions[this.state.indexQuestion].valid
    ) {
      this.props.recordTest(this.state.indexQuestion, true);
      this.props.increaseGrade();
      this.props.updateScore();
      this.props.onAnswerQuestion(this.state.indexQuestion, true);
    } else {
      this.props.recordTest(this.state.indexQuestion, false);
      this.props.onAnswerQuestion(this.state.indexQuestion, false);
    }
    this.setState({
      thinking: false,
      answer
    });
  }

  handleNextQuestion() {
    if (this.props.numberOfQuestions === this.state.indexQuestion + 1) {
      this.props.displayResultTest(this.state.grade);
    } else {
      this.setState({
        indexQuestion: this.state.indexQuestion + 1,
        thinking: true
      });
      setTimeout(() => this.answerQuestion(), 200);
    }
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
            <FormattedMessage id="testShowQuestions.question"
              defaultMessage="Question\u00A0" />
            {this.state.indexQuestion + 1} / {this.props.numberOfQuestions}
            <FormattedMessage id="testShowQuestions.isItPara"
              defaultMessage=": Is it a parallelogram?" />
          </Typography>
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <img
            src={this.props.examQuestions[this.state.indexQuestion].src}
            alt="parallelogram"
            width="300"
            height="300"
          />
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <VirtualStudent bubbleText={bubbleText} />
        </Grid>
        <Grid container justify="center" className={classes.root}>
          {!this.state.thinking && (
            <Button
              className={classes.button}
              onClick={() => this.handleNextQuestion()}
              color="primary"
              size="large"
            >
              {this.props.numberOfQuestions !== this.state.indexQuestion + 1
                ? <FormattedMessage id="testShowQuestions.nextQuestion"
                    defaultMessage="Next question" />
                : <FormattedMessage id="testShowQuestions.seeResult"
                    defaultMessage="See result" />}
            </Button>
          )}
        </Grid>
      </div>
    );
  }
}

ShowQuestions.propTypes = {
  classes: PropTypes.object.isRequired,
  displayResultTest: PropTypes.func.isRequired,
  numberOfQuestions: PropTypes.number.isRequired,
  examQuestions: PropTypes.array.isRequired,
  onAnswerQuestion: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
  increaseGrade: PropTypes.func.isRequired,
  recordTest: PropTypes.func.isRequired
};

export default withStyles(styles)(ShowQuestions);
