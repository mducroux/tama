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
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import blue from '@material-ui/core/colors/blue'
import deepOrange from '@material-ui/core/colors/deepOrange'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: deepOrange,
    background: '#f1f1f1'
  },
  status: {
    danger: 'red'
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
      <MuiThemeProvider theme={theme}>
        <AppBarMenu
          hasBeenWelcomed={this.state.hasBeenWelcomed}
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
          mainContent={displayed}
        />
      </MuiThemeProvider>
    )
  }
}

export default App
