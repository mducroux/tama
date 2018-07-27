import * as React from "react";

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
    this.state = { thinking: false, userAnswer: false };
  }

  choiceOrAnswer = () => {
    const { thinking, userAnswer } = this.state
    if (thinking) {
      return (
        <Typography variant="title">
          {userAnswer && <FormattedMessage id="showExamples.yes" defaultMessage="Yes" />}
          {!userAnswer && <FormattedMessage id="showExamples.no" defaultMessage="No" />}
        </Typography>
      );
    }
    return (
      <Grid container justify="center" spacing={40}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.handleClick(true)}
          >
            <FormattedMessage id="showExamples.yes" defaultMessage="Yes" />
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.handleClick(false)}
          >
            <FormattedMessage id="showExamples.no" defaultMessage="No" />
          </Button>
        </Grid>
      </Grid>
    );
  };

  handleClick = userAnswer => {
    this.setState({ thinking: true, userAnswer });
    const { student, parallelogram, recordExampleActivity } = this.props
    student.learn(userAnswer, parallelogram.shapeFeatures);
    recordExampleActivity(userAnswer);
    setTimeout(() => {
      this.props.updateScore();
      this.props.updateHistory()
      this.props.getBackToMenu();
      this.setState({ thinking: false });
    }, 2000);
  };

  render() {
    console.log('render')
    const { classes, student, parallelogram } = this.props;
    const { thinking } = this.state;
    const bubbleText = thinking ? student.thinkingAboutExample : student.questionExample;
    console.log(bubbleText)
    return (
      <React.Fragement>
        <Grid container justify="center" className={classes.root}>
          <VirtualStudent bubbleText={bubbleText} />
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <img
            src={parallelogram.src}
            alt="parallelogram"
            width="300"
            height="300"
          />
        </Grid>
        <Grid container justify="center" className={classes.root}>
          {this.choiceOrAnswer()}
        </Grid>
      </React.Fragement>
    );
  }
}

ShowExamples.propTypes = {
  classes: PropTypes.object.isRequired,
  parallelogram: PropTypes.object.isRequired,
  getBackToMenu: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired,
  updateHistory: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
  recordExampleActivity: PropTypes.func.isRequired
};

export default withStyles(styles)(ShowExamples);
