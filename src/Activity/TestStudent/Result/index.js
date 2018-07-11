import React from 'react'

import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
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
    top: '30%',
    left: '35%',
    transform: 'translate(-50%, -50%)'
  },
  textGrade: {
    position: 'absolute',
    top: '50%',
    left: '35%',
    transform: 'translate(-50%, -50%)'
  }
})

class Result extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <div>
        <Grid container justify="center" className={classes.root}>
          <Grid item>
            <Grid container justify="center">
              <div className={classes.group}>
                <img src="images/diploma.jpg" alt="Diploma" width="400" height="300"/>
                <div className={classes.textImage}>Votre élève a obtenu </div>
                <div className={classes.textGrade}>{this.props.grade} / {this.props.numberOfQuestions}</div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

Result.propTypes = {
  classes: PropTypes.object.isRequired,
  grade: PropTypes.number.isRequired,
  numberOfQuestions: PropTypes.number.isRequired
}

export default withStyles(styles)(Result)
