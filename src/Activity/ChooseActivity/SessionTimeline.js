import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepButton from '@material-ui/core/StepButton'
import PropTypes from 'prop-types'

const styles = theme => ({
  stepper: {
    backgroundColor: theme.palette.background.default
  }
})

class SessionTimeline extends React.Component {
  render () {
    const { classes } = this.props
    const steps = this.props.history.map(elem => elem.activityType.charAt(0).toUpperCase() + elem.activityType.slice(1))
    return (
      <div>
        <Stepper className={classes.stepper} alternativeLabel nonLinear activeStep={steps.length - 1}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepButton disabled={true}>
                  {label}
                </StepButton>
              </Step>
            )
          })}
        </Stepper>
      </div>
    )
  }
}

SessionTimeline.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.array.isRequired
}

export default withStyles(styles, { withTheme: true })(SessionTimeline)
