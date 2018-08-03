import React from "react";

import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import VirtualStudent from "../../VirtualStudent";
import Teacher from "../../Teacher";

const styles = () => ({
  root: {
    display: "flex",
    marginTop: "5%"
  },
  imagePara: {
    marginBottom: "300px"
  }
});

class ShowExercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thinking: true,
      learning: false,
      userAnswer: false,
      studentAnswer: false
    };
  }

  componentDidMount() {
    this.props.updateScore();
    this.timeout = setTimeout(() => {
      this.setState({
        thinking: false,
        studentAnswer: this.props.student.answerParallelogram(
          this.props.parallelogram.shapeFeatures
        )
      });
    }, 2000);
  }

  handleClick = userAnswer => {
    this.props.recordExerciseActivity(userAnswer, this.state.studentAnswer);
    this.setState({ learning: true, userAnswer });
    this.props.student.learn(
      this.state.studentAnswer ? userAnswer : !userAnswer,
      this.props.parallelogram.shapeFeatures
    );
    setTimeout(() => {
      this.props.getBackToMenu();
    }, 2000);
  };

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  render() {
    const { classes } = this.props;

    let bubbleText;
    if (this.state.thinking === true) {
      bubbleText = this.props.student.thinkingAboutExercice;
    } else if (this.state.learning === true) {
      if (this.state.userAnswer) {
        bubbleText = this.props.student.hasRightAnswerExercise;
      } else {
        bubbleText = this.props.student.hasFalseAnswerExercise;
      }
    } else if (this.state.studentAnswer) {
      bubbleText = this.props.student.givePositiveAnswer;
    } else {
      bubbleText = this.props.student.giveNegativeAnswer;
    }

    return (
      <React.Fragment>
        <Grid container alignItems="flex-end" className={classes.root}>
          <Grid item xs={12} sm={4}>
            <VirtualStudent bubbleText={bubbleText} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid container justify="center">
              <img
                className={classes.imagePara}
                src={this.props.parallelogram.src}
                alt="parallelogram"
                width="300"
                height="300"
                border="1px solid"
              />
            </Grid>
          </Grid>
          {this.state.thinking ? (
            <Grid item xs={12} sm={4}>
              <Teacher onClickBubble={this.handleClick} waitingForAnswer />
            </Grid>
          ) : (
            <Grid item xs={12} sm={4}>
              <Teacher
                onClickBubble={this.handleClick}
                positiveAnswer={
                  <FormattedMessage
                    id="showExercise.positiveAnswer"
                    defaultMessage="True"
                  />
                }
                negativeAnswer={
                  <FormattedMessage
                    id="showExercise.negativeAnswer"
                    defaultMessage="False"
                  />
                }
                waitingForAnswer={false}
              />
            </Grid>
          )}
        </Grid>
      </React.Fragment>
    );
  }
}

ShowExercise.propTypes = {
  classes: PropTypes.object.isRequired,
  getBackToMenu: PropTypes.func.isRequired,
  parallelogram: PropTypes.object.isRequired,
  updateScore: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
  recordExerciseActivity: PropTypes.func.isRequired
};

export default withStyles(styles)(ShowExercise);
