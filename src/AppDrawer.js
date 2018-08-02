import React from "react";

import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SchoolIcon from "@material-ui/icons/School";
import HistoryIcon from "@material-ui/icons/Timeline";
import StatisticsIcon from "@material-ui/icons/InsertChart";
import LeaderboardIcon from "@material-ui/icons/FormatListNumbered";
import UnregisterIcon from "@material-ui/icons/ExitToApp";
import LeaveSessionIcon from "@material-ui/icons/BeachAccess";
import SettingsIcon from "@material-ui/icons/Settings";
import RulesIcon from "@material-ui/icons/Assignment";
import SettingsDialog from "./SidePanel/SettingsDialog";

const drawerWidth = 280;

const styles = theme => ({
  root: {
    flexGrow: 1
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
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  studentName: {
    marginLeft: theme.spacing.unit * 2
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  "content-left": {
    marginLeft: -drawerWidth
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
  }
});

class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openSettingsDialog: false
    };
    this.mainMenuListItems = (
      <div>
        <ListItem button onClick={() => this.props.changeView("training")}>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <FormattedMessage
                id="appDrawer.training"
                defaultMessage="Training"
              />
            }
          />
        </ListItem>
        <ListItem button onClick={() => this.props.changeView("history")}>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <FormattedMessage
                id="appDrawer.history"
                defaultMessage="History"
              />
            }
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <RulesIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <FormattedMessage id="appDrawer.rules" defaultMessage="Rules" />
            }
          />
        </ListItem>
      </div>
    );

    this.secondaryMenuListItems = (
      <div>
        <ListItem
          button
          onClick={() => this.props.changeView("stats")}
        >
          <ListItemIcon>
            <StatisticsIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <FormattedMessage
                id="appDrawer.stats"
                defaultMessage="My Statistics"
              />
            }
          />
        </ListItem>
        <ListItem button onClick={() => this.props.changeView("leaderboard")}>
          <ListItemIcon>
            <LeaderboardIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <FormattedMessage
                id="appDrawer.leaderboard"
                defaultMessage="Leaderboard"
              />
            }
          />
        </ListItem>
      </div>
    );
    this.tertiaryMenuListItems = (
      <div>
        <ListItem button onClick={this.handleLeaveSession}>
          <ListItemIcon>
            <LeaveSessionIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <FormattedMessage
                id="appDrawer.leaveSession"
                defaultMessage="Leave session"
              />
            }
          />
        </ListItem>
        <ListItem button onClick={this.handleUnregistrer}>
          <ListItemIcon>
            <UnregisterIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <FormattedMessage
                id="appDrawer.unregister"
                defaultMessage="Unregister"
              />
            }
          />
        </ListItem>
        <ListItem
          button
          onClick={() => this.setState({ openSettingsDialog: true })}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <FormattedMessage
                id="appDrawer.settings"
                defaultMessage="Settings"
              />
            }
          />
        </ListItem>
      </div>
    );
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleLeaveSession = () => {
    this.props.onLeaveSession();
  };

  handleUnregistrer = () => {
    this.props.onUnregister();
  };

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <Drawer
        variant="persistent"
        anchor="left"
        open={this.state.open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <Typography variant="title" className={classes.studentName}>
            {this.props.studentName}
          </Typography>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
                <ChevronLeftIcon />
              )}
          </IconButton>
        </div>
        <Divider />
        <List>{this.mainMenuListItems}</List>
        <Divider />
        <List>{this.secondaryMenuListItems}</List>
        <Divider />
        <List>{this.tertiaryMenuListItems}</List>
      </Drawer>
    );

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: this.state.open,
              [classes[`appBarShift-left`]]: this.state.open
            })}
          >
            <Toolbar disableGutters={!this.state.open}>
              {this.props.hasBeenWelcomed &&
                this.props.isRegistered && (
                  <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.handleDrawerOpen}
                    className={classNames(
                      classes.menuButton,
                      this.state.open && classes.hide
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
              {!this.props.hasBeenWelcomed && (
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
          {drawer}
          <main
            className={classNames(classes.content, classes[`content-left`], {
              [classes.contentShift]: this.state.open,
              [classes[`contentShift-left`]]: this.state.open
            })}
          >
            <div className={classes.drawerHeader} />
            {this.props.mainContent}
          </main>
        </div>
        <SettingsDialog
          openSettingsDialog={this.state.openSettingsDialog}
          onCloseSettingsDialog={() =>
            this.setState({ openSettingsDialog: false })
          }
          changeLanguage={this.props.changeLanguage}
        />
      </div>
    );
  }
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  hasBeenWelcomed: PropTypes.bool.isRequired,
  isRegistered: PropTypes.bool.isRequired,
  scoreDisplayed: PropTypes.string,
  changeView: PropTypes.func.isRequired,
  onUnregister: PropTypes.func.isRequired,
  onLeaveSession: PropTypes.func.isRequired,
  mainContent: PropTypes.object.isRequired,
  studentName: PropTypes.string.isRequired,
  changeLanguage: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(AppDrawer);
