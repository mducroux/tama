import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
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
    this.state = {thinkingAboutIt: true, bubbleImage: '', choiceOrAnswer: ''}
  }

  handleClick = () => {
    this.props.getBackToExercise()
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
      bubbleImage = 'images/virtual_student/bubble_thinking.jpg'
    } else {
      if (Math.random() > 0.5) {
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
              <VirtualStudent bubbleImage={bubbleImage}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <Grid item>
            <Grid container justify="center">
              <img src={this.props.parallelogram} alt="parallelogram" width="300" height="300"/>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <Grid item>
            <Grid container justify="center">
              {!this.state.thinkingAboutIt && (
                <div>
                  <Grid container justify="center" spacing={40}>
                    <Grid item >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.handleClick()}
                      >
                        Vrai
                      </Button>
                    </Grid>
                    <Grid item >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.handleClick()}
                      >
                        Faux
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

ShowExamples.propTypes = {
  classes: PropTypes.object.isRequired,
  getBackToExercise: PropTypes.func.isRequired,
  parallelogram: PropTypes.string.isRequired
}

export default withStyles(styles)(ShowExamples)
