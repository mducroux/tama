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
import VirtualStudent from "../../VirtualStudent";
import TeacherChoosingActivity from "../../Teacher/TeacherChoosingActivity";

const styles = theme => ({
  root: {
    height: "100%"
  },
  sessionTimeline: {
    height: "15%",
    display: "flex",
    alignItems: "center"
  },
  mainContent: {
    height: "85%"
  },
  activityChoice: {
    height: "100%"
  },
  button: {
    position: "relative",
    height: "100%",
    width: "400%",
    "&:hover, &$focusVisible": {
      "& $imageBackdrop": {
        opacity: 0.15
      }
    }
  },
  button_test: {
    position: "relative",
    height: "100%",
    width: "400%",
    "&:hover, &$focusVisible": {
      "& $imageBackdrop": {
        opacity: 0.15
      }
    }
  },
  focusVisible: {},
  textButton: {
    position: "absolute",
    left: "25%",
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white
  },
  textButtonTest: {
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
    url: "images/example_1536x512.png",
    title: (
      <FormattedMessage
        id="chooseActivity.showExample"
        defaultMessage="Show an example"
      />
    ),
    learningCost: "10",
    teacherText: (
      <FormattedMessage
        id="chooseActivity.showExampleTeacherText"
        defaultMessage="I'm going to show you an example"
      />
    )
  },
  {
    url: "images/exercise_1536x512.png",
    title: (
      <FormattedMessage
        id="chooseActivity.giveExercise"
        defaultMessage="Give an exercise"
      />
    ),
    learningCost: "30",
    teacherText: (
      <FormattedMessage
        id="chooseActivity.giveExerciseTeacherText"
        defaultMessage="I'm going to give you an exercise"
      />
    )
  },
  {
    url: "images/lesson_1536x512.png",
    title: (
      <FormattedMessage
        id="chooseActivity.giveLesson"
        defaultMessage="Give a lesson"
      />
    ),
    learningCost: "50",
    teacherText: (
      <FormattedMessage
        id="chooseActivity.giveLessonTeacherText"
        defaultMessage="I'm going to give you a definition"
      />
    )
  }
];

class ChooseActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openTestDialog: false,
      openRulesDialog: false,
      teacherText: (
        <FormattedMessage id="gameStart.teacherThinking" defaultMessage="..." />
      ),
      teacherBubble: "images/teacher/bubble-thinking.png",
      hasChosen: false
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
        <div className={classes.sessionTimeline}>
          <SessionTimeline sessionRef={sessionRef} />
        </div>
        <Grid
          container
          justify="space-evenly"
          alignItems="flex-end"
          className={classes.mainContent}
        >
          <Grid item xs={6} sm={4}>
            <VirtualStudent
              bubbleText={
                <FormattedMessage
                  id="chooseActivity.studentQuestion"
                  defaultMessage="What do we do now?"
                />
              }
              studentImg={this.props.studentImg}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TeacherChoosingActivity
              bubbleText={this.state.teacherText}
              genderTeacherMale={this.props.genderTeacherMale}
              teacherBubble={this.state.teacherBubble}
            />
          </Grid>
          <Grid item xs={12} sm={4} className={classes.activityChoice}>
            <Grid
              container
              direction="column"
              justify="center"
              spacing={8}
              className={classes.activityChoice}
            >
              {images.map((image, index) => (
                <Grid item xs={12} sm={3} key={image.url}>
                  <ButtonBase
                    className={classes.button}
                    focusVisibleClassName={classes.focusVisible}
                    onClick={() => {
                      this.setState({
                        teacherBubble: "images/teacher/bubble-answer2.png",
                        hasChosen: true
                      });
                      setTimeout(() => this.handleButtonClick(index), 1500);
                    }}
                    onMouseEnter={() =>
                      !this.state.hasChosen &&
                      this.setState({
                        teacherText: image.teacherText
                      })
                    }
                    onMouseLeave={() =>
                      !this.state.hasChosen &&
                      this.setState({
                        teacherText: (
                          <FormattedMessage
                            id="gameStart.teacherThinking"
                            defaultMessage="..."
                          />
                        )
                      })
                    }
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
              ))}
              <Grid item xs={12} sm={3}>
                <ButtonBase
                  className={classes.button_test}
                  focusVisibleClassName={classes.focusVisible}
                  onClick={() => {
                    this.setState({
                      teacherBubble: "images/teacher/bubble-answer2.png",
                      hasChosen: true
                    });
                    setTimeout(
                      () => this.setState({ openTestDialog: true }),
                      1500
                    );
                  }}
                  onMouseEnter={() =>
                    !this.state.hasChosen &&
                    this.setState({
                      teacherText: (
                        <FormattedMessage
                          id="chooseActivity.takeTestTeacherText"
                          defaultMessage="It's time for you to take the test!"
                        />
                      )
                    })
                  }
                  onMouseLeave={() =>
                    !this.state.hasChosen &&
                    this.setState({
                      teacherText: (
                        <FormattedMessage
                          id="gameStart.teacherThinking"
                          defaultMessage="..."
                        />
                      )
                    })
                  }
                >
                  <span
                    className={classes.imageSrc}
                    style={{
                      backgroundImage: `url(${"images/medal_600x200.png"})`
                    }}
                  />
                  <span className={classes.imageBackdrop} />
                  <span className={classes.textButtonTest}>
                    <Typography
                      component="span"
                      variant="title"
                      color="inherit"
                    >
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
  alreadyShownRules: PropTypes.bool.isRequired,
  studentImg: PropTypes.string.isRequired,
  genderTeacherMale: PropTypes.bool.isRequired
};

export default withStyles(styles)(ChooseActivity);
