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
          updateScore={this.props.updateScore}
          updateHistory={this.props.updateHistory}
          student={this.props.student}
        />
      )
    }
  }
}

TrainWithLesson.propTypes = {
  getBackToMenu: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired,
  updateHistory: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired
}

export default TrainWithLesson
