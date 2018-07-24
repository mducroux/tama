import React from 'react'

import PropTypes from 'prop-types'

import ChooseLesson from './ChooseLesson'
import ShowLesson from './ShowLesson'
import lesson from './Lesson'

class TrainWithLesson extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: -1,
      hasChosenLesson: false
    }
    this.newActivityRef = this.props.sessionRef.child('activities').push()
  }

  handleSubmit = (index) => {
    this.setState({ index, hasChosenLesson: true })
  }

  recordLessonActivity = () => {
    this.newActivityRef.child('/activity_type').set('lesson')
    this.newActivityRef.child('/knowledge').set(this.props.student.knowledgeParallelogram)
    this.newActivityRef.child('/item_lesson').set(lesson[this.state.index].title)
  }

  render() {
    if (!this.state.hasChosenLesson) {
      return (
        <ChooseLesson
          onSubmit={this.handleSubmit}
          onNavigationBackToMenu={this.props.getBackToMenu}
        />
      )
    }
    return (
      <ShowLesson
        lesson={lesson[this.state.index]}
        getBackToMenu={this.props.getBackToMenu}
        updateScore={this.props.updateScore}
        student={this.props.student}
        recordLessonActivity={this.recordLessonActivity}
      />
    )

  }
}

TrainWithLesson.propTypes = {
  getBackToMenu: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
  sessionRef: PropTypes.isRequired
}

export default TrainWithLesson
