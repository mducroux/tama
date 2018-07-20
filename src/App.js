import React, { Component } from 'react'
import firebase from './firebase'
import RegistrationForm from './RegistrationForm'
import ChooseActivity from './Activity/ChooseActivity'
import TrainWithExamples from './Activity/TrainWithExamples'
import TrainWithExercises from './Activity/TrainWithExercises'
import TrainWithLesson from './Activity/TrainWithLesson'
import TestStudent from './Activity/TestStudent'
import AppBarMenu from './AppBarMenu'
import WelcomeMenu from './WelcomeMenu'
import QuickLearnerStudent from './VirtualStudent/QuickLearnerStudent'

import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hasBeenWelcomed: false,
      isRegistered: !(!(localStorage.getItem('user_id'))),
      hasChosenActivityType: false,
      hasChosenActivity: '',
      score: 200,
      scoreDisplayed: '200',
      sessionId: ''
    }
    this.student = new QuickLearnerStudent()
    console.log(this.student.knowledgeParallelogram)
  }

  updateScore = (points) => {
    this.sessionRef.update({score: this.state.score + points})
    this.setState({score: this.state.score + points})
    if (points < 0) {
      this.setState({scoreDisplayed: this.state.scoreDisplayed + points})
    } else {
      this.setState({scoreDisplayed: this.state.scoreDisplayed + '+' + points})
    }
    setTimeout(() => { this.setState({scoreDisplayed: (this.state.score).toString()}) }, 2000)
  }

  recordExampleActivity = (itemsTitle) => {
    var newActivity = this.sessionRef.child('activities').push().key
    this.sessionRef.child('activities/' + newActivity + '/activity_type').set('example')
    for (var i in itemsTitle) {
      this.sessionRef.child('activities/' + newActivity + '/item_example_' + i).set(itemsTitle[i])
    }
  }

  recordExerciseActivity = (itemTitle) => {
    var newActivity = this.sessionRef.child('activities').push().key
    this.sessionRef.child('activities/' + newActivity + '/activity_type').set('exercise')
    this.sessionRef.child('activities/' + newActivity + '/item_exercise').set(itemTitle)
  }

  recordLessonActivity = (itemTitle) => {
    var newActivity = this.sessionRef.child('activities').push().key
    this.sessionRef.child('activities/' + newActivity + '/activity_type').set('lesson')
    this.sessionRef.child('activities/' + newActivity + '/item_lesson').set(itemTitle)
  }

  recordTest = (itemsTitle, grade) => {
    for (var i in itemsTitle) {
      this.sessionRef.child('test/item_test_' + i).set(itemsTitle[i])
    }
    this.sessionRef.child('test/grade').set(grade)
  }

  render () {
    const { classes } = this.props
    let displayed
    if (!this.state.hasBeenWelcomed) {
      displayed = (
        <WelcomeMenu
          onClickStart={() => {
            if (this.state.isRegistered) {
              var newSession = firebase.database().ref('/sessions/' + localStorage.getItem('user_id')).push().key
              this.sessionRef = firebase.database().ref('/sessions/' + localStorage.getItem('user_id') + '/' + newSession)
              this.sessionRef.child('timestamp').set((new Date()).getTime())
              this.sessionRef.child('score').set(200)
              this.setState({sessionId: newSession})
            }
            this.setState({
              hasBeenWelcomed: true
            })
          }}
        />
      )
    } else if (!this.state.isRegistered) {
      displayed = (
        <RegistrationForm
          onSubmit={(newSession) => {
            this.sessionRef = firebase.database().ref('/sessions/' + localStorage.getItem('user_id') + '/' + newSession)
            this.sessionRef.child('timestamp').set((new Date()).getTime())
            this.sessionRef.child('score').set(200)
            this.setState({ isRegistered: true, sessionId: newSession })
          }}
        />
      )
    } else if (!this.state.hasChosenActivityType) {
      displayed = (
        <ChooseActivity
          onClickExample={() => {
            this.setState({
              hasChosenActivityType: true,
              hasChosenActivity: 'example'
            })
          }}
          onClickExercise={() => {
            this.setState({
              hasChosenActivityType: true,
              hasChosenActivity: 'exercise'
            })
          }}
          onClickLesson={() => {
            this.setState({
              hasChosenActivityType: true,
              hasChosenActivity: 'lesson'
            })
          }}
          onConfirmTestDialog={() =>
            this.setState({
              hasChosenActivityType: true,
              hasChosenActivity: 'test'
            })
          }
        />
      )
    } else if (this.state.hasChosenActivityType) {
      if (this.state.hasChosenActivity === 'example') {
        displayed = (
          <TrainWithExamples
            getBackToMenu={(parallelograms) => {
              this.setState({hasChosenActivityType: false})
              this.recordExampleActivity(parallelograms)
            }}
            updateScore={() => this.updateScore(-10)}
            student={this.student}
          />
        )
      } else if (this.state.hasChosenActivity === 'exercise') {
        displayed = (
          <TrainWithExercises
            getBackToMenu={(parallelogram) => {
              this.setState({hasChosenActivityType: false})
              this.recordExerciseActivity(parallelogram)
            }}
            updateScore={() => this.updateScore(-30)}
            student={this.student}
          />
        )
      } else if (this.state.hasChosenActivity === 'lesson') {
        displayed = (
          <TrainWithLesson
            getBackToMenu={(lesson) => {
              this.setState({hasChosenActivityType: false})
              this.recordLessonActivity(lesson)
            }}
            updateScore={() => this.updateScore(-50)}
            student={this.student}
          />
        )
      } else if (this.state.hasChosenActivity === 'test') {
        displayed = (
          <TestStudent
            startNewGame={() => {
              this.student = new QuickLearnerStudent()
              this.setState({
                hasBeenWelcomed: false,
                hasChosenActivityType: false,
                hasChosenActivity: '',
                score: 200,
                scoreDisplayed: '200'
              })
            }}
            updateScore={() => this.updateScore(+50)}
            student={this.student}
            score={this.state.score}
            recordTest={(itemsTitle, grade) => this.recordTest(itemsTitle, grade)}
          />
        )
      }
    }
    return (
      <div className={classes.root}>
        <AppBarMenu
          isRegistered={this.state.isRegistered}
          onLeaveSession={() => {
            this.student = new QuickLearnerStudent()
            this.setState({
              hasBeenWelcomed: false,
              hasChosenActivityType: false,
              hasChosenActivity: '',
              score: 200,
              scoreDisplayed: '200'
            })
          }}
          onUnregister={() => {
            this.student = new QuickLearnerStudent()
            localStorage.clear('user_id')
            localStorage.clear('username')
            this.setState({
              isRegistered: false,
              hasBeenWelcomed: false,
              hasChosenActivityType: false,
              hasChosenActivity: '',
              score: 200,
              scoreDisplayed: '200'
            })
          }}
          scoreDisplayed={this.state.scoreDisplayed}
        />
        <div>{displayed}</div>
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(App)
