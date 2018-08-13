// @flow
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

import { gridScores } from "../../App";

type PropsT = {
  classes: Object,
  completed: number
};

const heightBar = "25px";

const styles = {
  root: {
    flexGrow: 1,
    position: "relative"
  },
  progressBar: {
    borderRadius: "10px",
    height: heightBar,
    position: "relative",
    colorPrimary: "#ff3d00"
  },
  textBar: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center"
  },
  stepBar1: {
    position: "absolute",
    top: "50%",
    left: "10%",
    transform: "translate(-50%, -50%)",
    borderLeft: "2px dashed black",
    height: heightBar
  },
  stepBar2: {
    position: "absolute",
    top: "50%",
    left: "20%",
    transform: "translate(-50%, -50%)",
    borderLeft: "2px dashed black",
    height: heightBar
  },
  stepBar3: {
    position: "absolute",
    top: "50%",
    left: "30%",
    transform: "translate(-50%, -50%)",
    borderLeft: "2px dashed black",
    height: heightBar
  },
  stepBar4: {
    position: "absolute",
    top: "50%",
    left: "40%",
    transform: "translate(-50%, -50%)",
    borderLeft: "2px dashed black",
    height: heightBar
  },
  stepBar5: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderLeft: "2px dashed black",
    height: heightBar
  },
  stepBar6: {
    position: "absolute",
    top: "50%",
    left: "60%",
    transform: "translate(-50%, -50%)",
    borderLeft: "2px dashed black",
    height: heightBar
  },
  stepBar7: {
    position: "absolute",
    top: "50%",
    left: "70%",
    transform: "translate(-50%, -50%)",
    borderLeft: "2px dashed black",
    height: heightBar
  },
  stepBar8: {
    position: "absolute",
    top: "50%",
    left: "80%",
    transform: "translate(-50%, -50%)",
    borderLeft: "2px dashed black",
    height: heightBar
  },
  stepBar9: {
    position: "absolute",
    top: "50%",
    left: "90%",
    transform: "translate(-50%, -50%)",
    borderLeft: "2px dashed black",
    height: heightBar
  },
  stepBar10: {
    position: "absolute",
    top: "50%",
    left: "100%",
    transform: "translate(-50%, -50%)",
    height: heightBar
  },
  step: {
    position: "absolute",
    right: "4px",
    transform: "translate(0,25%)"
  }
};

const StepBar = ({ classes }: { classes: Object }) => {
  const stepBars = [];
  for (let i = 1; i <= 10; i++) {
    stepBars.push(
      <div className={classes[`stepBar${i}`]} key={i}>
        <span className={classes.step}>{gridScores[i]}</span>
      </div>
    );
  }
  return <div>{stepBars}</div>;
};

const TestScoreBar = ({ classes, completed }: PropsT) => (
  <div className={classes.root}>
    <LinearProgress
      className={classes.progressBar}
      variant="determinate"
      color="primary"
      value={completed * 10}
    />
    <StepBar classes={classes} />
  </div>
);

export default withStyles(styles)(TestScoreBar);
