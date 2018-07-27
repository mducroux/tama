// @flow

import React from "react";

import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";

import nameData from "./NameData";

const styles = () => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "50px"
  },
  studentName: {
    textAlign: "center",
    alignSelf: "center"
  }
});

type PropsT = {
  language: string,
  classes: Object,
  onClickStart: () => void
};

type StateT = {
  firstName: string,
  lastName: string
};

class WelcomeMenu extends React.Component<PropsT, StateT> {
  constructor(props) {
    super(props);
    this.state = {
      firstName:
        nameData[this.props.language].firstNames[
          Math.floor(
            Math.random() * nameData[this.props.language].firstNames.length
          )
        ],
      lastName:
        nameData[this.props.language].lastNames[
          Math.floor(
            Math.random() * nameData[this.props.language].lastNames.length
          )
        ]
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container justify="center" className={classes.root}>
          <img src="images/logo.png" alt="logo" />
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <Typography className={classes.title} variant="title" color="inherit">
            <FormattedMessage
              id="welcomeMenu.descriptionApp"
              defaultMessage="Learn how a parallelogram looks like to your virtual student"
            />
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
          <Typography
            className={classes.studentName}
            variant="title"
            color="inherit"
          >
            <FormattedMessage
              id="welcomeMenu.studenName"
              defaultMessage="Student Name"
            />{" "}
            {this.state.firstName} {this.state.lastName}
          </Typography>
          <IconButton
            color="inherit"
            className={classes.studentName}
            onClick={() =>
              this.setState({
                firstName:
                  nameData[this.props.language].firstNames[
                    Math.floor(
                      Math.random() *
                        nameData[this.props.language].firstNames.length
                    )
                  ],
                lastName:
                  nameData[this.props.language].lastNames[
                    Math.floor(
                      Math.random() *
                        nameData[this.props.language].lastNames.length
                    )
                  ]
              })
            }
          >
            <RefreshIcon />
          </IconButton>
        </Grid>
        <Grid container justify="center" className={classes.root}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.props.onClickStart}
          >
            <FormattedMessage
              id="welcomeMenu.startPlaying"
              defaultMessage="Start playing"
            />
          </Button>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(WelcomeMenu);
