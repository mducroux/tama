import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Gallery from 'react-grid-gallery'
import IconButton from '@material-ui/core/IconButton'
import BackNavigation from '@material-ui/icons/ArrowBack'
import Typography from '@material-ui/core/Typography'

import tileData from '../../tileData'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden'
  },
  button: {
    margin: theme.spacing.unit * 3
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, ' +
      'rgba(0,0,0,0.05) 60%, rgba(0,0,0,0) 100%)'
  },
  gallery: {
    display: 'block',
    minHeight: '1px',
    width: '100%',
    border: '1px solid #ddd',
    overflow: 'auto'
  },
  title: {
    display: 'flex',
    alignItems: 'center'
  }
})

class ChooseExercise extends React.Component {
  onSelectItems = (index, event, itemType) => {
    this.props.onSelectExercise(itemType, index)
  }

  handleBackNavigation = () => {
    this.props.onBackNavigation()
  }

  render () {
    const { classes } = this.props
    return (
      <div>
        <div className={classes.root}>
          <IconButton className={classes.button} onClick={this.handleBackNavigation} color='inherit'>
            <BackNavigation />
          </IconButton>
          <Typography variant='headline' className={classes.title}>
            Choisissez une forme
          </Typography>
        </div>
        <div className={classes.gallery}>
          <Gallery
            images={tileData['positiveItems']}
            onClickThumbnail={(i, e) =>
              this.onSelectItems(i, e, 'positiveItems')
            }
          />
        </div>
        <div className={classes.gallery}>
          <Gallery
            images={tileData['negativeItems']}
            onClickThumbnail={(i, e) =>
              this.onSelectItems(i, e, 'negativeItems')
            }
          />
        </div>
      </div>
    )
  }
}

ChooseExercise.propTypes = {
  classes: PropTypes.object.isRequired,
  onSelectExercise: PropTypes.func.isRequired,
  onBackNavigation: PropTypes.func.isRequired
}

export default withStyles(styles)(ChooseExercise)
