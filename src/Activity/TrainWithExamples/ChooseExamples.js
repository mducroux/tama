import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Gallery from "react-grid-gallery";
import IconButton from "@material-ui/core/IconButton";
import BackNavigation from "@material-ui/icons/ArrowBack";

import parallelogramData from "../ParallelogramData";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden"
  },
  button: {
    margin: theme.spacing.unit * 3
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, " +
      "rgba(0,0,0,0.05) 60%, rgba(0,0,0,0) 100%)"
  },
  gallery: {
    display: "block",
    minHeight: "1px",
    width: "100%",
    border: "1px solid #ddd",
    overflow: "hidden"
  },
  title: {
    display: "flex",
    alignItems: "center"
  }
});

const ChooseExamples = ({ onNavigationBackToMenu, onSelectExample, classes }) => (
  <div>
    <div className={classes.root}>
      <IconButton
        className={classes.button}
        onClick={onNavigationBackToMenu}
        color="inherit"
      >
        <BackNavigation />
      </IconButton>
      <Typography variant="headline" className={classes.title}>
        Choisit un exemple à montrer
        </Typography>
    </div>
    <div className={classes.gallery}>
      <Gallery
        images={parallelogramData}
        onClickThumbnail={onSelectExample}
      />
    </div>
  </div>
)

ChooseExamples.propTypes = {
  classes: PropTypes.object.isRequired,
  onSelectExample: PropTypes.func.isRequired,
  onNavigationBackToMenu: PropTypes.func.isRequired
};

export default withStyles(styles)(ChooseExamples);
