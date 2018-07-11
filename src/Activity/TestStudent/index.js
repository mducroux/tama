import React from 'react'

import Result from './Result'
import ShowQuestions from './ShowQuestions'
import parallelogramData from '../ParallelogramData'

class TrainWithExamples extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tookTest: false
    }
    this.numberOfQuestions = 5
    this.examQuestions = []
    this.setExamQuestion()
  }

  setExamQuestion = () => {
    // The number of questions should be less than the length of parallelogramData
    this.examQuestions = parallelogramData.sort(() => 0.5 - Math.random()) // shuffle array
    this.examQuestions = this.examQuestions.slice(0, this.numberOfQuestions)
    this.examQuestions = this.examQuestions.map(x => x.src)
  }

  render () {
    if (!this.state.tookTest) {
      return (
        <ShowQuestions
          displayResultTest={() => this.setState({tookTest: true})}
          numberOfQuestions={this.numberOfQuestions}
          examQuestions={this.examQuestions}
        />
      )
    } else {
      return (
        <Result
        />
      )
    }
  }
}

export default TrainWithExamples
