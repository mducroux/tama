import React from 'react'

import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Cancel from '@material-ui/icons/Cancel'
import CheckCircle from '@material-ui/icons/CheckCircle'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '75px'
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
  },
  finalScore: {
    textAlign: 'center'
  }
})

class Result extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <div>
        <Grid container justify="center" className={classes.root}>
          <div className={classes.group}>
            <img src="images/diploma.jpg" alt="Diploma" width="400" height="300"/>
            <div className={classes.textImage}>Votre élève a obtenu </div>
            <div className={classes.textGrade}>{this.props.grade} / {this.props.numberOfQuestions}</div>
          </div>
        </Grid>
        <Grid container justify="center" className={classes.root}>
          {this.props.examQuestions.map((img, index) =>
            <div key={img.src}>
              <img src={img.src} alt={img.src} width="200" height="200"/>
              {this.props.correctAnswers[index] ? <CheckCircle color="primary"/> : <Cancel color="error"/>}
            </div>
          )}
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <Typography variant='display1' className={classes.finalScore}>
            Votre score final : {localStorage.getItem('score')} points
          </Typography>
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.props.startNewGame()}
          >
            Recommencer une partie
          </Button>
        </Grid>
      </div>
    )
  }
}

Result.propTypes = {
  classes: PropTypes.object.isRequired,
  grade: PropTypes.number.isRequired,
  numberOfQuestions: PropTypes.number.isRequired,
  examQuestions: PropTypes.array.isRequired,
  correctAnswers: PropTypes.array.isRequired,
  startNewGame: PropTypes.func.isRequired
}

export default withStyles(styles)(Result)
