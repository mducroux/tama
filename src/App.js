import React, { Component } from 'react'
import RegistrationForm from './RegistrationForm'
import ChooseActivity from './Activity/ChooseActivity'
import TrainWithExamples from './Activity/TrainWithExamples'
import TrainWithExercises from './Activity/TrainWithExercises'
import TrainWithLesson from './Activity/TrainWithLesson'
import TestStudent from './Activity/TestStudent'
import AppBarMenu from './AppBarMenu'
import WelcomeMenu from './WelcomeMenu'
import SessionHistory from './SessionHistory'
import QuickLearnerStudent from './VirtualStudent/QuickLearnerStudent'

import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
})

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hasBeenWelcomed: false,
      isRegistered: !(!(localStorage.getItem('username'))),
      hasChosenActivityType: false,
      hasChosenActivity: '',
      view: 'training',
      score: 200,
      scoreDisplayed: '200',
      history: [
        {
          activityType: 'example',
          images: [
            {
              src: 'images/examples/parallelogram_b1.png',
              thumbnail: 'images/examples/parallelogram_b1.png',
              thumbnailWidth: 300,
              thumbnailHeight: 300,
              isSelected: false,
              itemType: 'parallelogram',
              valid: true,
              shapeFeatures: {
                hasThreeEdges: false,
                hasFourEdges: true,
                hasFiveEdges: false,
                hasSixEdges: false,
                hasSameLengthEdges: false,
                hasSameLengthEveryPairOppositeEdges: true,
                hasSameLengthOnePairOppositeEdges: true,
                hasEveryPairOppositeEdgesParallel: true,
                hasAtLeastOnePairOppositeEdgesParallel: true,
                isRed: false,
                isGreen: false,
                isBlue: true,
                isRotated: true,
                isThin: false,
                hasEveryRightAngles: false,
                hasAtLeastOneRightAngle: false
              }
            }
          ]
        },
        {
          activityType: 'exercise',
          images: []
        },
        {
          activityType: 'lesson',
          images: []
        }
      ]
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
    } else if (this.state.view === 'history') {
      displayed = <SessionHistory history={this.state.history} />
    } else if (this.state.view === 'training') {
      if (!this.state.hasChosenActivityType) {
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
            history={this.state.history}
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
              updateHistory={(images) =>
                this.setState(prevState => ({
                  history: [...prevState.history,
                    {
                      activityType: 'example',
                      images: images
                    }
                  ]
                }))
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
                localStorage.clear('username')
                this.student = new QuickLearnerStudent()
                this.setState({
                  hasBeenWelcomed: false,
                  isRegistered: false,
                  hasChosenActivityType: false,
                  hasChosenActivity: ''
                })
              }}
              updateScore={() => this.updateScore(+50)}
              student={this.student}
              score={this.state.score}
            />
          )
        }
      }
    }
    return (
      <div className={classes.root}>
        <AppBarMenu
          isRegistered={this.state.isRegistered}
          onLogout={() => {
            localStorage.clear('username')
            this.student = new QuickLearnerStudent()
            this.setState({
              hasBeenWelcomed: false,
              isRegistered: false,
              hasChosenActivityType: false,
              hasChosenActivity: ''
            })
          }}
          scoreDisplayed={this.state.scoreDisplayed}
          changeView={(view) => this.setState({view: view})}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {displayed}
        </main>
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(App)
