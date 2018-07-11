import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import VirtualStudent from '../../VirtualStudent'
import PropTypes from 'prop-types'

const styles = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '25px'
  }
})

class ShowQuestions extends React.Component {
  constructor (props) {
    super(props)
    this.state = {thinkingAboutIt: true, bubbleImage: '', indexQuestion: 0, score: 0, answer: false}
  }

  componentDidMount () {
    this.timerID = setInterval(
      () => this.state.thinkingAboutIt ? this.answerQuestion() : this.thinkingAboutQuestion(),
      2000
    )
  }

  answerQuestion () {
    var answer = Math.random() > 0.5
    var newScore = this.state.score
    console.log(answer)
    console.log(this.props.examQuestions[this.state.indexQuestion].valid)
    if (answer ? this.props.examQuestions[this.state.indexQuestion].valid : !this.props.examQuestions[this.state.indexQuestion].valid) {
      newScore = this.state.score + 1
    }
    this.setState({
      thinkingAboutIt: false,
      score: newScore,
      answer: answer
    })
  }

  thinkingAboutQuestion () {
    if (this.props.numberOfQuestions === this.state.indexQuestion + 1) {
      this.props.displayResultTest()
    } else {
      this.setState({
        indexQuestion: this.state.indexQuestion + 1,
        thinkingAboutIt: true
      })
    }
  }

  componentWillUnmount () {
    clearInterval(this.timerID)
  }

  render () {
    const { classes } = this.props

    let bubbleImage
    if (this.state.thinkingAboutIt === true) {
      bubbleImage = 'images/virtual_student/bubble_thinking.jpg'
    } else {
      if (this.state.answer === true) {
        bubbleImage = 'images/virtual_student/bubble_positive_answer.jpg'
      } else {
        bubbleImage = 'images/virtual_student/bubble_negative_answer.jpg'
      }
    }

    return (
      <div>
        <Grid container justify="center" className={classes.root}>
          <Grid item>
            <Grid container justify="center">
              <Typography variant='title'>
                Question {this.state.indexQuestion + 1} : Est-ce un parallélogramme ?
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <Grid item>
            <Grid container justify="center">
              <img src={this.props.examQuestions[this.state.indexQuestion].src} alt="parallelogram" width="300" height="300"/>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <Grid item>
            <Grid container justify="center">
              <VirtualStudent bubbleImage={bubbleImage}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <Grid item>
            <Grid container justify="center">
              <Typography variant='subheading'>
                Note : {this.state.score} / {this.props.numberOfQuestions}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

ShowQuestions.propTypes = {
  classes: PropTypes.object.isRequired,
  displayResultTest: PropTypes.func.isRequired,
  numberOfQuestions: PropTypes.number.isRequired,
  examQuestions: PropTypes.array.isRequired
}

export default withStyles(styles)(ShowQuestions)
