import React from "react";

import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import BackNavigation from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import RadioListLesson from "./RadioListLesson";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden"
  },
  button: {
    margin: theme.spacing.unit * 3
  },
  title: {
    display: "flex",
    alignItems: "center"
  }
});

class TrainWithLesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: -1
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.root}>
          <IconButton
            className={classes.button}
            onClick={this.props.onNavigationBackToMenu}
            color="inherit"
          >
            <BackNavigation />
          </IconButton>
          <Typography variant="headline" className={classes.title}>
            <FormattedMessage
              id="chooseLesson.statement"
              defaultMessage="Choose a lesson to give"
            />
          </Typography>
        </div>
        <div>
          <RadioListLesson
            onSelectLesson={index => this.setState({ checked: index })}
            checked={this.state.checked}
          />
        </div>
        <div className={classes.root}>
          <Grid container justify="center">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => this.props.onSubmit(this.state.checked)}
            >
              Ok
            </Button>
          </Grid>
        </div>
      </div>
    );
  }
}

TrainWithLesson.propTypes = {
  classes: PropTypes.object.isRequired,
  onNavigationBackToMenu: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(TrainWithLesson);
