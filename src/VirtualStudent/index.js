import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  group: {
    position: 'relative'
  },
  textImage: {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center'
  }
})

class VirtualStudent extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <div>
        <div className={classes.group}>
          <img
            src={'images/virtual_student/bubble.jpg'}
            width="200"
            height="150"
            alt="bubble"
          />
          <div className={classes.textImage}>{this.props.bubbleText}</div>
        </div>
        <div>
          <img
            src={'images/virtual_student/student.jpg'}
            width="200"
            height="200"
            alt="virtual_student"
          />
        </div>
      </div>
    )
  }
}

VirtualStudent.propTypes = {
  classes: PropTypes.object.isRequired,
  bubbleText: PropTypes.string.isRequired
}

export default withStyles(styles)(VirtualStudent)
