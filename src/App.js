// @flow

import * as React from "react";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import deepOrange from "@material-ui/core/colors/deepOrange";
import { IntlProvider, addLocaleData } from "react-intl";
import localeEn from "react-intl/locale-data/en";
import localeFr from "react-intl/locale-data/fr";

import firebase from "./firebase";
import RegistrationForm from "./RegistrationForm";
import ChooseActivity from "./Activity/ChooseActivity";
import TrainWithExample from "./Activity/TrainWithExample";
import TrainWithExercises from "./Activity/TrainWithExercises";
import TrainWithLesson from "./Activity/TrainWithLesson";
import TestStudent from "./Activity/TestStudent";
import WelcomeMenu from "./WelcomeMenu";
import getVirtualStudent from "./VirtualStudent/utils";
import AppDrawer from "./AppDrawer";
import SessionHistory from "./SessionHistory";
import messagesFr from "./translations/fr.json";
import messagesEn from "./translations/en.json";
import type { VirtualStudent } from "./VirtualStudent/types";
import parallelogramData from "./Activity/ParallelogramData";
import Leaderboard, { updateLeaderboard } from "./Leaderboard";
import nameData from "./NameData";
import Stats from "./Statistics";
import NotEnoughPointsSnackbar from "./NotEnoughPointsSnackbar";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: deepOrange,
    background: {
      paper: "#fff",
      default: "#f5f5f5"
    }
  },
  status: {
    danger: "red"
  }
});

const messages = {
  fr: messagesFr,
  en: messagesEn
};

const gridScores = [0, 10, 25, 50, 100, 200, 500, 1000, 2000, 5000, 10000];

const scoreCost = {
  example: -10,
  exercise: -30,
  lesson: -50
};

type PropsT = {};

type StateT = {
  hasBeenWelcomed: boolean,
  isRegistered: boolean,
  hasChosenActivityType: boolean,
  hasChosenActivity: string,
  view: string,
  score: number,
  scoreDisplayed: string,
  language: string,
  test: Object,
  alreadyShownRules: boolean,
  openSnackbar: boolean,
  displayResultTest: boolean,
  genderTeacherMale: boolean
};

class App extends React.Component<PropsT, StateT> {
  student: VirtualStudent;
  studentName: string;
  sessionRef: Object;
  finalScore: number;
  activityScore: number;

  constructor(props: PropsT) {
    super(props);
    this.state = {
      hasBeenWelcomed: false,
      isRegistered: !!localStorage.getItem("user_id"),
      hasChosenActivityType: false,
      hasChosenActivity: "",
      view: "welcome_menu",
      score: 200,
      scoreDisplayed: "200",
      language:
        localStorage.getItem("lang") || navigator.language.split(/[-_]/)[0],
      test: {},
      alreadyShownRules: false,
      openSnackbar: false,
      displayResultTest: false,
      genderTeacherMale: false
    };
    this.studentName = `${
      nameData[this.state.language].firstNames[
        Math.floor(
          Math.random() *
            nameData[
              localStorage.getItem("lang") ||
                navigator.language.split(/[-_]/)[0]
            ].firstNames.length
        )
      ]
    } ${
      nameData[this.state.language].lastNames[
        Math.floor(
          Math.random() *
            nameData[
              localStorage.getItem("lang") ||
                navigator.language.split(/[-_]/)[0]
            ].lastNames.length
        )
      ]
    }`;
    this.student = getVirtualStudent(this.studentName);
    addLocaleData([...localeEn, ...localeFr]);
    if (!localStorage.getItem("lang")) {
      localStorage.setItem("lang", this.state.language);
    }
  }

  updateScore = (points: number) => {
    this.sessionRef.update({ score: this.state.score + points });
    this.setState({ score: this.state.score + points });
    if (points < 0) {
      this.setState({ scoreDisplayed: this.state.scoreDisplayed + points });
    } else {
      this.setState({
        scoreDisplayed: `${this.state.scoreDisplayed}+${points}`
      });
    }
    setTimeout(() => {
      this.setState({ scoreDisplayed: this.state.score.toString() });
    }, 2000);
  };

