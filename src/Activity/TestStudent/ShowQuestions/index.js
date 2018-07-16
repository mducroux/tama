import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import VirtualStudent from '../../../VirtualStudent'
import PropTypes from 'prop-types'

const styles = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '25px'
  },
  title: {
    display: 'flex',
    alignItems: 'center'
  }
})

class ShowQuestions extends React.Component {
  constructor (props) {
    super(props)
    this.state = {thinkingAboutIt: true, bubbleImage: '', indexQuestion: 0, answer: false}
  }

  componentDidMount () {
    setTimeout(() => this.answerQuestion(), 2000)
  }

  answerQuestion () {
    var answer = this.props.student.thinkAboutAnswer(this.props.examQuestions[this.state.indexQuestion].featuresParallelogram)
    if (answer ? this.props.examQuestions[this.state.indexQuestion].valid : !this.props.examQuestions[this.state.indexQuestion].valid) {
      this.props.increaseGrade()
      this.props.updateScore()
      this.props.onAnswerQuestion(this.state.indexQuestion, true)
    } else {
      this.props.onAnswerQuestion(this.state.indexQuestion, false)
    }
    this.setState({
      thinkingAboutIt: false,
      answer: answer
    })
  }

  handleNextQuestion () {
    if (this.props.numberOfQuestions === this.state.indexQuestion + 1) {
      this.props.displayResultTest(this.state.grade)
    } else {
      this.setState({
        indexQuestion: this.state.indexQuestion + 1,
        thinkingAboutIt: true
      })
      setTimeout(() => this.answerQuestion(), 2000)
    }
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
          <Typography variant='title' className={classes.title}>
            Question {this.state.indexQuestion + 1} / {this.props.numberOfQuestions} : Est-ce un parallélogramme ?
          </Typography>
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <img src={this.props.examQuestions[this.state.indexQuestion].src} alt="parallelogram" width="300" height="300"/>
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <VirtualStudent bubbleImage={bubbleImage}/>
        </Grid>
        <Grid container justify="center" className={classes.root}>
          {!this.state.thinkingAboutIt &&
            <Button className={classes.button} onClick={() => this.handleNextQuestion()} color='primary' size='large'>
              {(this.props.numberOfQuestions !== this.state.indexQuestion + 1) ? 'Question suivante' : 'Voir le résultat'}
            </Button>}
        </Grid>
      </div>
    )
  }
}

ShowQuestions.propTypes = {
  classes: PropTypes.object.isRequired,
  displayResultTest: PropTypes.func.isRequired,
  numberOfQuestions: PropTypes.number.isRequired,
  examQuestions: PropTypes.array.isRequired,
  onAnswerQuestion: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
  increaseGrade: PropTypes.func.isRequired
}

export default withStyles(styles)(ShowQuestions)
