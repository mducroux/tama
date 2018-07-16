import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import VirtualStudent from '../../../VirtualStudent'
import PropTypes from 'prop-types'

const styles = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '10px'
  }
})

class ShowExercise extends React.Component {
  constructor (props) {
    super(props)
    this.state = {thinkingAboutIt: true, bubbleImage: '', answerUser: ''}
  }

  handleClick = (answer) => {
    this.setState({answerUser: answer, thinkingAboutIt: true})
    this.props.student.studentLearn(this.props.parallelogram.featuresParallelogram, answer)
    setTimeout(() => {
      this.props.updateScore()
      this.props.getBackToMenu()
    }, 2000)
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({thinkingAboutIt: false})
    }, 2000)
  }

  render () {
    const { classes } = this.props

    let bubbleImage
    if (this.state.thinkingAboutIt === true) {
      if (!this.state.answerUser) {
        bubbleImage = 'images/virtual_student/bubble_thinking.jpg'
      } else {
        if (this.state.answerUser === 'true') {
          bubbleImage = 'images/virtual_student/bubble_happy.jpg'
        } else {
          bubbleImage = 'images/virtual_student/bubble_disappointed.jpg'
        }
      }
    } else {
      if (this.props.student.thinkAboutAnswer(this.props.parallelogram.featuresParallelogram)) {
        bubbleImage = 'images/virtual_student/bubble_positive_answer.jpg'
      } else {
        bubbleImage = 'images/virtual_student/bubble_negative_answer.jpg'
      }
    }

    return (
      <div>
        <Grid container justify="center" className={classes.root}>
          <VirtualStudent bubbleImage={bubbleImage}/>
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <img src={this.props.parallelogram.src} alt="parallelogram" width="300" height="300"/>
        </Grid>
        <Grid container justify="center" className={classes.root}>
          {!this.state.thinkingAboutIt && (
            <div>
              <Grid container justify="center" spacing={40}>
                <Grid item >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.handleClick('true')}
                  >
                    Vrai
                  </Button>
                </Grid>
                <Grid item >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.handleClick('false')}
                  >
                    Faux
                  </Button>
                </Grid>
              </Grid>
            </div>
          )}
        </Grid>
      </div>
    )
  }
}

ShowExercise.propTypes = {
  classes: PropTypes.object.isRequired,
  getBackToMenu: PropTypes.func.isRequired,
  parallelogram: PropTypes.object.isRequired,
  updateScore: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired
}

export default withStyles(styles)(ShowExercise)
