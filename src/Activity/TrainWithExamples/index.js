import React from 'react'

import ChooseExamples from './ChooseExamples'
import ShowExamples from './ShowExamples'
import PropTypes from 'prop-types'

import parallelogramData from '../ParallelogramData'

class TrainWithExamples extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      examples: {
        positiveItems: Array(parallelogramData['positiveItems'].length).fill(false),
        negativeItems: Array(parallelogramData['negativeItems'].length).fill(false)
      },
      hasChosenExamples: false
    }
    this.numberOfExamples = 3
  }

  handleClickExample = (items, index) => {
    const newExamples = this.state.examples
    newExamples[items][index] = !newExamples[items][index]
    this.setState({examples: newExamples})
  }

  getSelectedParallelograms = () => {
    var parallelograms = []
    for (let items in this.state.examples) {
      for (var ind = 0; ind < this.state.examples[items].length; ind++) {
        if (this.state.examples[items][ind]) {
          parallelograms.push(parallelogramData[items][ind].src)
        }
      }
    }
    return parallelograms
  }

  render () {
    if (!this.state.hasChosenExamples) {
      return (
        <ChooseExamples
          onSubmit={() => this.setState({hasChosenExamples: true})}
          onClickExample={this.handleClickExample}
          numberOfExamples={this.numberOfExamples}
          examples={this.state.examples}
          onBackNavigation={this.props.getBackToMenu}
        />
      )
    } else {
      return (
        <ShowExamples
          parallelograms={this.getSelectedParallelograms()}
          numberOfExamples={this.numberOfExamples}
          getBackToMenu={this.props.getBackToMenu}
        />
      )
    }
  }
}

TrainWithExamples.propTypes = {
  getBackToMenu: PropTypes.func.isRequired
}

export default TrainWithExamples