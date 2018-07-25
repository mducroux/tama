import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import VirtualStudent from '../../../VirtualStudent'
import PropTypes from 'prop-types'

const styles = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '50px'
  },
  group: {
    position: 'relative'
  },
  textImage: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
})

class ShowLesson extends React.Component {
  componentDidMount () {
    this.props.student.learnLesson(this.props.lesson.shapeFeatures)
    setTimeout(() => {
      this.props.updateScore()
      this.props.updateHistory()
      this.props.getBackToMenu()
    }, 3000)
  }

  render () {
    const { classes } = this.props
    let bubbleText
    if (this.props.student.alreadyKnowLesson(this.props.lesson.shapeFeatures)) {
      bubbleText = this.props.student.feedbackLessonAlreadyKnow
    } else {
      bubbleText = this.props.student.feedbackLessonDidntKnow
    }

    return (
      <div>
        <Grid container justify="center" className={classes.root}>
          <div className={classes.group}>
            <img src="images/blackboard.jpg" alt="Blackboard" width="400" height="300"/>
            <div className={classes.textImage}>{this.props.lesson.title}</div>
          </div>
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <VirtualStudent bubbleText={bubbleText}/>
        </Grid>
      </div>
    )
  }
}

ShowLesson.propTypes = {
  classes: PropTypes.object.isRequired,
  getBackToMenu: PropTypes.func.isRequired,
  lesson: PropTypes.object.isRequired,
  updateScore: PropTypes.func.isRequired,
  updateHistory: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired
}

export default withStyles(styles)(ShowLesson)
