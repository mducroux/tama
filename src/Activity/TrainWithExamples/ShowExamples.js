import React from "react";

import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

import VirtualStudent from "../../VirtualStudent";

const styles = () => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "10px"
  },
  textImage: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
});

class ShowExamples extends React.Component {
  constructor(props) {
    super(props);
    this.state = { indexExample: 0, thinking: false, userAnswer: false };
  }

  choiceOrAnswer = () => {
    if (this.state.thinking) {
      return (
        <Typography variant="title">
          {this.state.userAnswer
            ? <FormattedMessage id="showExamples.yes"
              defaultMessage="Yes" />
            : <FormattedMessage id="showExamples.no"
              defaultMessage="No" />}
        </Typography>
      );
    }
    return (
      <div>
        <Grid container justify="center" spacing={40}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleClick(true)}
            >
              <FormattedMessage id="showExamples.yes"
                defaultMessage="Yes" />
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleClick(false)}
            >
              <FormattedMessage id="showExamples.no"
                defaultMessage="No" />
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  };

  handleClick = userAnswer => {
    this.setState({ thinking: true, userAnswer });
    this.props.student.learn(
      userAnswer,
      this.props.parallelograms[this.state.indexExample].shapeFeatures
    );
    this.props.recordExampleActivity(
      userAnswer,
      this.state.indexExample
    );
    setTimeout(() => {
      if (this.state.indexExample + 1 === this.props.numberOfExamples) {
        this.props.updateScore();
        this.props.updateHistory()
        this.props.getBackToMenu();
      } else {
        this.setState({
          thinking: false,
          indexExample: this.state.indexExample + 1
        });
      }
    }, 2000);
  };

  render() {
    const { classes } = this.props;

    let bubbleText;
    if (this.state.thinking) {
      bubbleText = this.props.student.thinkingAboutExample;
    } else {
      bubbleText = this.props.student.questionExample;
    }

    return (
      <div>
        <Grid container justify="center" className={classes.root}>
          <VirtualStudent bubbleText={bubbleText} />
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <FormattedMessage id="showExamples.indexExample"
            defaultMessage="Example:" />
          {this.state.indexExample + 1} / 3
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <img
            src={this.props.parallelograms[this.state.indexExample].src}
            alt="parallelogram"
            width="300"
            height="300"
          />
        </Grid>
        <Grid container justify="center" className={classes.root}>
          {this.choiceOrAnswer()}
        </Grid>
      </div>
    );
  }
}

ShowExamples.propTypes = {
  classes: PropTypes.object.isRequired,
  numberOfExamples: PropTypes.number.isRequired,
  parallelograms: PropTypes.array.isRequired,
  getBackToMenu: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired,
  updateHistory: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
  recordExampleActivity: PropTypes.func.isRequired
};

export default withStyles(styles)(ShowExamples);
