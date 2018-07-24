import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import TestConfirmationDialog from './TestConfirmationDialog'

const styles = theme => ({
  root: {
    display: 'flex',
    marginTop: '15px'
  },
  test: {
    marginTop: '50px'
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
  button_test: {
    position: 'relative',
    height: 100,
    width: '75%',
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
    backgroundPosition: 'center 50%'
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
    learningCost: '10'
  },
  {
    url: 'images/exercise_512x512.png',
    title: 'Donner un exercice',
    learningCost: '30'
  },
  {
    url: 'images/lesson_512x512.png',
    title: 'Donner une leçon',
    learningCost: '50'
  }
]

class ChooseActivity extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      openTestDialog: false
    }
  }
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
        <Grid container className={classes.root} justify='center'>
          <Grid item sm={6}>
            <Grid container className={classes.root} justify='center'>
              <Typography variant="display1" color="inherit">
                Choisit une activité
              </Typography>
            </Grid>
          </Grid>
        </Grid>
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
                        {image.title} <br /> <br />- {image.learningCost} points
                      </Typography>
                    </span>
                  </ButtonBase>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.test} justify='flex-end' >
          <Grid item xs={12} sm={4}>
            <Grid container justify='center'>
              <ButtonBase
                className={classes.button_test}
                focusVisibleClassName={classes.focusVisible}
                onClick={() => this.setState({openTestDialog: true})}
              >
                <span
                  className={classes.imageSrc}
                  style={{
                    backgroundImage: `url(${'images/medal_300x100.png'})`
                  }}
                />
                <span className={classes.imageBackdrop} />
                <span className={classes.textButton}>
                  <Typography
                    component='span'
                    variant='title'
                    color='inherit'
                  >
                    {'Passer le test'}
                  </Typography>
                </span>
              </ButtonBase>
            </Grid>
          </Grid>
        </Grid>
        <TestConfirmationDialog
          onConfirmTestDialog={this.props.onConfirmTestDialog}
          openTestDialog={this.state.openTestDialog}
          onCloseTestDialog={() => this.setState({openTestDialog: false})}
        />
      </div>
    )
  }
}

ChooseActivity.propTypes = {
  classes: PropTypes.object.isRequired,
  onClickExample: PropTypes.func.isRequired,
  onClickExercise: PropTypes.func.isRequired,
  onClickLesson: PropTypes.func.isRequired,
  onConfirmTestDialog: PropTypes.func.isRequired
}

export default withStyles(styles)(ChooseActivity)
