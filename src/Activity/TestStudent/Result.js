// @flow

import React from "react";

import { FormattedMessage } from "react-intl";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
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

const Result = ({ studentName, classes, activityScore, score, ...props }) => (
  <React.Fragment>
    <Grid container justify="center" className={classes.root}>
      <div className={classes.group}>
        <img src="images/diploma.jpg" alt="Diploma" width="400" height="300" />
        <div className={classes.textImage}>
          <FormattedMessage
            id="testResult.description"
            defaultMessage="{studentName} obtained"
            values={{ studentName }}
          />
        </div>
        <div className={classes.textGrade}>
          {props.grade} / {props.questions.length}
        </div>
      </div>
    </Grid>
    <Grid container justify="center" className={classes.root}>
      <Typography variant="display1" className={classes.finalScore}>
        <FormattedMessage
          id="testResult.finalScore"
          defaultMessage="Your final score: {activityScore} + {score} = {totalScore} points"
          values={{ activityScore, score, totalScore: activityScore + score }}
        />
      </Typography>
    </Grid>
    <Grid container justify="center" className={classes.root}>
      {props.questions.map((img, index) => (
        <div key={img.src}>
          <img src={img.src} alt={img.src} width="200" height="200" />
          {props.answers[index] === img.valid ? (
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
        onClick={() => props.startNewGame()}
      >
        <FormattedMessage
          id="testResult.startAgain"
          defaultMessage="Start a new game"
        />
      </Button>
    </Grid>
  </React.Fragment>
);

Result.propTypes = {
  classes: PropTypes.object.isRequired,
  grade: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  answers: PropTypes.array.isRequired,
  startNewGame: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  activityScore: PropTypes.number.isRequired,
  studentName: PropTypes.string.isRequired
};

export default withStyles(styles)(Result);
