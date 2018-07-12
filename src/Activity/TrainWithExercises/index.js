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
          levelUpStudent={this.props.levelUpStudent}
        />
      )
    }
  }
}

TrainWithExercise.propTypes = {
  getBackToMenu: PropTypes.func.isRequired,
  levelUpStudent: PropTypes.func.isRequired
}

export default TrainWithExercise
