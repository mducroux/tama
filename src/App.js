// @flow

import * as React from "react";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import deepOrange from "@material-ui/core/colors/deepOrange";

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

type PropsT = {};

type StateT = {
  hasBeenWelcomed: boolean,
  isRegistered: boolean,
  hasChosenActivityType: boolean,
  hasChosenActivity: string,
  view: string,
  score: number,
  scoreDisplayed: string,
  history: Object[]
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
      history: []
    };
    this.student = new QuickLearnerStudent();
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

  render() {
    let displayed;
    const userId: string = localStorage.getItem("user_id") || "anonymous";
    if (!this.state.hasBeenWelcomed) {
      displayed = (
        <WelcomeMenu
          onClickStart={() => {
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
            }
            this.setState({
              hasBeenWelcomed: true
            });
          }}
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
            this.setState({ isRegistered: true });
          }}
        />
      );
    } else if (this.state.view === "history") {
      displayed = <SessionHistory history={this.state.history} />;
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
            updateHistory={images =>
              this.setState(prevState => ({
                history: [
                  ...prevState.history,
                  {
                    activityType: "example",
                    images
                  }
                ]
              }))
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
            updateHistory={images =>
              this.setState(prevState => ({
                history: [
                  ...prevState.history,
                  {
                    activityType: "exercise",
                    images: [images]
                  }
                ]
              }))
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
            updateHistory={() =>
              this.setState(prevState => ({
                history: [
                  ...prevState.history,
                  {
                    activityType: "lesson",
                    images: []
                  }
                ]
              }))
            }
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
          />
        );
      }
    }
    return (
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
        />
      </MuiThemeProvider>
    );
  }
}

export default App;
