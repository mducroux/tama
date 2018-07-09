import React, { Component } from 'react'
import RegistrationForm from './RegistrationForm'
import TrainingTypeButton from './Training/ChooseTraining'
import TrainWithExamples from './Training/TrainWithExamples'

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'

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
      isRegistered: localStorage.getItem('username') != null,
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
            hasChosenTrainingType: false, hasChosenExampleTrainingType: false})
          }
        />
      } else {
        displayed = <textarea/>
      }
    }
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              {!this.state.isRegistered ? 'Welcome to Tama !' : 'Welcome back ' + localStorage.getItem('username') + ' !' }
            </Typography>
            {this.state.isRegistered && (
              <AccountCircle />
            )}
          </Toolbar>
        </AppBar>
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
