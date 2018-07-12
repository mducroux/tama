import React from 'react'

import ChooseLesson from './ChooseLesson'
import ShowLesson from './ShowLesson'
import PropTypes from 'prop-types'

import lesson from './Lesson'

class TrainWithLesson extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      index: -1,
      hasChosenLesson: false
    }
  }

  handleSubmit = (index) => {
    this.setState({index: index, hasChosenLesson: true})
  }

  render () {
    if (!this.state.hasChosenLesson) {
      return (
        <ChooseLesson
          onSubmit={this.handleSubmit}
          onBackNavigation={this.props.getBackToMenu}
        />
      )
    } else {
      return (
        <ShowLesson
          lesson={lesson[this.state.index]}
          getBackToMenu={this.props.getBackToMenu}
          levelUpStudent={this.props.levelUpStudent}
        />
      )
    }
  }
}

TrainWithLesson.propTypes = {
  getBackToMenu: PropTypes.func.isRequired,
  levelUpStudent: PropTypes.func.isRequired
}

export default TrainWithLesson
