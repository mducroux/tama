import * as React from "react";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import VirtualStudent from "../../VirtualStudent";
import Teacher from "../../Teacher";
import { FormattedMessage } from "react-intl";

const styles = {
  root: {
    display: "flex",
    marginTop: "5%"
  },
  imagePara: {
    marginBottom: "300px"
  }
};

class ShowExamples extends React.Component {
  constructor(props) {
    super(props);
    this.state = { thinking: false };
  }

  handleClick = userAnswer => {
    this.setState({ thinking: true });
    const { student, parallelogram, recordExampleActivity } = this.props;
    student.learn(userAnswer, parallelogram.shapeFeatures);
    recordExampleActivity(userAnswer);
    setTimeout(() => {
      this.props.updateScore();
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
        <Grid container alignItems="flex-end" className={classes.root}>
          <Grid item xs={12} sm={4}>
            <VirtualStudent bubbleText={bubbleText} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid container justify="center">
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
              waitingForAnswer={false}
            />
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
