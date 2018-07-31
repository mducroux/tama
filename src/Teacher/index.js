import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = () => ({
  root: {
    display: "flex",
    alignItems: "flex-end"
  },
  bubbleThinking1: {
    transform: "scaleX(-1)",
    backgroundColor: "transparent",
    cursor: "pointer",
    overflow: "hidden",
    outline: "none",
    border: "none"
  },
  bubbleThinking2: {
    transform: "scaleX(1)",
    backgroundColor: "transparent",
    cursor: "pointer",
    overflow: "hidden",
    outline: "none",
    border: "none"
  },
  bubbleAnswer: {
    position: "relative",
    left: "-20%",
    backgroundColor: "transparent",
    cursor: "pointer",
    overflow: "hidden",
    outline: "none",
    border: "none"
  },
  textImage1: {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%) scaleX(-1)",
    textAlign: "center"
  },
  textImage2: {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center"
  }
});

class Teacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thinking: true,
      bubbleThinking1: "images/teacher/bubble-thinking.png",
      bubbleThinking2: "images/teacher/bubble-thinking.png",
      answer: true
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {!this.props.waitingForAnswer && (
          <Grid container justify="space-around" className={classes.root}>
            {this.state.thinking && (
              <div>
                <button
                  className={classes.bubbleThinking1}
                  onClick={() => {
                    this.setState({ thinking: false, answer: true });
                    this.props.onClickBubble(true);
                  }}
                  onMouseEnter={() =>
                    this.setState({
                      bubbleThinking1:
                        "images/teacher/bubble-thinking-focus.png"
                    })
                  }
                  onMouseLeave={() =>
                    this.setState({
                      bubbleThinking1: "images/teacher/bubble-thinking.png"
                    })
                  }
                >
                  <img
                    src={this.state.bubbleThinking1}
                    width="200"
                    height="150"
                    alt="bubble"
                  />
                  <div className={classes.textImage1}>
                    {" "}
                    {this.props.positiveAnswer}{" "}
                  </div>
                </button>
                <button
                  className={classes.bubbleThinking2}
                  onClick={() => {
                    this.setState({ thinking: false, answer: false });
                    this.props.onClickBubble(false);
                  }}
                  onMouseEnter={() =>
                    this.setState({
                      bubbleThinking2:
                        "images/teacher/bubble-thinking-focus.png"
                    })
                  }
                  onMouseLeave={() =>
                    this.setState({
                      bubbleThinking2: "images/teacher/bubble-thinking.png"
                    })
                  }
                >
                  <img
                    src={this.state.bubbleThinking2}
                    width="200"
                    height="150"
                    alt="bubble"
                  />
                  <div className={classes.textImage2}>
                    {" "}
                    {this.props.negativeAnswer}{" "}
                  </div>
                </button>
              </div>
            )}
            {!this.state.thinking && (
              <div className={classes.bubbleAnswer}>
                <img
                  src="images/teacher/bubble-answer.png"
                  width="200"
                  height="150"
                  alt="bubble"
                />
                <div className={classes.textImage2}>
                  {" "}
                  {this.state.answer
                    ? this.props.positiveAnswer
                    : this.props.negativeAnswer}{" "}
                </div>
              </div>
            )}
          </Grid>
        )}
        <Grid container justify="center">
          <img
            src="images/teacher/teacher.png"
            width="150"
            height="300"
            alt="teacher"
          />
        </Grid>
      </div>
    );
  }
}

Teacher.propTypes = {
  classes: PropTypes.object.isRequired,
  onClickBubble: PropTypes.func.isRequired,
  positiveAnswer: PropTypes.object,
  negativeAnswer: PropTypes.object,
  waitingForAnswer: PropTypes.bool.isRequired
};

export default withStyles(styles)(Teacher);
