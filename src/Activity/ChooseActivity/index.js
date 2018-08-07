import React from "react";

import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import TestConfirmationDialog from "./TestConfirmationDialog";
import SessionTimeline from "./SessionTimeline";
import RulesDialog from "../../SidePanel/RulesDialog";

const styles = theme => ({
  root: {
    height: "100%"
  },
  sessionTimeline: {
    height: "15%"
  },
  title: {
    height: "10%"
  },
  test: {
    height: "25%"
  },
  button: {
    position: "relative",
    height: 300,
    width: 300,
    "&:hover, &$focusVisible": {
      "& $imageBackdrop": {
        opacity: 0.15
      }
    }
  },
  button_test: {
    position: "relative",
    height: 100,
    width: 300,
    "&:hover, &$focusVisible": {
      "& $imageBackdrop": {
        opacity: 0.15
      }
    }
  },
  focusVisible: {},
  textButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 50%"
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity")
  }
});

const images = [
  {
    url: "images/example_512x512.png",
    title: (
      <FormattedMessage
        id="chooseActivity.showExample"
        defaultMessage="Show examples"
      />
    ),
    learningCost: "10"
  },
  {
    url: "images/exercise_512x512.png",
    title: (
      <FormattedMessage
        id="chooseActivity.giveExercise"
        defaultMessage="Give an exercise"
      />
    ),
    learningCost: "30"
  },
  {
    url: "images/lesson_512x512.png",
    title: (
      <FormattedMessage
        id="chooseActivity.giveLesson"
        defaultMessage="Give a lesson"
      />
    ),
    learningCost: "50"
  }
];

class ChooseActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openTestDialog: false,
      openRulesDialog: false
    };
    this.props.sessionRef.parent.once("value").then(snapshot => {
      if (
        !this.props.alreadyShownRules &&
        Object.keys(snapshot.val()).length === 1
      ) {
        this.setState({ openRulesDialog: true });
        this.props.hasShownRules();
      }
    });
  }

  handleButtonClick = key => {
    if (key === 0) {
      this.props.onClickExample();
    } else if (key === 1) {
      this.props.onClickExercise();
    } else if (key === 2) {
      this.props.onClickLesson();
    }
  };

  render() {
    const { classes, sessionRef } = this.props;
    return (
      <div className={classes.root}>
        <Grid
          container
          className={classes.sessionTimeline}
          justify="center"
          alignItems="center"
        >
          <Grid item sm={12}>
            <SessionTimeline sessionRef={sessionRef} />
          </Grid>
        </Grid>
        <Grid container className={classes.title} justify="center">
          <Grid item sm={6}>
            <Grid container className={classes.title} justify="center">
              <Typography variant="display1" color="inherit">
                <FormattedMessage
                  id="chooseActivity.chooseActivity"
                  defaultMessage="Choose an activity"
                />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.activities} justify="center">
          {images.map((image, index) => (
            <Grid item xs={12} sm={4} key={image.url}>
              <Grid container className={classes.group} justify="center">
                <ButtonBase
                  className={classes.button}
                  focusVisibleClassName={classes.focusVisible}
                  onClick={() => this.handleButtonClick(index)}
                >
                  <span
                    className={classes.imageSrc}
                    style={{
                      backgroundImage: `url(${image.url})`
                    }}
                  />
                  <span className={classes.imageBackdrop} />
                  <span className={classes.textButton}>
                    <Typography
                      component="span"
                      variant="title"
                      color="inherit"
                    >
                      {image.title} <br /> <br />- {image.learningCost} points
                    </Typography>
                  </span>
                </ButtonBase>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          className={classes.test}
          justify="flex-end"
          alignItems="center"
        >
          <Grid item xs={12} sm={4}>
            <Grid container justify="center">
              <ButtonBase
                className={classes.button_test}
                focusVisibleClassName={classes.focusVisible}
                onClick={() => this.setState({ openTestDialog: true })}
              >
                <span
                  className={classes.imageSrc}
                  style={{
                    backgroundImage: `url(${"images/medal_300x100.png"})`
                  }}
                />
                <span className={classes.imageBackdrop} />
                <span className={classes.textButton}>
                  <Typography component="span" variant="title" color="inherit">
                    <FormattedMessage
                      id="chooseActivity.takeTest"
                      defaultMessage="Take the test"
                    />
                  </Typography>
                </span>
              </ButtonBase>
            </Grid>
          </Grid>
        </Grid>
        <TestConfirmationDialog
          onConfirmTestDialog={this.props.onConfirmTestDialog}
          openTestDialog={this.state.openTestDialog}
          onCloseTestDialog={() => this.setState({ openTestDialog: false })}
        />
        <RulesDialog
          openRulesDialog={this.state.openRulesDialog}
          onCloseRulesDialog={() => this.setState({ openRulesDialog: false })}
        />
      </div>
    );
  }
}

ChooseActivity.propTypes = {
  classes: PropTypes.object.isRequired,
  onClickExample: PropTypes.func.isRequired,
  onClickExercise: PropTypes.func.isRequired,
  onClickLesson: PropTypes.func.isRequired,
  onConfirmTestDialog: PropTypes.func.isRequired,
  sessionRef: PropTypes.object.isRequired,
  hasShownRules: PropTypes.func.isRequired,
  alreadyShownRules: PropTypes.bool.isRequired
};

export default withStyles(styles)(ChooseActivity);
