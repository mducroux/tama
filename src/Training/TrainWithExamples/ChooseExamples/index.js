import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import Gallery from 'react-grid-gallery'

import tileData from '../../tileData'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden'
  },
  button: {
    margin: theme.spacing.unit * 3,
    height: '20px'
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
    margin: theme.spacing.unit * 3
  }
})

class ChooseExamples extends React.Component {
  constructor (props) {
    super(props)
    this.state = {numberOfExamplesLeft: this.props.numberOfExamples}
  }

  handleClickExample = (items, index) => {
    if (this.state.numberOfExamplesLeft > 0 || this.props.examples[items][index]) {
      this.props.onClickExample(items, index)
      const newNumberOfElemLeft = this.props.examples[items][index] ? this.state.numberOfExamplesLeft - 1 : this.state.numberOfExamplesLeft + 1
      this.setState({numberOfExamplesLeft: newNumberOfElemLeft})
    }
  }

  handleSubmit = () => {
    tileData['positiveItems'].forEach(elem => { elem.isSelected = false })
    tileData['negativeItems'].forEach(elem => { elem.isSelected = false })
    if (this.state.numberOfExamplesLeft === 0) this.props.onSubmit()
  }

  onSelectItems = (index, event, itemType) => {
    if (this.state.numberOfExamplesLeft > 0 || this.props.examples[itemType][index]) {
      var img = tileData[itemType][index]
      img.isSelected = !img.isSelected
      this.props.onClickExample(itemType, index)
      const newNumberOfElemLeft = this.props.examples[itemType][index] ? this.state.numberOfExamplesLeft - 1 : this.state.numberOfExamplesLeft + 1
      this.setState({numberOfExamplesLeft: newNumberOfElemLeft})
    }
  }

  render () {
    const { classes } = this.props
    return (
      <div>
        <div className={classes.root}>
          <Grid container justify='center'>
            <Grid item>
              <Typography variant='headline' className={classes.title}>
                Choisissez {this.state.numberOfExamplesLeft}{' '}
                {this.state.numberOfExamplesLeft > 1 ? 'formes' : 'forme'}
              </Typography>
            </Grid>
          </Grid>
        </div>
        <div className={classes.gallery}>
          <Gallery
            images={tileData['positiveItems']}
            onClickThumbnail={(i, e) => this.onSelectItems(i, e, 'positiveItems')}
          />
        </div>
        <div className={classes.gallery}>
          <Gallery
            images={tileData['negativeItems']}
            onClickThumbnail={(i, e) => this.onSelectItems(i, e, 'negativeItems')}
          />
        </div>
        <div className={classes.root}>
          <Grid container justify='center'>
            <Grid item>
              <Button
                variant='contained'
                color='primary'
                className={classes.button}
                onClick={this.handleSubmit}
              >
                Ok
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
};

ChooseExamples.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  examples: PropTypes.object.isRequired,
  onClickExample: PropTypes.func.isRequired,
  numberOfExamples: PropTypes.number.isRequired
}

export default withStyles(styles)(ChooseExamples)
