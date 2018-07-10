import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import VirtualStudent from '../../VirtualStudent'
import PropTypes from 'prop-types'

const styles = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '10px'
  }
})

class ShowExamples extends React.Component {
  constructor (props) {
    super(props)
    this.state = {indexExample: 0, thinkingAboutIt: false, answer: '', bubbleImage: '', choiceOrAnswer: ''}
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

  handleClick = (key) => {
    if (this.state.indexExample < this.props.numberOfExamples) {
      this.setState({thinkingAboutIt: true, answer: key})
      setTimeout(() => {
        this.setState({thinkingAboutIt: false, indexExample: this.state.indexExample + 1})
      }, 200)
    }
  }

  render () {
    const { classes } = this.props

    if (this.state.indexExample === this.props.numberOfExamples) {
      this.props.getBackToMenu()
    }

    let bubbleImage
    if (this.state.thinkingAboutIt === true) {
      if (Math.random() > 0.5) {
        bubbleImage = 'images/virtual_student/bubble_know.jpg'
      } else {
        bubbleImage = 'images/virtual_student/bubble_dont_know.jpg'
      }
    } else {
      bubbleImage = 'images/virtual_student/bubble_question.jpg'
    }

    return (
      <div>
        <Grid container justify="center" className={classes.root}>
          <Grid item xs={12} sm={4} >
            <Grid container justify="center">
              <VirtualStudent bubbleImage={bubbleImage}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <Grid item xs={12} sm={4} >
            <Grid container justify="center">
              Exemple : {this.state.indexExample + 1} / 3
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <Grid item xs={12} sm={4} >
            <Grid container justify="center">
              <img src={this.props.parallelograms[this.state.indexExample]} alt="parallelogram" width="300" height="300"/>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <Grid item xs={12} sm={4} >
            <Grid container justify="center">
              {this.choiceOrAnswer()}
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

ShowExamples.propTypes = {
  classes: PropTypes.object.isRequired,
  numberOfExamples: PropTypes.number.isRequired,
  parallelograms: PropTypes.array.isRequired,
  getBackToMenu: PropTypes.func.isRequired
}

export default withStyles(styles)(ShowExamples)
