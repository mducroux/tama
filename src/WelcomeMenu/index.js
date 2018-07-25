import React from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "50px"
  },
  title: {
    textAlign: "center"
  }
});

const WelcomeMenu = ({ classes, onClickStart }) => (
  <div>
    <Grid container justify="center" className={classes.root}>
      <img src="images/logo.png" alt="logo" />
    </Grid>
    <Grid container justify="center" className={classes.root}>
      <Typography className={classes.title} variant="title" color="inherit">
        Apprends à reconnaître les parallélogrammes à ton élève virtuel
      </Typography>
    </Grid>
    <Grid container justify="center" className={classes.root}>
      <img
        src="images/virtual_student/student.jpg"
        width="200"
        height="200"
        alt="virtual_student"
      />
    </Grid>
    <Grid container justify="center" className={classes.root}>
      <Button variant="contained" color="primary" onClick={onClickStart}>
        Commencer à jouer
      </Button>
    </Grid>
  </div>
);

WelcomeMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  onClickStart: PropTypes.func.isRequired
};

export default withStyles(styles)(WelcomeMenu);
