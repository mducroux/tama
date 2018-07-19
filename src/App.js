import React, { Component } from 'react'
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
      isRegistered: !(!(localStorage.getItem('username'))),
      hasChosenActivityType: false,
      hasChosenActivity: '',
      score: 200,
      scoreDisplayed: '200'
    }
    this.student = new QuickLearnerStudent()
    console.log(this.student.knowledgeParallelogram)
  }

  updateScore = (points) => {
    this.setState({score: this.state.score + points})
    if (points < 0) {
      this.setState({scoreDisplayed: this.state.scoreDisplayed + points})
    } else {
      this.setState({scoreDisplayed: this.state.scoreDisplayed + '+' + points})
    }
    setTimeout(() => { this.setState({scoreDisplayed: (this.state.score).toString()}) }, 2000)
  }

  render () {
    const { classes } = this.props
    let displayed
    if (!this.state.hasBeenWelcomed) {
      displayed = (
        <WelcomeMenu
          onClickStart={() =>
            this.setState({
              hasBeenWelcomed: true
            })
          }
        />
      )
    } else if (!this.state.isRegistered) {
      displayed = (
        <RegistrationForm
          onSubmit={username => {
            this.setState({ isRegistered: true })
            localStorage.setItem('username', username)
          }}
        />
      )
    } else if (!this.state.hasChosenActivityType) {
      displayed = (
        <ChooseActivity
          onClickExample={() =>
            this.setState({
              hasChosenActivityType: true,
              hasChosenActivity: 'example'
            })
          }
          onClickExercise={() =>
            this.setState({
              hasChosenActivityType: true,
              hasChosenActivity: 'exercise'
            })
          }
          onClickLesson={() =>
            this.setState({
              hasChosenActivityType: true,
              hasChosenActivity: 'lesson'
            })
          }
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
            getBackToMenu={() =>
              this.setState({
                hasChosenActivityType: false
              })
            }
            updateScore={() => this.updateScore(-10)}
            student={this.student}
          />
        )
      } else if (this.state.hasChosenActivity === 'exercise') {
        displayed = (
          <TrainWithExercises
            getBackToMenu={() =>
              this.setState({
                hasChosenActivityType: false
              })
            }
            updateScore={() => this.updateScore(-30)}
            student={this.student}
          />
        )
      } else if (this.state.hasChosenActivity === 'lesson') {
        displayed = (
          <TrainWithLesson
            getBackToMenu={() =>
              this.setState({
                hasChosenActivityType: false
              })
            }
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
