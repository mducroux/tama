import React, { Component } from 'react'
import RegistrationForm from './RegistrationForm'
import TrainingTypeButton from './Training/ChooseTraining'
import TrainWithExamples from './Training/TrainWithExamples'
import TrainWithExercises from './Training/TrainWithExercises'
import AppBarMenu from './AppBarMenu'

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
      isRegistered: localStorage.getItem('username') !== '',
      hasChosenTrainingType: false,
      hasChosenExampleTrainingType: false
    }
  }

  render () {
    const { classes } = this.props
    let displayed
    if (!this.state.isRegistered) {
      displayed = <RegistrationForm onSubmit={(username) => {
        this.setState({isRegistered: true})
        localStorage.setItem('username', username)
      }}/>
    } else if (!this.state.hasChosenTrainingType) {
      displayed = <TrainingTypeButton
        onClickExample={() => this.setState({
          hasChosenTrainingType: true, hasChosenExampleTrainingType: true})
        }
        onClickExercise={() => this.setState({
          hasChosenTrainingType: true, hasChosenExampleTrainingType: false})
        }
      />
    } else if (this.state.hasChosenTrainingType) {
      if (this.state.hasChosenExampleTrainingType) {
        displayed = <TrainWithExamples
          getBackToMenu={() => this.setState({
            hasChosenTrainingType: false})
          }
        />
      } else {
        displayed = <TrainWithExercises
          getBackToMenu={() => this.setState({
            hasChosenTrainingType: false})
          }
        />
      }
    }
    return (
      <div className={classes.root}>
        <AppBarMenu
          isRegistered={this.state.isRegistered}
          onLogout={() => {
            localStorage.clear('username')
            this.setState({
              isRegistered: false, hasChosenTrainingType: false, hasChosenExampleTrainingType: false
            })
          }}
        />
        <div>
          {displayed}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(App)
