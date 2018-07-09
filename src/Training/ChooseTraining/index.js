import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  button: {
    position: 'relative',
    height: 512,
    width: '100%',
    '&:hover, &$focusVisible': {
      '& $imageBackdrop': {
        opacity: 0.15
      }
    }
  },
  focusVisible: {},
  textButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%'
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity')
  }
})

const images = [
  {
    url: 'images/example_512x512.png',
    title: 'Montrer des exemples',
    width: '50%'
  },
  {
    url: 'images/exercise_512x512.png',
    title: 'Donner un exercice',
    width: '50%'
  }
]

class TrainingTypeButton extends React.Component {
  handleButtonClick = (key) => { // eslint-disable-line
    if (key === 'Montrer des exemples') {
      this.props.onClickExample()
    } else {
      this.props.onClickExercise()
    }
  }

  render () {
    const { classes } = this.props
    return (
      <Grid container className={classes.root} justify='center' >
        <Grid item xs={12} sm={8}>
          <Grid
            container
            className={classes.root}
            justify='center'
            spacing={0}
          >
            {images.map(image => (
              <Grid item xs={12} sm={6} key={image.title}>
                <ButtonBase
                  className={classes.button}
                  focusVisibleClassName={classes.focusVisible}
                  onClick={() => this.handleButtonClick(image.title)}
                >
                  <span
                    className={classes.imageSrc}
                    style={{
                      backgroundImage: `url(${image.url})`
                    }}
                  />
                  <span className={classes.imageBackdrop} />
                  <span className={classes.textButton}>
                    <Typography
                      component='span'
                      variant='subheading'
                      color='inherit'
                    >
                      {image.title}
                    </Typography>
                  </span>
                </ButtonBase>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

TrainingTypeButton.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TrainingTypeButton)
