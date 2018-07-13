import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import RadioListLesson from './RadioListLesson'
import IconButton from '@material-ui/core/IconButton'
import BackNavigation from '@material-ui/icons/ArrowBack'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden'
  },
  button: {
    margin: theme.spacing.unit * 3
  },
  title: {
    display: 'flex',
    alignItems: 'center'
  }
})

class TrainWithLesson extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      checked: -1
    }
  }

  render () {
    const { classes } = this.props
    return (
      <div>
        <div className={classes.root}>
          <IconButton className={classes.button} onClick={this.props.onBackNavigation} color='inherit'>
            <BackNavigation />
          </IconButton>
          <Typography variant='headline' className={classes.title}>
            Choisit une leçon à apprendre
          </Typography>
        </div>
        <div>
          <RadioListLesson
            onSelectLesson={(index) => this.setState({checked: index})}
            checked={this.state.checked}
          />
        </div>
        <div className={classes.root}>
          <Grid container justify='center'>
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              onClick={() => this.props.onSubmit(this.state.checked)}
            >
              Ok
            </Button>
          </Grid>
        </div>
      </div>
    )
  }
}

TrainWithLesson.propTypes = {
  classes: PropTypes.object.isRequired,
  onBackNavigation: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default withStyles(styles)(TrainWithLesson)
