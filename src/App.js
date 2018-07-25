import React, { Component } from "react";


import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import deepOrange from '@material-ui/core/colors/deepOrange'

import firebase from "./firebase";
import RegistrationForm from "./RegistrationForm";
import ChooseActivity from "./Activity/ChooseActivity";
import TrainWithExamples from "./Activity/TrainWithExamples";
import TrainWithExercises from "./Activity/TrainWithExercises";
import TrainWithLesson from "./Activity/TrainWithLesson";
import TestStudent from "./Activity/TestStudent";
import WelcomeMenu from "./WelcomeMenu";
import QuickLearnerStudent from "./VirtualStudent/QuickLearnerStudent";
import AppDrawer from './AppDrawer'
import SessionHistory from './SessionHistory'


const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: deepOrange,
    background: {
      paper: '#fff',
      default: '#f1f1f1'
    }
  },
  status: {
    danger: 'red'
  }
})

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasBeenWelcomed: false,
      isRegistered: !!localStorage.getItem("user_id"),
      hasChosenActivityType: false,
      hasChosenActivity: "",
      score: 200,
      scoreDisplayed: "200"
    };
    this.student = new QuickLearnerStudent();
    console.log(this.student.knowledgeParallelogram);
  }

  updateScore = points => {
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
    const { classes } = this.props;
    let displayed;
    if (!this.state.hasBeenWelcomed) {
      displayed = (
        <WelcomeMenu
          onClickStart={() => {
            if (this.state.isRegistered) {
              const newSession = firebase
                .database()
                .ref(`/sessions/${localStorage.getItem("user_id")}`)
                .push().key;
              this.sessionRef = firebase
                .database()
                .ref(
                  `/sessions/${localStorage.getItem("user_id")}/${newSession}`
                );
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
              .ref(
                `/sessions/${localStorage.getItem("user_id")}/${newSession}`
              );
            this.sessionRef.child("timestamp").set(new Date().getTime());
            this.sessionRef.child("score").set(200);
            this.setState({ isRegistered: true });
          }}
        />
      )
    } else if (this.state.view === 'history') {
      displayed = <SessionHistory history={this.state.history} />
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
            startNewGame={() => {
              this.student = new QuickLearnerStudent();
              this.setState({
                hasBeenWelcomed: false,
                hasChosenActivityType: false,
                hasChosenActivity: "",
                score: 200,
                scoreDisplayed: "200"
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
              scoreDisplayed: "200"
            });
          }}
          onUnregister={() => {
            this.student = new QuickLearnerStudent();
            localStorage.clear("user_id");
            localStorage.clear("username");
            this.setState({
              isRegistered: false,
              hasBeenWelcomed: false,
              hasChosenActivityType: false,
              hasChosenActivity: "",
              score: 200,
              scoreDisplayed: "200"
            });
          }}
          scoreDisplayed={this.state.scoreDisplayed}
          changeView={(view) => this.setState({ view })}
          mainContent={displayed}
        />
      </MuiThemeProvider >
    )
  }
}

export default App
