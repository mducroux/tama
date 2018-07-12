import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import VirtualStudent from '../../VirtualStudent'
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
    this.state = {thinkingAboutIt: true, bubbleImage: '', indexQuestion: 0, grade: 0, answer: false}
  }

  componentDidMount () {
    setTimeout(() => this.answerQuestion(), 2000)
  }

  answerQuestion () {
    var answer = Math.random() > 0.5
    var newGrade = this.state.grade
    if (answer ? this.props.examQuestions[this.state.indexQuestion].valid : !this.props.examQuestions[this.state.indexQuestion].valid) {
      newGrade = this.state.grade + 1
    }
    this.setState({
      thinkingAboutIt: false,
      grade: newGrade,
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
          <Grid item>
            <Grid container justify="center">
              <Typography variant='title' className={classes.title}>
                Question {this.state.indexQuestion + 1} / {this.props.numberOfQuestions} : Est-ce un parallélogramme ?
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
              <Typography variant='display1'>
                Note : {this.state.grade} / {this.props.numberOfQuestions}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <Grid item>
            <Grid container justify="center">
              {!this.state.thinkingAboutIt &&
                <Button className={classes.button} onClick={() => this.handleNextQuestion()} color='primary' size='large'>
                  {(this.props.numberOfQuestions !== this.state.indexQuestion + 1) ? 'Question suivante' : 'Voir le résultat'}
                </Button>}
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
