import React from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '50px'
  }
})

class HomeMenu extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <div>
        <Grid container justify="center" className={classes.root}>
          <Grid item>
            <Grid container justify="center">
              <img
                src={'images/logo.png'}
                alt="logo"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <Grid item>
            <Grid container justify="center">
              <Typography variant="title" color="inherit">
                Apprends de nouvelles choses à ton élève virtuel
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <Grid item>
            <Grid container justify="center">
              <img
                src={'images/virtual_student/student.jpg'}
                width="200"
                height="200"
                alt="virtual_student"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <Grid item>
            <Grid container justify="center">
              <Button
                variant="contained"
                color="primary"
                onClick={this.props.onClickStart}
              >
                Commencer à jouer
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

HomeMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  onClickStart: PropTypes.func.isRequired
}

export default withStyles(styles)(HomeMenu)
