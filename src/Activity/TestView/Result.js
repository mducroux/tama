// @flow

import React from "react";

import { FormattedMessage } from "react-intl";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Cancel from "@material-ui/icons/Cancel";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

import TestScoreBar from "./TestScoreBar";

const styles = theme => ({
  root: {
    height: "100%"
  },
  testScoreBar: {
    height: "18%"
  },
  diploma: {
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
    height: "7%"
  },
  textScore: {
    textAlign: "center"
  },
  mainContent: {
    height: "60%"
  },
  resultStudent: {
    height: "100%"
  },
  questionAnswers: {
    height: "100%"
  },
  gridList: {
    width: 600,
    height: 400,
    background: theme.palette.common.white,
    border: "4px solid #fff"
  },
  titleBar: {
    background: "transparent"
  },
  imgPara: {
    background: theme.palette.background.default
  },
  spacingPara: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden"
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
  startNewGame: void => void,
  indexScore: number
};

type StateT = {
  grade: number,
  finalScore: Object
};

const ResultStudent = ({
  classes,
  studentName,
  grade,
  questions
}: {
  classes: Object,
  studentName: string,
  grade: number,
  questions: Object[]
}) => (
  <Grid item xs={12} sm={6}>
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.resultStudent}
    >
      <div className={classes.diploma}>
        <img src="images/diploma.png" alt="Diploma" width="400" height="300" />
        <div className={classes.textImage}>
          <FormattedMessage
            id="testResult.description"
            defaultMessage="{studentName} obtained"
            values={{ studentName }}
          />
        </div>
        <div className={classes.textGrade}>
          {grade} / {questions.length}
        </div>
      </div>
    </Grid>
  </Grid>
);

const QuestionsAnswers = ({
  classes,
  questions,
  answers
}: {
  classes: Object,
  questions: Object[],
  answers: Array<boolean>
}) => (
  <Grid item xs={12} sm={6}>
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.questionAnswers}
    >
      <div className={classes.spacingPara}>
        <GridList
          cols={3}
          className={classes.gridList}
          cellHeight={200}
          spacing={4}
        >
          {questions.map((img, index) => (
            <GridListTile key={img.src}>
              <img
                src={img.src}
                alt={img.src}
                width={200}
                height={200}
                className={classes.imgPara}
              />
              <GridListTileBar
                titlePosition="top"
                actionIcon={
                  answers[index] === img.valid ? (
                    <CheckCircle color="primary" />
                  ) : (
                    <Cancel color="error" />
                  )
                }
                actionPosition="left"
                className={classes.titleBar}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </Grid>
  </Grid>
);

class Result extends React.Component<PropsT, StateT> {
  timeout: TimeoutID;

  constructor(props) {
    super(props);
    this.state = {
      grade: this.props.indexScore,
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
    setTimeout(() => this.setState({ grade: this.props.grade }), 100); // allows animation of progress bar
    this.timeout = setTimeout(
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
      4000
    );
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.testScoreBar}
        >
          <Grid item sm={11}>
            <TestScoreBar completed={this.state.grade} />
          </Grid>
        </Grid>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.finalScore}
        >
          <Typography variant="headline" className={classes.textScore}>
            {this.state.finalScore}
          </Typography>
        </Grid>
        <Grid container className={classes.mainContent}>
          <ResultStudent
            classes={classes}
            studentName={this.props.studentName}
            grade={this.props.grade}
            questions={this.props.questions}
          />
          <QuestionsAnswers
            classes={classes}
            questions={this.props.questions}
            answers={this.props.answers}
          />
        </Grid>
        <Grid container justify="center" className={classes.group}>
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
      </div>
    );
  }
}

export default withStyles(styles)(Result);
