import React from 'react'

import ChooseExercise from './ChooseExercise'
import ShowExercise from './ShowExercise'
import PropTypes from 'prop-types'

import parallelogramData from '../ParallelogramData'

class TrainWithExercise extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      index: 0,
      hasChosenExercise: false
    }
  }

  handleSelectExercise = (index) => {
    this.setState({hasChosenExercise: true, index: index})
  }

  getBackToExercise = () => {
    this.setState({hasChosenExercise: false})
  }

  render () {
    if (!this.state.hasChosenExercise) {
      return (
        <ChooseExercise
          onSelectExercise={this.handleSelectExercise}
          onBackNavigation={this.props.getBackToMenu}
        />
      )
    } else {
      return (
        <ShowExercise
          parallelogram={parallelogramData[this.state.index]}
          getBackToMenu={this.props.getBackToMenu}
          updateScore={this.props.updateScore}
          student={this.props.student}
        />
      )
    }
  }
}

TrainWithExercise.propTypes = {
  getBackToMenu: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired
}

export default TrainWithExercise
