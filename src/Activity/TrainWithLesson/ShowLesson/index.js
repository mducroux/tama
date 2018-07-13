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
    // void func(featureOfPara) => studentLearn(featureOfPara, answer)
    setTimeout(() => {
      this.props.updateScore()
      this.props.getBackToMenu()
    }, 3000)
  }

  render () {
    const { classes } = this.props

    let bubbleImage
    // bool func(featureOfPara) => studentKnowledge(featureOfPara)
    if (Math.random() > 0.5) {
      bubbleImage = 'images/virtual_student/bubble_know.jpg'
    } else {
      bubbleImage = 'images/virtual_student/bubble_dont_know.jpg'
    }

    return (
      <div>
        <Grid container justify="center" className={classes.root}>
          <div className={classes.group}>
            <img src="images/blackboard.jpg" alt="Blackboard" width="400" height="300"/>
            <div className={classes.textImage}>{this.props.lesson}</div>
          </div>
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <VirtualStudent bubbleImage={bubbleImage}/>
        </Grid>
      </div>
    )
  }
}

ShowLesson.propTypes = {
  classes: PropTypes.object.isRequired,
  getBackToMenu: PropTypes.func.isRequired,
  lesson: PropTypes.string.isRequired,
  updateScore: PropTypes.func.isRequired
}

export default withStyles(styles)(ShowLesson)
