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
import TrainWithExamples from "./Activity/TrainWithExamples";
import TrainWithExercises from "./Activity/TrainWithExercises";
import TrainWithLesson from "./Activity/TrainWithLesson";
import TestStudent from "./Activity/TestStudent";
import WelcomeMenu from "./WelcomeMenu";
import QuickLearnerStudent from "./VirtualStudent/QuickLearnerStudent";
import AppDrawer from "./AppDrawer";
import SessionHistory from "./SessionHistory";
import messagesFr from "./translations/fr.json";
import messagesEn from "./translations/en.json";
import type { VirtualStudent } from "./VirtualStudent/types";
import parallelogramData from "./Activity/ParallelogramData";
import nameData from "./NameData";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: deepOrange,
    background: {
      paper: "#fff",
      default: "#f1f1f1"
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
  alreadyShownRules: boolean
};

class App extends React.Component<PropsT, StateT> {
  student: VirtualStudent;
  studentName: string;
  sessionRef: Object;

  constructor(props: PropsT) {
    super(props);
    this.state = {
      hasBeenWelcomed: false,
      isRegistered: !!localStorage.getItem("user_id"),
      hasChosenActivityType: false,
      hasChosenActivity: "",
      view: "training",
      score: 200,
      scoreDisplayed: "200",
      language:
        localStorage.getItem("lang") || navigator.language.split(/[-_]/)[0],
      test: {},
      alreadyShownRules: false
    };
    this.student = new QuickLearnerStudent();
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
    const testScore = [0, 0, 0, 25, 50, 100, 200, 300, 500, 700, 1000][grade];
    const test = { questions, answers, grade, score: testScore };

    const testRef = this.sessionRef.child("test");
    testRef.set(test);
    this.sessionRef.child("finalScore/").set(testScore + this.state.score);

    this.setState({
      hasChosenActivityType: true,
      hasChosenActivity: "test",
      test
    });
  };

  startNewGame = () => {
    this.student = new QuickLearnerStudent();
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
    this.setState({
      hasBeenWelcomed: false,
      hasChosenActivityType: false,
      hasChosenActivity: "",
      score: 200,
      scoreDisplayed: "200",
      view: "training",
      test: {}
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
    if (!this.state.hasBeenWelcomed) {
      displayed = (
        <WelcomeMenu
          onClickStart={() => {
            this.setState({
              hasBeenWelcomed: true
            });
            if (this.state.isRegistered && userId) {
              this.recordNewSession(userId);
            }
          }}
          studentName={this.studentName}
        />
      );
    } else if (!this.state.isRegistered) {
      displayed = (
        <RegistrationForm
          onSubmit={newUserId => {
            this.recordNewSession(newUserId);
            this.setState({ isRegistered: true });
          }}
        />
      );
    } else if (this.state.view === "history") {
      displayed = (
        <SessionHistory
          studentName={this.studentName}
          sessionRef={this.sessionRef}
        />
      );
    } else if (!this.state.hasChosenActivityType) {
      displayed = (
        <ChooseActivity
          sessionRef={this.sessionRef}
          onClickExample={() => {
            this.setState({
              hasChosenActivityType: true,
              hasChosenActivity: "example"
            });
          }}
          onClickExercise={() => {
            this.setState({
              hasChosenActivityType: true,
              hasChosenActivity: "exercise"
            });
          }}
          onClickLesson={() => {
            this.setState({
              hasChosenActivityType: true,
              hasChosenActivity: "lesson"
            });
          }}
          onConfirmTestDialog={this.runTest}
          alreadyShownRules={this.state.alreadyShownRules}
          hasShownRules={() => this.setState({ alreadyShownRules: true })}
        />
      );
    } else if (this.state.hasChosenActivityType) {
      if (this.state.hasChosenActivity === "example") {
        displayed = (
          <TrainWithExamples
            getBackToMenu={() =>
              this.setState({ hasChosenActivityType: false })
            }
            updateScore={() => this.updateScore(-10)}
            student={this.student}
            sessionRef={this.sessionRef}
          />
        );
      } else if (this.state.hasChosenActivity === "exercise") {
        displayed = (
          <TrainWithExercises
            getBackToMenu={() =>
              this.setState({ hasChosenActivityType: false })
            }
            updateScore={() => this.updateScore(-30)}
            student={this.student}
            sessionRef={this.sessionRef}
          />
        );
      } else if (this.state.hasChosenActivity === "lesson") {
        displayed = (
          <TrainWithLesson
            getBackToMenu={() =>
              this.setState({ hasChosenActivityType: false })
            }
            updateScore={() => this.updateScore(-50)}
            student={this.student}
            sessionRef={this.sessionRef}
          />
        );
      } else if (this.state.hasChosenActivity === "test") {
        displayed = (
          <TestStudent
            startNewGame={this.startNewGame}
            student={this.student}
            score={this.state.score}
            test={this.state.test}
            studentName={this.studentName}
          />
        );
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
            onLeaveSession={this.startNewGame}
            onUnregister={() => {
              this.startNewGame();
              localStorage.removeItem("user_id");
              localStorage.removeItem("username");
              this.setState({
                isRegistered: false
              });
            }}
            scoreDisplayed={this.state.scoreDisplayed}
            changeView={view => this.setState({ view })}
            mainContent={displayed}
            changeLanguage={language => {
              localStorage.setItem("lang", language);
              this.setState({ language });
            }}
            studentName={this.studentName}
          />
        </MuiThemeProvider>
      </IntlProvider>
    );
  }
}

export default App;
