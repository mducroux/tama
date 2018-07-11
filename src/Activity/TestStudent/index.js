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
    try {
      if (this.numberOfQuestions > parallelogramData.length) {
        throw new Error('there are more questions than available parallelograms')
      }
    } catch (e) {
      throw e
    }
    this.examQuestions = parallelogramData.sort(() => 0.5 - Math.random()) // shuffle array
    this.examQuestions = this.examQuestions.slice(0, this.numberOfQuestions)
  }

  render () {
    if (!this.state.tookTest) {
      return (
        <ShowQuestions
          displayResultTest={(grade) => this.setState({tookTest: true, grade: grade})}
          numberOfQuestions={this.numberOfQuestions}
          examQuestions={this.examQuestions}
        />
      )
    } else {
      return (
        <Result
          grade={this.state.grade}
          numberOfQuestions={this.numberOfQuestions}
        />
      )
    }
  }
}

export default TrainWithExamples
