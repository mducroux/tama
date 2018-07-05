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

import tilePositiveExampleData from "../tilePositiveExampleData";
import tileNegativeExampleData from "../tileNegativeExampleData";

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
    height: "20px"
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, " +
      "rgba(0,0,0,0.05) 60%, rgba(0,0,0,0) 100%)"
  }
});

class ExampleGridList extends React.Component {
  constructor(props){
    super(props);
    this.state = {numberOfElemLeft: this.props.numberOfElem};
  }

  handleClickPositiveExample(i) {
    console.log(this.state)
    if (this.state.numberOfElemLeft > 0 || this.props.positiveExamples[i]){
      this.props.onClickPositiveExample(i);
      const newNumberOfElemLeft = this.props.positiveExamples[i] ? this.state.numberOfElemLeft+1 : this.state.numberOfElemLeft-1;
      this.setState({numberOfElemLeft: newNumberOfElemLeft});
    }
  }

  handleClickNegativeExample(i) {
    if (this.state.numberOfElemLeft > 0 || this.props.negativeExamples[i]){
      this.props.onClickNegativeExample(i);
      const newNumberOfElemLeft = this.props.negativeExamples[i] ? this.state.numberOfElemLeft+1 : this.state.numberOfElemLeft-1;
      this.setState({numberOfElemLeft: newNumberOfElemLeft});
    }
  }

  handleSubmit = () => {
    if (this.state.numberOfElemLeft === 0) this.props.onSubmit()
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">Parallélogrammes</ListSubheader>
          </GridListTile>
          {tilePositiveExampleData.map((tile, index) => (
            <GridListTile key={tile.img}>
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                titlePosition="top"
                actionIcon={
                  <IconButton onClick={() => this.handleClickPositiveExample(index)}>
                    {this.props.positiveExamples[index] ? (
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
          ))}
        </GridList>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">Non parallélogrammes</ListSubheader>
          </GridListTile>
          {tileNegativeExampleData.map((tile, index) => (
            <GridListTile key={tile.img}>
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                titlePosition="top"
                actionIcon={
                  <IconButton onClick={() => this.handleClickNegativeExample(index)}>
                    {this.props.negativeExamples[index] ? (
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
          ))}
        </GridList>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.handleSubmit}
        >
          Ok
        </Button>
        Choisissez {this.state.numberOfElemLeft}{" "}
        {this.state.numberOfElemLeft > 1 ? "formes" : "forme"}.
      </div>
    );
  }
};

export default withStyles(styles)(ExampleGridList);
