import React from "react";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Button from "@material-ui/core/Button";
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import UncheckIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import ListSubheader from '@material-ui/core/ListSubheader';

import tilePositiveExampleData from "./tilePositiveExampleData";
import tileNegativeExampleData from "./tileNegativeExampleData";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 450
  },
  button: {
    margin: theme.spacing.unit,
    height: '20px'
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, ' +
      'rgba(0,0,0,0.05) 60%, rgba(0,0,0,0) 100%)',
  },
});

class ExampleGridList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      positiveExamples: Array(6).fill(false),
      negativeExamples: Array(4).fill(false),
      numberOfElemLeft: 3,
    };
  }

  handleClickPositiveExamples(i) {
    if (this.state.numberOfElemLeft > 0 || this.state.positiveExamples[i]){
      const newPositiveExamples = this.state.positiveExamples.slice();
      newPositiveExamples[i] = !newPositiveExamples[i];
      const newNumberOfElemLeft = this.state.positiveExamples[i] ? this.state.numberOfElemLeft+1 : this.state.numberOfElemLeft-1;
      this.setState({positiveExamples: newPositiveExamples, numberOfElemLeft: newNumberOfElemLeft});
    }
  }

  handleClickNegativeExamples(i) {
    if (this.state.numberOfElemLeft > 0 || this.state.negativeExamples[i]){
      const newNegativeExamples = this.state.negativeExamples.slice();
      newNegativeExamples[i] = !newNegativeExamples[i];
      const newNumberOfElemLeft = this.state.negativeExamples[i] ? this.state.numberOfElemLeft+1 : this.state.numberOfElemLeft-1;
      this.setState({negativeExamples: newNegativeExamples, numberOfElemLeft: newNumberOfElemLeft});
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">Parallélogrammes</ListSubheader>
          </GridListTile>
          {tilePositiveExampleData.map((tile, index) => (
            <GridListTile key={tile.img}>
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                titlePosition="top"
                actionIcon={ 
                  <IconButton onClick={() => {this.handleClickPositiveExamples(index)}}>
                    {this.state.positiveExamples[index] ? <CheckIcon /> : <UncheckIcon />}
                  </IconButton>
                }
                actionPosition="right"
                className={classes.titleBar}
              />
            </GridListTile>
          ))}
        </GridList>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">Non parallélogrammes</ListSubheader>
          </GridListTile>
          {tileNegativeExampleData.map((tile, index) => (
            <GridListTile key={tile.img}>
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                titlePosition="top"
                actionIcon={ 
                  <IconButton onClick={() => this.handleClickNegativeExamples(index)}>
                    {this.state.negativeExamples[index] ? <CheckIcon /> : <UncheckIcon />}
                  </IconButton>
                }
                actionPosition="right"
                className={classes.titleBar}
              />
            </GridListTile>
          ))}
        </GridList>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Ok
        </Button>
        Choisissez {this.state.numberOfElemLeft} {this.state.numberOfElemLeft > 1 ? 'formes' : 'forme'}. 
      </div>
    );
  }
}

export default withStyles(styles)(ExampleGridList);
