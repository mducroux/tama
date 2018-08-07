import React from "react";

import { withStyles } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import SvgIcon from "@material-ui/core/SvgIcon";
import { Typography } from "@material-ui/core";
import SchoolIcon from "@material-ui/icons/School";

// Reference: https://github.com/stephane-monnot/react-vertical-timeline
import { VerticalTimeline, VerticalTimelineElement } from "./VerticalTimeline";
import "./index.css";

function ExampleIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="m 18.079014,8.8530957 c -0.655196,2.1725163 -2.275967,3.3966903 -3.738685,4.9341153 -1.882243,1.974216 -1.258644,4.658243 -3.152416,4.020305 -1.2299331,-0.416702 -0.882217,-2.290332 -0.566115,-3.207033 1.002919,-2.9168 4.666861,-4.551945 5.031814,-7.1842346 C 16.030067,4.7092544 12.960981,3.1660766 10.549958,4.0425594 8.7079255,4.7149929 8.368831,5.8213619 7.6130535,7.3846388 7.2998208,8.0369793 6.80555,8.6203234 5.9894203,8.3616897 4.6704053,7.9478811 5.2365158,6.0225218 5.5813585,5.1173122 6.5842742,2.4936302 8.5728636,1.6861359 11.124698,1.2234724 c 4.413969,-0.37932978 8.34803,3.0058671 6.954316,7.6296233 z M 11.946567,22.083542 c -1.06039,0.255748 -2.5144691,-1.319034 -0.531632,-2.29034 1.916756,0.09503 1.502936,2.054704 0.531632,2.29034 z" />
    </SvgIcon>
  );
}

function ExerciseIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="m 20.391186,2.351321 c 0,0 -0.05116,0.051154 -0.05116,0.051154 0,0 0,-0.051154 0,-0.051154 0,0 0.05116,0 0.05116,0 z M 4.9844296,4.859404 c 0,-0.6940934 0.00973,-1.3835512 0.8189577,-1.6353773 0.1909336,-0.059383 0.3168348,-0.05323 0.5118558,-0.053747 0,0 8.6503059,0 8.6503059,0 0,0 3.327033,0 3.327033,0 0.83583,0.00343 1.278102,0.4437638 1.27962,1.2796263 0,0 0,6.449335 0,6.449335 0,0.118237 -0.01069,0.288174 0.05223,0.390023 0.128991,0.206267 0.559464,0.288696 0.823039,0.591708 0.493455,0.567134 0.434043,0.814337 0.60912,1.475153 0,0 -0.972504,0.709934 -0.972504,0.709934 -0.140765,0.106002 -0.379296,0.264626 -0.459655,0.418222 -0.06197,0.118717 -0.05168,0.276361 -0.05223,0.407403 0,0 0,4.401916 0,4.401916 0,0 0,0.921336 0,0.921336 0,0.672061 -0.01028,1.250967 -0.767814,1.528898 -0.175021,0.06398 -0.329598,0.05732 -0.511806,0.05792 0,0 -10.1858587,0 -10.1858587,0 0,0 -1.4331788,0 -1.4331788,0 -0.6833237,0 -1.3328578,0.02557 -1.6067012,-0.767778 -0.075242,-0.218047 -0.081908,-0.438141 -0.082417,-0.66541 0,0 0,-1.904086 0,-1.904086 0,0 -1.637925,0 -1.637925,0 C 3.0997895,18.39737 2.9124521,18.173752 2.9748994,17.912705 3.0480904,17.6056 3.3362603,17.55697 3.6024266,17.553394 c 0,0 1.3820002,0 1.3820002,0 0,0 0,-2.712829 0,-2.712829 0,0 -1.1772575,0 -1.1772575,0 -0.1417828,0 -0.327586,0.0067 -0.4596428,-0.04563 -0.2999456,-0.118241 -0.3977092,-0.469363 -0.1837566,-0.710454 0.1622581,-0.183233 0.3705826,-0.164785 0.5922143,-0.165315 0,0 1.2284428,0 1.2284428,0 0,0 0,-2.86638 0,-2.86638 0,0 -1.0748867,0 -1.0748867,0 -0.1484354,0 -0.4325162,0.01331 -0.5620136,-0.03788 -0.2953372,-0.116198 -0.3982195,-0.477048 -0.1837565,-0.718119 0.1622581,-0.183245 0.3705826,-0.16482 0.5922143,-0.165306 0,0 1.2284426,0 1.2284426,0 0,0 0,-2.7128362 0,-2.7128362 0,0 -1.1772573,0 -1.1772573,0 -0.1417828,0 -0.327586,0.00657 -0.4596428,-0.04556 C 3.047582,7.2548504 2.9498186,6.9037625 3.163771,6.6626577 3.3260297,6.4794015 3.5343549,6.4978404 3.7559856,6.4973168 c 0,0 1.2284427,0 1.2284427,0 0,0 0,-1.6378971 0,-1.6378983 z" />
    </SvgIcon>
  );
}

function LessonIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M 3.742199,4.6088167 C 3.7497581,4.1637666 3.980625,4.1620145 4.3787984,4.0676981 4.9957566,3.9218285 5.7185987,3.8234536 6.3465376,3.9108437 c 0,0 0.4629817,0 0.4629817,0 0.3426107,0.046318 0.9398783,0.1771207 1.2732286,0.2766602 1.202627,0.3582522 2.5284861,1.1574907 3.4139991,2.0423647 0,0 0.810812,0.9254009 0.810812,0.9254009 0.20198,-0.4357786 0.894726,-1.0995971 1.273227,-1.4115496 1.382622,-1.137808 2.747853,-1.6679339 4.514176,-1.839223 0.654599,-0.063102 1.325902,-0.012774 1.967711,0.1469998 0.156849,0.039396 0.541719,0.1238509 0.637203,0.2505944 0.09144,0.1221261 0.05731,0.7610334 0.05731,0.9433324 0.216418,0.019642 0.742498,0.1261777 0.866936,0.3136833 0.09898,0.1487209 0.059,1.0203151 0.059,1.2488999 0,0 1.157473,0 1.157473,0 0,0 0,12.3272023 0,12.3272023 0,0 -0.578738,0.05556 -0.578738,0.05556 0,0 -0.868103,0 -0.868103,0 0,0 -0.92599,0.06019 -0.92599,0.06019 0,0 -1.909857,0.05789 -1.909857,0.05789 0,0 -0.983844,0.0602 -0.983844,0.0602 0,0 -0.810237,0 -0.810237,0 0,0 -0.694498,0.05557 -0.694498,0.05557 0,0 -2.257081,0.05791 -2.257081,0.05791 -0.263331,1.671402 -2.861297,1.712486 -3.183083,0 0,0 -3.7039256,-0.11575 -3.7039256,-0.11575 0,0 -0.9259852,-0.06021 -0.9259852,-0.06021 0,0 -0.8102407,0 -0.8102407,0 0,0 -0.6944793,-0.05557 -0.6944793,-0.05557 0,0 -2.0256041,-0.05789 -2.0256041,-0.05789 0,0 -0.7523621,-0.05788 -0.7523621,-0.05788 0,0 0,-12.3272055 0,-12.3272055 0,0 1.1574766,0 1.1574766,0 0,0 0,-1.3310726 0,-1.3310726 0,0 0.8681108,-0.2315105 0.8681108,-0.2315105 0,0 0,-0.6366074 0,-0.6366084 z" />
    </SvgIcon>
  );
}

function TestIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M 5.6138006,9.3570506 C 5.869878,7.8082938 6.0840921,6.9834418 7.1699484,5.7375345 9.8759756,2.640013 15.275694,2.6474026 17.688713,6.1782789 c 1.492131,2.1864849 1.836852,7.0198991 -0.714057,8.5267981 0,0 1.477363,4.185845 1.477363,4.185845 0,0 -2.417947,-0.167436 -2.417947,-0.167436 0,0 -2.014127,1.644777 -2.014127,1.644777 0,0 -0.984905,-3.447159 -0.984905,-3.447159 0,0 -1.47735,0 -1.47735,0 0,0 -1.231131,3.447159 -1.231131,3.447159 0,0 -0.4924564,0 -0.4924564,0 C 8.2090242,17.974951 8.366606,18.770269 5.894502,18.890922 c 0,0 1.477352,-4.185845 1.477352,-4.185845 C 5.9043465,13.757109 5.3429548,11.011689 5.6138006,9.3570506 Z" />
    </SvgIcon>
  );
}

const styles = theme => ({
  root: {
    height: "100%"
  },
  title: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "5%"
  },
  answers: {
    backgroundColor: theme.palette.background.default
  }
});

const icons = {
  start: {
    icon: <SchoolIcon />,
    color: "#1996ef"
  },
  example: {
    icon: <ExampleIcon />,
    color: "#48b02c"
  },
  exercise: {
    icon: <ExerciseIcon />,
    color: "#f89160"
  },
  lesson: {
    icon: <LessonIcon />,
    color: "#4992af"
  },
  test: {
    icon: <TestIcon />,
    color: "#f54f33"
  }
};

// temporary work-around (see https://github.com/yahoo/babel-plugin-react-intl/issues/119)
function FormattedMessageFixed(props) {
  return <FormattedMessage {...props} />;
}

