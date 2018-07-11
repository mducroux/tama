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
    // The number of questions should be less than the shortest length of the ParallelogramData arrays
    var positiveItemQuestion = parallelogramData['positiveItems'].sort(() => 0.5 - Math.random())
    var negativeItemQuestion = parallelogramData['negativeItems'].sort(() => 0.5 - Math.random())
    var numberOfPositiveItem = Math.floor(Math.random() * this.numberOfQuestions) + 1
    this.examQuestions = positiveItemQuestion.slice(0, numberOfPositiveItem, positiveItemQuestion.length)
    this.examQuestions = this.examQuestions.concat(negativeItemQuestion.slice(0, this.numberOfQuestions - numberOfPositiveItem))
    this.examQuestions = this.examQuestions.map(x => x.src)
    this.examQuestions = this.examQuestions.sort(() => 0.5 - Math.random())
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
