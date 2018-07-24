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
    this.newActivityRef = this.props.sessionRef.child('activities').push()
  }

  handleSelectExercise = (index) => {
    this.setState({hasChosenExercise: true, index})
  }

  recordExerciseActivity = (userAnswer, studentAnswer) => {
    const parallelogramTitle = (parallelogramData[this.state.index].src).split('/')
    this.newActivityRef.child('/item_exercise').set(parallelogramTitle[parallelogramTitle.length - 1])
    this.newActivityRef.child('/activity_type').set('exercise')
    this.newActivityRef.child('/knowledge').set(this.props.student.knowledgeParallelograms)
    this.newActivityRef.child('/student_answer').set(studentAnswer)
    this.newActivityRef.child('/user_answer').set(userAnswer)
  }

  render () {
    if (!this.state.hasChosenExercise) {
      return (
        <ChooseExercise
          onSelectExercise={this.handleSelectExercise}
          onNavigationBackToMenu={this.props.getBackToMenu}
        />
      )
    } 
      return (
        <ShowExercise
          parallelogram={parallelogramData[this.state.index]}
          getBackToMenu={this.props.getBackToMenu}
          updateScore={this.props.updateScore}
          student={this.props.student}
          recordExerciseActivity={(userAnswer, studentAnswer) => this.recordExerciseActivity(userAnswer, studentAnswer)}
        />
      )
    
  }
}

TrainWithExercise.propTypes = {
  getBackToMenu: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
  sessionRef: PropTypes.isRequired
}

export default TrainWithExercise