const SessionHistory = ({ classes, history, studentName, student }) => {
  const { activities, test } = history;

  return (
    <div className={classes.root}>
      <Grid container justify="center" className={classes.title}>
        <Typography variant="display1">
          <FormattedMessage
            id="sessionHistory.studentName"
            defaultMessage="{studentName}'s history"
            values={{ studentName }}
          />
        </Typography>
      </Grid>
      <VerticalTimeline>
        <VerticalTimelineElement
          iconStyle={{
            background: icons.start.color,
            color: "#fff"
          }}
          icon={icons.start.icon}
        >
          <Typography variant="title">
            <FormattedMessage
              id="sessionHistory.startGame"
              defaultMessage="Start of the game"
            />
          </Typography>
        </VerticalTimelineElement>
        {activities &&
          Object.values(activities).map((elem, index) => (
            <VerticalTimelineElement
              key={index}
              iconStyle={{
                background: icons[elem.activity_type].color,
                color: "#fff"
              }}
              icon={icons[elem.activity_type].icon}
            >
              <Grid container spacing={40}>
                <Grid item>
                  <Typography variant="title">
                    <FormattedMessageFixed
                      id={`app.${elem.activity_type}`}
                      defaultMessage={elem.activity_type}
                    />
                  </Typography>
                  {elem.activity_type !== "lesson" && (
                    <img
                      src={elem.item}
                      alt={elem.activity_type}
                      width="200px"
                      height="200px"
                    />
                  )}
                  {elem.activity_type === "lesson" && <p>{elem.item}</p>}
                </Grid>
                <Grid item xs={12} sm={12}>
                  {elem.activity_type === "exercise" && (
                    <div className={classes.answers}>
                      <Grid container alignItems="center" spacing={16}>
                        <Grid item>
                          <img
                            src="images/virtual_student/student_avatar.png"
                            alt="student-avatar"
                            width="40px"
                            height="40px"
                          />
                        </Grid>
                        <Grid item>
                          {'"'}
                          {elem.student_answer
                            ? student.givePositiveAnswer
                            : student.giveNegativeAnswer}
                          {'"'}
                        </Grid>
                      </Grid>
                      <Grid container alignItems="center" spacing={16}>
                        <Grid item>
                          <img
                            src="images/teacher/teacher_avatar.png"
                            alt="teacher-avatar"
                            width="40px"
                            height="40px"
                          />
                        </Grid>
                        <Grid item>
                          {elem.user_answer ? (
                            <FormattedMessage
                              id="sessionHistory.positiveAnswerTeacherExercise"
                              defaultMessage="&quot;This is true&quot;"
                            />
                          ) : (
                            <FormattedMessage
                              id="sessionHistory.negativeAnswerTeacherExercise"
                              defaultMessage="&quot;This is false&quot;"
                            />
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  )}
                  {elem.activity_type === "example" && (
                    <div className={classes.answers}>
                      <Grid container alignItems="center" spacing={16}>
                        <Grid item>
                          <img
                            src="images/teacher/teacher_avatar.png"
                            alt="teacher-avatar"
                            width="40px"
                            height="40px"
                          />
                        </Grid>
                        <Grid item>
                          {elem.user_answer ? (
                            <FormattedMessage
                              id="sessionHistory.positiveAnswerTeacherExample"
                              defaultMessage="&quot;This is a parallelogram&quot;"
                            />
                          ) : (
                            <FormattedMessage
                              id="sessionHistory.negativeAnswerTeacherExample"
                              defaultMessage="&quot;This is not a parallelogram&quot;"
                            />
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  )}
                  {elem.activity_type === "lesson" && (
                    <div className={classes.answers}>
                      <Grid container alignItems="center" spacing={16}>
                        <Grid item>
                          <img
                            src="images/virtual_student/student_avatar.png"
                            alt="student-avatar"
                            width="40px"
                            height="40px"
                          />
                        </Grid>
                        <Grid item>
                          {'"'}
                          {elem.student_already_know
                            ? student.feedbackLessonAlreadyKnow
                            : student.feedbackLessonDidntKnow}
                          {'"'}
                        </Grid>
                      </Grid>
                    </div>
                  )}
                </Grid>
              </Grid>
            </VerticalTimelineElement>
          ))}
        {test && (
          <VerticalTimelineElement
            iconStyle={{
              background: icons.test.color,
              color: "#fff"
            }}
            icon={icons.test.icon}
          >
            <Typography variant="title">
              <FormattedMessage
                id="sessionHistory.test"
                defaultMessage="Test"
              />
            </Typography>
            <br />
            <Typography variant="title">
              <FormattedMessage
                id="sessionHistory.grade"
                defaultMessage="Grade {grade} / {maxGrade}"
                values={{
                  grade: test.grade,
                  maxGrade: Object.keys(test.questions).length
                }}
              />
            </Typography>
          </VerticalTimelineElement>
        )}
      </VerticalTimeline>
    </div>
  );
};

SessionHistory.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  studentName: PropTypes.string.isRequired,
  student: PropTypes.object.isRequired
};

export const StyledSessionHistory = withStyles(styles, { withTheme: true })(
  SessionHistory
);

class FirebaseWrapper extends React.Component<
  { sessionRef: any },
  { history: Object[] }
> {
  state = { history: {} };

  componentWillMount() {
    this.props.sessionRef.on("value", session => {
      this.setState({ history: session.val() });
    });
  }

  componentWillUnmount() {
    this.props.sessionRef.off();
  }

  render() {
    return (
      <StyledSessionHistory history={this.state.history} {...this.props} />
    );
  }
}

export default FirebaseWrapper;
