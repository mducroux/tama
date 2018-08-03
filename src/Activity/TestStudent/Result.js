// @flow

import React from "react";

import { FormattedMessage } from "react-intl";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Cancel from "@material-ui/icons/Cancel";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = () => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "75px"
  },
  group: {
    position: "relative"
  },
  textImage: {
    position: "absolute",
    top: "30%",
    left: "35%",
    transform: "translate(-50%, -50%)"
  },
  textGrade: {
    position: "absolute",
    top: "50%",
    left: "35%",
    transform: "translate(-50%, -50%)"
  },
  finalScore: {
    textAlign: "center"
  }
});

type PropsT = {
  studentName: string,
  classes: Object,
  finalScore: number,
  testScore: number,
  activityScore: number,
  updateScore: void => void,
  grade: number,
  questions: Object[],
  answers: Array<boolean>,
  startNewGame: void => void
};

type StateT = {
  finalScore: Object
};

class Result extends React.Component<PropsT, StateT> {
  constructor(props) {
    super(props);
    this.state = {
      finalScore: (
        <FormattedMessage
          id="testResult.finalScoreBefore"
          defaultMessage="Your final score: {activityScore} + {testScore} = {totalScore} points"
          values={{
            totalScore: this.props.finalScore,
            testScore: this.props.testScore,
            activityScore: this.props.activityScore
          }}
        />
      )
    };
  }

  componentDidMount() {
    this.props.updateScore();
    setTimeout(
      () =>
        this.setState({
          finalScore: (
            <FormattedMessage
              id="testResult.finalScoreAfter"
              defaultMessage="Your final score: {totalScore} points"
              values={{
                totalScore: this.props.finalScore
              }}
            />
          )
        }),
      2000
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container justify="center" className={classes.root}>
          <Typography variant="headline" className={classes.finalScore}>
            <FormattedMessage
              id="testResult.finalScore"
              defaultMessage={this.state.finalScore}
              values={{
                totalScore: this.props.finalScore,
                testScore: this.props.testScore,
                activityScore: this.props.activityScore
              }}
            />
          </Typography>
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <div className={classes.group}>
            <img
              src="images/diploma.png"
              alt="Diploma"
              width="400"
              height="300"
            />
            <div className={classes.textImage}>
              <FormattedMessage
                id="testResult.description"
                defaultMessage="{studentName} obtained"
                values={{ studentName: this.props.studentName }}
              />
            </div>
            <div className={classes.textGrade}>
              {this.props.grade} / {this.props.questions.length}
            </div>
          </div>
        </Grid>
        <Grid container justify="center" className={classes.root}>
          {this.props.questions.map((img, index) => (
            <div key={img.src}>
              <img src={img.src} alt={img.src} width="200" height="200" />
              {this.props.answers[index] === img.valid ? (
                <CheckCircle color="primary" />
              ) : (
                <Cancel color="error" />
              )}
            </div>
          ))}
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.props.startNewGame()}
          >
            <FormattedMessage
              id="testResult.startAgain"
              defaultMessage="Start a new game"
            />
          </Button>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Result);
