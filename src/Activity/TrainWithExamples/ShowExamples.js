import * as React from "react";

import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import VirtualStudent from "../../VirtualStudent";
import Teacher from "../../Teacher";

const styles = {
  root: {
    height: "100%"
  },
  group: {
    height: "90%"
  },
  shape: {
    marginTop: "5%"
  }
};

class ShowExamples extends React.Component {
  constructor(props) {
    super(props);
    this.state = { thinking: false };
  }

  handleClick = userAnswer => {
    const { student, parallelogram, recordExampleActivity } = this.props;

    recordExampleActivity(userAnswer);
    this.props.updateScore();
    this.setState({ thinking: true });
    student.learn(userAnswer, parallelogram.shapeFeatures);
    setTimeout(() => {
      this.props.getBackToMenu();
    }, 2000);
  };

  render() {
    const { classes, student, parallelogram } = this.props;
    const { thinking } = this.state;
    const bubbleText = thinking
      ? student.thinkingAboutExample
      : student.questionExample;
    return (
      <React.Fragment>
        <Grid container className={classes.root}>
          <Grid item xs={12} sm={4}>
            <Grid
              container
              justify="center"
              alignItems="flex-end"
              className={classes.group}
            >
              <VirtualStudent bubbleText={bubbleText} />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid
              container
              justify="center"
              alignItems="flex-start"
              className={classes.shape}
            >
              <img
                className={classes.imagePara}
                src={parallelogram.src}
                alt="parallelogram"
                width="300"
                height="300"
                border="1px solid"
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid
              container
              justify="center"
              alignItems="flex-end"
              className={classes.group}
            >
              <Teacher
                onClickBubble={this.handleClick}
                positiveAnswer={
                  <FormattedMessage
                    id="showExamples.positiveAnswer"
                    defaultMessage="Yes"
                  />
                }
                negativeAnswer={
                  <FormattedMessage
                    id="showExamples.negativeAnswer"
                    defaultMessage="No"
                  />
                }
                waitingForStudent={false}
              />
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

ShowExamples.propTypes = {
  classes: PropTypes.object.isRequired,
  parallelogram: PropTypes.object.isRequired,
  getBackToMenu: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
  recordExampleActivity: PropTypes.func.isRequired
};

export default withStyles(styles)(ShowExamples);
