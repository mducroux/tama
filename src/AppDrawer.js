import React from "react";

import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import SidePanel from "./SidePanel";

const drawerWidth = 280;
const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100%"
  },
  appFrame: {
    height: "100%",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  appBar: {
    position: "absolute",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  "appBarShift-left": {
    marginLeft: drawerWidth
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  content: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: theme.palette.background.default,
    overflow: "auto",
    display: "flex",
    flexGrow: 1,
    flexDirection: "column"
  },
  "content-left": {
    marginLeft: -drawerWidth - 1
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  "contentShift-left": {
    marginLeft: 0
  },
  welcome: {
    flex: 1,
    marginLeft: theme.spacing.unit * 2
  },
  scoreDisplayed: {
    flex: 1,
    marginRight: theme.spacing.unit * 3,
    textAlign: "right"
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
    flex: "0 0 auto"
  }
});

class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openSidePanel: false
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: this.state.openSidePanel,
              [classes[`appBarShift-left`]]: this.state.openSidePanel
            })}
          >
            <Toolbar disableGutters={!this.state.openSidePanel}>
              {this.props.hasBeenWelcomed &&
                this.props.isRegistered && (
                  <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={() => this.setState({ openSidePanel: true })}
                    className={classNames(
                      classes.menuButton,
                      this.state.openSidePanel && classes.hide
                    )}
                  >
                    <MenuIcon />
                  </IconButton>
                )}
              <Typography
                variant="title"
                color="inherit"
                className={classes.welcome}
              >
                {!this.props.isRegistered ? (
                  <FormattedMessage
                    id="appDrawer.welcome"
                    defaultMessage="Welcome to Tama !"
                  />
                ) : (
                  <FormattedMessage
                    id="appDrawer.welcomeCustomized"
                    defaultMessage="Welcome {username} !"
                    values={{ username: localStorage.getItem("username") }}
                  />
                )}
              </Typography>
              {this.props.hasBeenWelcomed &&
                this.props.isRegistered && (
                  <Typography
                    variant="title"
                    color="inherit"
                    className={classes.scoreDisplayed}
                  >
                    <FormattedMessage
                      id="appDrawer.score"
                      defaultMessage="Your score:"
                    />{" "}
                    {this.props.scoreDisplayed}
                  </Typography>
                )}
              {(!this.props.hasBeenWelcomed || !this.props.isRegistered) && (
                <div>
                  <IconButton
                    onClick={() => this.props.changeLanguage("fr")}
                    color="inherit"
                    className={classes.flag}
                  >
                    <img
                      src="images/fr.svg"
                      alt="icon_french"
                      width="24px"
                      height="24px"
                    />
                  </IconButton>
                  <IconButton
                    onClick={() => this.props.changeLanguage("en")}
                    color="inherit"
                    className={classes.flag}
                  >
                    <img
                      src="images/en.svg"
                      alt="icon_english"
                      width="24px"
                      height="24px"
                    />
                  </IconButton>
                </div>
              )}
            </Toolbar>
          </AppBar>
          <SidePanel
            open={this.state.openSidePanel}
            changeLanguage={this.props.changeLanguage}
            studentName={this.props.studentName}
            onLeaveSession={this.props.onLeaveSession}
            onUnregister={this.props.onUnregister}
            changeView={this.props.changeView}
            handleSidePanelClose={() => this.setState({ openSidePanel: false })}
          />
          <main
            className={classNames(classes.content, classes[`content-left`], {
              [classes.contentShift]: this.state.openSidePanel,
              [classes[`contentShift-left`]]: this.state.openSidePanel
            })}
          >
            <div className={classes.drawerHeader} />
            {this.props.mainContent}
          </main>
        </div>
      </div>
    );
  }
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  hasBeenWelcomed: PropTypes.bool.isRequired,
  isRegistered: PropTypes.bool.isRequired,
  scoreDisplayed: PropTypes.string,
  mainContent: PropTypes.object.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  studentName: PropTypes.string.isRequired,
  changeView: PropTypes.func.isRequired,
  onUnregister: PropTypes.func.isRequired,
  onLeaveSession: PropTypes.func.isRequired
};

export default withStyles(styles)(AppDrawer);
