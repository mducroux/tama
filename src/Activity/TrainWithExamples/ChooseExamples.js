import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
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

class ChooseExamples extends React.Component {
  constructor(props) {
    super(props);
    this.state = { numberOfExamplesLeft: this.props.numberOfExamples };
  }

  onSelectItems = index => {
    if (this.state.numberOfExamplesLeft > 0 || this.props.examples[index]) {
      // const img = parallelogramData[index];
      // img.isSelected = !img.isSelected;
      this.props.onClickExample(index);
      const newNumberOfElemLeft = this.props.examples[index]
        ? this.state.numberOfExamplesLeft - 1
        : this.state.numberOfExamplesLeft + 1;
      this.setState({ numberOfExamplesLeft: newNumberOfElemLeft });
    }
  };

  handleSubmit = () => {
    if (this.state.numberOfExamplesLeft === 0) {
      this.props.onSubmit();
    }
  };

  handleBackNavigation = () => {
    this.props.onNavigationBackToMenu();
  };

  componentWillUnmount() {
    // this.props.examples.forEach(() => SET TO 0)
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.root}>
          <IconButton
            className={classes.button}
            onClick={this.handleBackNavigation}
            color="inherit"
          >
            <BackNavigation />
          </IconButton>
          <Typography variant="headline" className={classes.title}>
            Choisit {this.state.numberOfExamplesLeft}{" "}
            {this.state.numberOfExamplesLeft > 1 ? "formes" : "forme"} à montrer
          </Typography>
        </div>
        <div className={classes.gallery}>
          <Gallery
            images={parallelogramData.map((item, i) => ({
              ...item,
              isSelected: this.props.examples[i]
            }))}
            onClickThumbnail={this.onSelectItems}
          />
        </div>
        <div className={classes.root}>
          <Grid container justify="center">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.handleSubmit}
            >
              Ok
            </Button>
          </Grid>
        </div>
      </div>
    );
  }
}

ChooseExamples.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  examples: PropTypes.array.isRequired,
  onClickExample: PropTypes.func.isRequired,
  numberOfExamples: PropTypes.number.isRequired,
  onNavigationBackToMenu: PropTypes.func.isRequired
};

export default withStyles(styles)(ChooseExamples);
