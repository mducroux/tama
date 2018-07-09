import React from 'react'
import PropTypes from 'prop-types'

const VirtualStudent = (props) => {
  return (
    <div>
      <div>
        <img
          src={props.bubbleImage}
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
  bubbleImage: PropTypes.string.isRequired
}

export default VirtualStudent
