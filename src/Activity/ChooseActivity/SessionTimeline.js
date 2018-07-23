import React from 'react'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepButton from '@material-ui/core/StepButton'
import PropTypes from 'prop-types'

class SessionTimeline extends React.Component {
  render () {
    const steps = this.props.history.map(elem => elem.activityType.charAt(0).toUpperCase() + elem.activityType.slice(1))

    return (
      <div >
        <Stepper alternativeLabel nonLinear activeStep={steps.length - 1}>
          {steps.map((label, index) => {
            const props = {}
            const buttonProps = {}
            return (
              <Step key={label} {...props}>
                <StepButton
                  {...buttonProps}
                >
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
  history: PropTypes.array.isRequired
}

export default SessionTimeline
