import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import VirtualStudent from '../../../VirtualStudent'
import PropTypes from 'prop-types'

const styles = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '10px'
  },
  textImage: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
})

class ShowExamples extends React.Component {
  constructor (props) {
    super(props)
    this.state = {indexExample: 0, thinkingAboutIt: false, answer: ''}
  }

  choiceOrAnswer = () => {
    if (this.state.thinkingAboutIt === true) {
      return (
        <Typography variant="title">
          { this.state.answer }
        </Typography>
      )
    } else {
      return (
        <div>
          <Grid container justify="center" spacing={40}>
            <Grid item >
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.handleClick('OUI')}
              >
                Oui
              </Button>
            </Grid>
            <Grid item >
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.handleClick('NON')}
              >
                Non
              </Button>
            </Grid>
          </Grid>
        </div>
      )
    }
  }

  handleClick = (answer) => {
    if (this.state.indexExample < this.props.numberOfExamples) {
      this.setState({thinkingAboutIt: true, answer: answer})
      this.props.student.learn(this.props.parallelograms[this.state.indexExample].valid, this.props.parallelograms[this.state.indexExample].featuresParallelogram)
      setTimeout(() => {
        if (this.state.indexExample + 1 === this.props.numberOfExamples) {
          this.props.updateScore()
          this.props.getBackToMenu()
        } else {
          this.setState({thinkingAboutIt: false, indexExample: this.state.indexExample + 1})
        }
      }, 200)
    }
  }

  render () {
    const { classes } = this.props

    let bubbleText
    if (this.state.thinkingAboutIt === true) {
      bubbleText = this.props.student.thinkingAboutExample
    } else {
      bubbleText = this.props.student.questionExample
    }

    return (
      <div>
        <Grid container justify="center" className={classes.root}>
          <VirtualStudent bubbleText={bubbleText}/>
        </Grid>
        <Grid container justify="center" className={classes.root}>
              Exemple : {this.state.indexExample + 1} / 3
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <img src={this.props.parallelograms[this.state.indexExample].src} alt="parallelogram" width="300" height="300"/>
        </Grid>
        <Grid container justify="center" className={classes.root}>
          {this.choiceOrAnswer()}
        </Grid>
      </div>
    )
  }
}

ShowExamples.propTypes = {
  classes: PropTypes.object.isRequired,
  numberOfExamples: PropTypes.number.isRequired,
  parallelograms: PropTypes.array.isRequired,
  getBackToMenu: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired
}

export default withStyles(styles)(ShowExamples)
