import React from 'react'

import ChooseExercise from './ChooseExercise'
import ShowExercise from './ShowExercise'
import PropTypes from 'prop-types'

import tileData from '../TileData'

class TrainWithExercise extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      itemType: '',
      index: 0,
      hasChosenExercise: false
    }
  }

  handleSelectExercise = (items, index) => {
    this.setState({hasChosenExercise: true, itemType: items, index: index})
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
          parallelograms={tileData[this.state.itemType][this.state.index].src}
          getBackToExercise={this.getBackToExercise}
        />
      )
    }
  }
}

TrainWithExercise.propTypes = {
  getBackToMenu: PropTypes.func.isRequired
}

export default TrainWithExercise
