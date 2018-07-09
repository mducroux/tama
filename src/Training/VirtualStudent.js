import React from 'react'
import PropTypes from 'prop-types'

const VirtualStudent = (props) => {
  const { classes } = props
  return (
    <div>
      <div>
        <img
          src={classes.bubbleImage}
          width="200"
          height="150"
          alt="bubble"
        />
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

VirtualStudent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default VirtualStudent