  runTest = () => {
    const questions = [...parallelogramData]
      .sort(() => 0.5 - Math.random())
      .slice(0, 10)
      .map(x => ({
        src: x.src,
        shapeFeatures: x.shapeFeatures,
        valid: x.valid
      }));
    const answers = questions.map(q =>
      this.student.answerParallelogram(q.shapeFeatures)
    );
    const grade = questions.reduce(
      (g, q, i) => (q.valid === answers[i] ? g + 1 : g),
      0
    );
    const testScore = gridScores[grade];
    const test = { questions, answers, grade, testScore };

    const testRef = this.sessionRef.child("test");
    testRef.set(test);
    this.activityScore = this.state.score;
    this.finalScore = testScore + this.activityScore;
    this.sessionRef.child("finalScore/").set(this.finalScore);

    this.setState({
      hasChosenActivityType: true,
      hasChosenActivity: "test",
      test
    });

    const userId = localStorage.getItem("user_id");
    const username = localStorage.getItem("username");
    if (userId && username) {
      updateLeaderboard(userId, username, this.finalScore);
    }
  };

  startNewGame = () => {
    this.studentName = `${
      nameData[this.state.language].firstNames[
        Math.floor(
          Math.random() *
            nameData[
              localStorage.getItem("lang") ||
                navigator.language.split(/[-_]/)[0]
            ].firstNames.length
        )
      ]
    } ${
      nameData[this.state.language].lastNames[
        Math.floor(
          Math.random() *
            nameData[
              localStorage.getItem("lang") ||
                navigator.language.split(/[-_]/)[0]
            ].lastNames.length
        )
      ]
    }`;
    this.student = getVirtualStudent(this.studentName);
    this.setState({
      hasBeenWelcomed: false,
      hasChosenActivityType: false,
      hasChosenActivity: "",
      score: 200,
      scoreDisplayed: "200",
      view: "welcome_menu",
      test: {},
      displayResultTest: false
    });
  };

  recordNewSession = (userId: string) => {
    const sessionId = firebase
      .database()
      .ref()
      .child("sessions")
      .push().key;
    this.sessionRef = firebase
      .database()
      .ref(`/sessions/${userId}/${sessionId}`);
    this.sessionRef.child("start_time").set(new Date().getTime());
    this.sessionRef.child("score").set(200);
    this.sessionRef.child("student_name").set(this.studentName);
  };

