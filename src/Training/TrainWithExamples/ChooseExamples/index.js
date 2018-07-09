import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Button from '@material-ui/core/Button'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import CheckBoxOutlineIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import ListSubheader from '@material-ui/core/ListSubheader'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

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
    if (this.state.numberOfExamplesLeft === 0) this.props.onSubmit()
  }

  displayGridList = (items) => {
    const { classes } = this.props
    return (
      tileData[items].map((tile, index) => (
        <GridListTile key={tile.img}>
          <img src={tile.img} alt={tile.title} />
          <GridListTileBar
            titlePosition="top"
            actionIcon={
              <IconButton onClick={() => this.handleClickExample(items, index)}>
                {this.props.examples[items][index] ? (
                  <CheckBoxIcon />
                ) : (
                  <CheckBoxOutlineIcon />
                )}
              </IconButton>
            }
            actionPosition="right"
            className={classes.titleBar}
          />
        </GridListTile>
      ))
    )
  }

  render () {
    const { classes } = this.props
    return (
      <div>
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid item>
              <Typography variant="headline" className={classes.title}>
                Choisissez {this.state.numberOfExamplesLeft}{' '}
                {this.state.numberOfExamplesLeft > 1 ? 'formes' : 'forme'} à montrer.
              </Typography>
            </Grid>
          </Grid>
        </div>
        <div className={classes.root}>
          <GridList cols={12}>
            <GridListTile key="Subheader" cols={12} style={{ height: 'auto' }}>
              <ListSubheader component="div">Parallélogrammes</ListSubheader>
            </GridListTile>
            {this.displayGridList('positiveItems')}
          </GridList>
        </div>
        <div className={classes.root}>
          <GridList cols={12}>
            <GridListTile key="Subheader" cols={12} style={{ height: 'auto' }}>
              <ListSubheader component="div">Non parallélogrammes</ListSubheader>
            </GridListTile>
            {this.displayGridList('negativeItems')}
          </GridList>
        </div>
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
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
