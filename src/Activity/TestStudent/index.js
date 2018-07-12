import React from 'react'

import Result from './Result'
import ShowQuestions from './ShowQuestions'
import PropTypes from 'prop-types'
import parallelogramData from '../ParallelogramData'

class TestStudent extends React.Component {
  constructor (props) {
    super(props)
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
    this.correctAnswers = Array(this.numberOfQuestions).fill(false)
    this.state = {
      tookTest: false
    }
  }

  handleAnswerQuestion = (index, isCorrect) => {
    this.correctAnswers[index] = isCorrect
  }

  render () {
    if (!this.state.tookTest) {
      return (
        <ShowQuestions
          displayResultTest={(grade) => this.setState({tookTest: true, grade: grade})}
          numberOfQuestions={this.numberOfQuestions}
          examQuestions={this.examQuestions}
          onAnswerQuestion={(index, isCorrect) => this.handleAnswerQuestion(index, isCorrect)}
        />
      )
    } else {
      return (
        <Result
          grade={this.state.grade}
          numberOfQuestions={this.numberOfQuestions}
          examQuestions={this.examQuestions}
          correctAnswers={this.correctAnswers}
          startNewGame={this.props.startNewGame}
        />
      )
    }
  }
}

TestStudent.propTypes = {
  startNewGame: PropTypes.func.isRequired
}

export default TestStudent