  render() {
    let displayed;
    const userId: string = localStorage.getItem("user_id") || "";
    if (this.state.view === "welcome_menu") {
      displayed = (
        <WelcomeMenu
          onClickStart={() => {
            this.setState({
              hasBeenWelcomed: true,
              view: this.state.isRegistered ? "training" : "registration_form"
            });
            if (this.state.isRegistered && userId) {
              this.recordNewSession(userId);
              firebase
                .database()
                .ref(`/users/${userId}/`)
                .once("value")
                .then(snapshot => {
                  console.log(snapshot.val());
                  this.setState({
                    genderTeacherMale: snapshot.val().gender === "male"
                  });
                });
            }
          }}
          studentName={this.studentName}
        />
      );
    } else if (this.state.view === "registration_form") {
      displayed = (
        <RegistrationForm
          onSubmit={newUserId => {
            this.recordNewSession(newUserId);
            firebase
              .database()
              .ref(`/users/${newUserId}/`)
              .once("value")
              .then(snapshot =>
                this.setState({
                  genderTeacherMale: snapshot.val().gender === "male"
                })
              );
            this.setState({ isRegistered: true, view: "training" });
          }}
        />
      );
    } else if (this.state.view === "leaderboard") {
      displayed = <Leaderboard />;
    } else if (this.state.view === "stats") {
      displayed = <Stats />;
    } else if (this.state.view === "history") {
      displayed = (
        <SessionHistory
          studentName={this.studentName}
          sessionRef={this.sessionRef}
          student={this.student}
          genderTeacherMale={this.state.genderTeacherMale}
        />
      );
    } else if (this.state.view === "training") {
      if (!this.state.hasChosenActivityType) {
        displayed = (
          <ChooseActivity
            sessionRef={this.sessionRef}
            onClickExample={() => {
              if (this.state.score + scoreCost.example >= 0) {
                this.setState({
                  hasChosenActivityType: true,
                  hasChosenActivity: "example"
                });
              } else {
                this.setState({ openSnackbar: true });
              }
            }}
            onClickExercise={() => {
              if (this.state.score + scoreCost.exercise >= 0) {
                this.setState({
                  hasChosenActivityType: true,
                  hasChosenActivity: "exercise"
                });
              } else {
                this.setState({ openSnackbar: true });
              }
            }}
            onClickLesson={() => {
              if (this.state.score + scoreCost.lesson >= 0) {
                this.setState({
                  hasChosenActivityType: true,
                  hasChosenActivity: "lesson"
                });
              } else {
                this.setState({ openSnackbar: true });
              }
            }}
            onConfirmTestDialog={this.runTest}
            alreadyShownRules={this.state.alreadyShownRules}
            hasShownRules={() => this.setState({ alreadyShownRules: true })}
          />
        );
      } else if (this.state.hasChosenActivityType) {
        if (this.state.hasChosenActivity === "example") {
          displayed = (
            <TrainWithExample
              getBackToMenu={() =>
                this.setState({ hasChosenActivityType: false })
              }
              updateScore={() => this.updateScore(scoreCost.example)}
              student={this.student}
              sessionRef={this.sessionRef}
              genderTeacherMale={this.state.genderTeacherMale}
            />
          );
        } else if (this.state.hasChosenActivity === "exercise") {
          displayed = (
            <TrainWithExercises
              getBackToMenu={() =>
                this.setState({ hasChosenActivityType: false })
              }
              updateScore={() => this.updateScore(scoreCost.exercise)}
              student={this.student}
              sessionRef={this.sessionRef}
              genderTeacherMale={this.state.genderTeacherMale}
            />
          );
        } else if (this.state.hasChosenActivity === "lesson") {
          displayed = (
            <TrainWithLesson
              getBackToMenu={() =>
                this.setState({ hasChosenActivityType: false })
              }
              updateScore={() => this.updateScore(scoreCost.lesson)}
              student={this.student}
              sessionRef={this.sessionRef}
            />
          );
        } else if (this.state.hasChosenActivity === "test") {
          displayed = (
            <TestStudent
              startNewGame={this.startNewGame}
              student={this.student}
              finalScore={this.finalScore}
              activityScore={this.activityScore}
              test={this.state.test}
              studentName={this.studentName}
              gridScores={gridScores}
              updateScore={() =>
                this.setState({
                  score: this.finalScore,
                  scoreDisplayed: String(this.finalScore)
                })
              }
              displayResultTest={this.state.displayResultTest}
              hasSeenQuestionsTest={() =>
                this.setState({ displayResultTest: true })
              }
            />
          );
        }
      }
    }
    return (
      <IntlProvider
        locale={this.state.language}
        messages={messages[this.state.language]}
      >
        <MuiThemeProvider theme={theme}>
          <AppDrawer
            hasBeenWelcomed={this.state.hasBeenWelcomed}
            isRegistered={this.state.isRegistered}
            startNewGame={this.startNewGame}
            onUnregister={() => {
              this.startNewGame();
              localStorage.removeItem("user_id");
              localStorage.removeItem("username");
              this.setState({
                isRegistered: false,
                alreadyShownRules: false
              });
            }}
            scoreDisplayed={this.state.scoreDisplayed}
            changeView={view => this.setState({ view })}
            testStarted={this.state.hasChosenActivity === "test"}
            mainContent={displayed}
            changeLanguage={language => {
              localStorage.setItem("lang", language);
              this.setState({ language });
            }}
            studentName={this.studentName}
          />
          <NotEnoughPointsSnackbar
            open={this.state.openSnackbar}
            handleClose={() => this.setState({ openSnackbar: false })}
          />
        </MuiThemeProvider>
      </IntlProvider>
    );
  }
}

export default App;
