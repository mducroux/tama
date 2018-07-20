import React from 'react'

import ChooseExamples from './ChooseExamples'
import ShowExamples from './ShowExamples'
import PropTypes from 'prop-types'

import parallelogramData from '../ParallelogramData'

class TrainWithExamples extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      examples: Array(parallelogramData.length).fill(false),
      hasChosenExamples: false
    }
    this.numberOfExamples = 3
    this.newActivityRef = this.props.sessionRef.child('activities').push()
  }

  handleClickExample = (index) => {
    const newExamples = this.state.examples
    newExamples[index] = !newExamples[index]
    this.setState({examples: newExamples})
  }

  getSelectedParallelograms = () => {
    var parallelograms = []
    for (var ind = 0; ind < this.state.examples.length; ind++) {
      if (this.state.examples[ind]) {
        parallelograms.push(parallelogramData[ind])
      }
    }
    return parallelograms
  }

  recordExampleActivity = (userAnswer, indexExample) => {
    this.newActivityRef.child('/activity_type').set('example')
    var newSubActivityRef = this.newActivityRef.child('/example_' + indexExample)
    var parallelogramTitle = this.getSelectedParallelograms()[indexExample].src.split('/')
    var itemTitle = parallelogramTitle[parallelogramTitle.length - 1]
    newSubActivityRef.child('/item').set(itemTitle)
    newSubActivityRef.child('/knowledge').set(this.props.student.knowledgeParallelogram)
    newSubActivityRef.child('/user_answer').set(userAnswer)
  }

  render () {
    if (!this.state.hasChosenExamples) {
      return (
        <ChooseExamples
          onSubmit={() => this.setState({hasChosenExamples: true})}
          onClickExample={this.handleClickExample}
          numberOfExamples={this.numberOfExamples}
          examples={this.state.examples}
          onNavigationBackToMenu={this.props.getBackToMenu}
        />
      )
    } else {
      return (
        <ShowExamples
          parallelograms={this.getSelectedParallelograms()}
          numberOfExamples={this.numberOfExamples}
          getBackToMenu={this.props.getBackToMenu}
          updateScore={this.props.updateScore}
          student={this.props.student}
          recordExampleActivity={(userAnswer, indexExample) => this.recordExampleActivity(userAnswer, indexExample)}
        />
      )
    }
  }
}

TrainWithExamples.propTypes = {
  getBackToMenu: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
  sessionRef: PropTypes.isRequired
}

export default TrainWithExamples
