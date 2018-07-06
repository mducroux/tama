import React from "react";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Button from "@material-ui/core/Button";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import UncheckIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";

import tileData from "../../tileData";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
  },
  gridList: {
    width: 500,
    height: 500
  },
  button: {
    margin: theme.spacing.unit * 3,
    height: "20px"
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, " +
      "rgba(0,0,0,0.05) 60%, rgba(0,0,0,0) 100%)"
  },
  title: {
    margin: theme.spacing.unit * 3,
  }
});

class ChooseExamples extends React.Component {
  constructor(props){
    super(props);
    this.state = {numberOfExamplesLeft: this.props.numberOfExamples};
  }

  handleClickExample = (items, index) => {
    if (this.state.numberOfExamplesLeft > 0 || this.props.examples[items][index]){
      this.props.onClickExample(items, index);
      const newNumberOfElemLeft = this.props.examples[items][index] ? this.state.numberOfExamplesLeft-1 : this.state.numberOfExamplesLeft+1;
      this.setState({numberOfExamplesLeft: newNumberOfElemLeft});
    }
  }

  handleSubmit = () => {
    if (this.state.numberOfExamplesLeft === 0) this.props.onSubmit()
  }

  displayGridList = (items) => {
    const { classes } = this.props;
    return (
      tileData[items].map((tile, index) => (
        <GridListTile key={tile.img}>
          <img src={tile.img} alt={tile.title} />
          <GridListTileBar
            titlePosition="top"
            actionIcon={
              <IconButton onClick={() => this.handleClickExample(items, index)}>
                {this.props.examples[items][index] ? (
                  <CheckIcon />
                ) : (
                  <UncheckIcon />
                )}
              </IconButton>
            }
            actionPosition="right"
            className={classes.titleBar}
          />
        </GridListTile>
      ))
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.root}>
          <Typography variant="headline" className={classes.title}>
            Choisissez {this.state.numberOfExamplesLeft}{" "} 
            {this.state.numberOfExamplesLeft > 1 ? "formes" : "forme"}.
          </Typography>
        </div>
        <div className={classes.root}>
          <Grid container className={classes.root} justify="center" >
            <Grid item xs={12} sm={4}>
              <GridList cellHeight={180} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
                  <ListSubheader component="div">Parallélogrammes</ListSubheader>
                </GridListTile>
                {this.displayGridList('positiveItems')}
              </GridList>
            </Grid>
            <Grid item xs={12} sm={4}>
              <GridList cellHeight={180} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
                  <ListSubheader component="div">Non parallélogrammes</ListSubheader>
                </GridListTile>
                {this.displayGridList('negativeItems')}
              </GridList>
            </Grid>
          </Grid>
        </div>
        <div className={classes.root}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.handleSubmit}
          >
            Ok
          </Button>
        </div>
      </div>
    );
  }
};

export default withStyles(styles)(ChooseExamples);
