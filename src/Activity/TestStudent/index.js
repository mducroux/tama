import React from 'react'

import Result from './Result'
import ShowQuestions from './ShowQuestions'
import tileData from '../TileData'

class TrainWithExamples extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tookExam: false
    }
    this.numberOfQuestion = 5
    this.examQuestion = []
    this.setExamQuestion()
  }

  setExamQuestion = () => {
    for (var i = 0; i < this.numberOfQuestion; i++) {
      if (Math.random() > 0.5) {
        this.examQuestion.push(tileData['positiveItems'][Math.floor(Math.random() * (tileData['positiveItems']).length)].src)
      } else {
        this.examQuestion.push(tileData['negativeItems'][Math.floor(Math.random() * (tileData['negativeItems']).length)].src)
      }
    }
  }

  render () {
    if (!this.state.tookExam) {
      return (
        <ShowQuestions
          displayResult={() => this.setState({tookExam: true})}
          numberOfQuestion={this.numberOfQuestion}
          examQuestion={this.examQuestion}
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
