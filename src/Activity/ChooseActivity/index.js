import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    display: 'flex',
    marginBottom: '50px'
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
    cost: '10'
  },
  {
    url: 'images/exercise_512x512.png',
    title: 'Donner un exercice',
    cost: '30'
  },
  {
    url: 'images/lesson_512x512.png',
    title: 'Donner une leçon',
    cost: '50'
  }
]

class ActivityTypeButton extends React.Component {
  handleButtonClick = (key) => {
    if (key === 'Montrer des exemples') {
      this.props.onClickExample()
    } else if (key === 'Donner un exercice') {
      this.props.onClickExercise()
    } else if (key === 'Donner une leçon') {
      this.props.onClickLesson()
    }
  }

  render () {
    const { classes } = this.props
    return (
      <div>
        <Grid container className={classes.root} justify='center' >
          <Grid item xs={12} sm={12}>
            <Grid
              container
              className={classes.root}
              justify='center'
              spacing={0}
            >
              {images.map(image => (
                <Grid item xs={12} sm={4} key={image.title}>
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
                        variant='title'
                        color='inherit'
                      >
                        {image.title} <br></br> <br></br>- {image.cost} points
                      </Typography>
                    </span>
                  </ButtonBase>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.root} justify='flex-end' >
          <Grid item xs={12} sm={2}>
            <IconButton onClick={() => this.props.onClickTest()}>
              <img src="images/medal_512x512.png" alt="test"/>
            </IconButton>
          </Grid>
        </Grid>
      </div>
    )
  }
}

ActivityTypeButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClickExample: PropTypes.func.isRequired,
  onClickExercise: PropTypes.func.isRequired,
  onClickLesson: PropTypes.func.isRequired,
  onClickTest: PropTypes.func.isRequired
}

export default withStyles(styles)(ActivityTypeButton)
