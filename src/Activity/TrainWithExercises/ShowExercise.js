import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import VirtualStudent from "../../VirtualStudent";

const styles = () => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "10px"
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
    setTimeout(() => {
      this.setState({
        thinking: false,
        studentAnswer: this.props.student.answerParallelogram(
          this.props.parallelogram.shapeFeatures
        )
      });
    }, 2000);
  }

  handleClick = userAnswer => {
    this.setState({ learning: true, userAnswer });
    this.props.student.learn(
      this.state.studentAnswer ? userAnswer : !userAnswer,
      this.props.parallelogram.shapeFeatures
    );
    setTimeout(() => {
      this.props.recordExerciseActivity(
        this.state.userAnswer,
        this.state.studentAnswer
      );
      this.props.updateScore();
      this.props.getBackToMenu();
    }, 2000);
  };

  render() {
    const { classes } = this.props;

    let bubbleText;
    if (this.state.thinking === true) {
      bubbleText = this.props.student.thinkingAboutExercice;
    } else if (this.state.learning === true) {
      if (this.state.userAnswer) {
        bubbleText = this.props.student.hasRightAnswerExercice;
      } else {
        bubbleText = this.props.student.hasFalseAnswerExercice;
      }
    } else if (this.state.studentAnswer) {
      bubbleText = this.props.student.givePositiveAnswer;
    } else {
      bubbleText = this.props.student.giveNegativeAnswer;
    }

    return (
      <div>
        <Grid container justify="center" className={classes.root}>
          <VirtualStudent bubbleText={bubbleText} />
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <img
            src={this.props.parallelogram.src}
            alt="parallelogram"
            width="300"
            height="300"
          />
        </Grid>
        <Grid container justify="center" className={classes.root}>
          {!this.state.thinking &&
            !this.state.learning && (
              <div>
                <Grid container justify="center" spacing={40}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => this.handleClick(true)}
                    >
                      Vrai
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => this.handleClick(false)}
                    >
                      Faux
                    </Button>
                  </Grid>
                </Grid>
              </div>
            )}
        </Grid>
      </div>
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
