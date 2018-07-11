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

  getBackToLesson = () => {
    this.setState({hasChosenLesson: false})
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
          getBackToLesson={this.getBackToLesson}
        />
      )
    }
  }
}

TrainWithLesson.propTypes = {
  getBackToMenu: PropTypes.func.isRequired
}

export default TrainWithLesson
