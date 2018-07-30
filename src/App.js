// @flow
import * as React from "react";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import deepOrange from "@material-ui/core/colors/deepOrange";
import { IntlProvider, addLocaleData, FormattedMessage } from "react-intl";
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
  history: Object[],
  language: string,
  studentName: string
};

class App extends React.Component<PropsT, StateT> {
  student: VirtualStudent;
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
      history: [],
      language:
        localStorage.getItem("lang") || navigator.language.split(/[-_]/)[0],
      studentName: ""
    };
    this.student = new QuickLearnerStudent();
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

  updateHistory(activityType: string, image: any) {
    this.setState(prevState => ({
      history: [
        ...prevState.history,
        {
          activityType,
          images: image ? [{ thumbnail: image.thumbnail }] : [],
          title: (
            <FormattedMessage
              id={`app.${activityType}`}
              defaultMessage={activityType}
            />
          )
        }
      ]
    }));
  }

  render() {
    let displayed;
    const userId: string = localStorage.getItem("user_id") || "anonymous";
    if (!this.state.hasBeenWelcomed) {
      displayed = (
        <WelcomeMenu
          onClickStart={studentName => {
            if (this.state.isRegistered) {
              const newSession = firebase
                .database()
                .ref(`/sessions/${userId}`)
                .push().key;
              this.sessionRef = firebase
                .database()
                .ref(`/sessions/${userId}/${newSession}`);
              this.sessionRef.child("timestamp").set(new Date().getTime());
              this.sessionRef.child("score").set(200);
              this.sessionRef.child("student_name").set(studentName);
            }
            this.setState({
              hasBeenWelcomed: true,
              studentName
            });
          }}
          language={this.state.language}
        />
      );
    } else if (!this.state.isRegistered) {
      displayed = (
        <RegistrationForm
          onSubmit={newSession => {
            this.sessionRef = firebase
              .database()
              .ref(`/sessions/${userId}/${newSession}`);
            this.sessionRef.child("timestamp").set(new Date().getTime());
            this.sessionRef.child("score").set(200);
            this.sessionRef.child("student_name").set(this.state.studentName);
            this.setState({ isRegistered: true });
          }}
        />
      );
    } else if (this.state.view === "history") {
      displayed = (
        <SessionHistory
          history={this.state.history}
          studentName={this.state.studentName}
        />
      );
    } else if (!this.state.hasChosenActivityType) {
      displayed = (
        <ChooseActivity
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
          onConfirmTestDialog={() =>
            this.setState({
              hasChosenActivityType: true,
              hasChosenActivity: "test"
            })
          }
          history={this.state.history}
        />
      );
    } else if (this.state.hasChosenActivityType) {
      if (this.state.hasChosenActivity === "example") {
        displayed = (
          <TrainWithExamples
            getBackToMenu={() =>
              this.setState({ hasChosenActivityType: false })
            }
            updateHistory={image => this.updateHistory("example", image)}
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
            updateHistory={image => this.updateHistory("exercise", image)}
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
            updateHistory={() => this.updateHistory("lesson", null)}
            updateScore={() => this.updateScore(-50)}
            student={this.student}
            sessionRef={this.sessionRef}
          />
        );
      } else if (this.state.hasChosenActivity === "test") {
        displayed = (
          <TestStudent
            startNewGame={() => {
              this.student = new QuickLearnerStudent();
              this.setState({
                hasBeenWelcomed: false,
                hasChosenActivityType: false,
                hasChosenActivity: "",
                score: 200,
                scoreDisplayed: "200",
                history: []
              });
            }}
            updateScore={() => this.updateScore(50)}
            student={this.student}
            score={this.state.score}
            sessionRef={this.sessionRef}
            studentName={this.state.studentName}
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
            onLeaveSession={() => {
              this.student = new QuickLearnerStudent();
              this.setState({
                hasBeenWelcomed: false,
                hasChosenActivityType: false,
                hasChosenActivity: "",
                score: 200,
                scoreDisplayed: "200",
                history: []
              });
            }}
            onUnregister={() => {
              this.student = new QuickLearnerStudent();
              localStorage.removeItem("user_id");
              localStorage.removeItem("username");
              this.setState({
                isRegistered: false,
                hasBeenWelcomed: false,
                hasChosenActivityType: false,
                hasChosenActivity: "",
                score: 200,
                scoreDisplayed: "200",
                history: []
              });
            }}
            scoreDisplayed={this.state.scoreDisplayed}
            changeView={view => this.setState({ view })}
            mainContent={displayed}
            changeLanguage={language => {
              localStorage.setItem("lang", language);
              this.setState({ language });
            }}
            studentName={this.state.studentName}
          />
        </MuiThemeProvider>
      </IntlProvider>
    );
  }
}

export default App;
