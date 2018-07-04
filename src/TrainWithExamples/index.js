import React from "react";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import tileExampleData from "./tileExampleData";
import Button from "@material-ui/core/Button";
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import UncheckIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

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

function ExampleGridList(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        {tileExampleData.map(tile => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              titlePosition="top"
              actionIcon={
                <IconButton className={classes.icon}>
                  <UncheckIcon />
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
    </div>
  );
}

export default withStyles(styles)(ExampleGridList);
