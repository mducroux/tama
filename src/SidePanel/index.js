// @flow
import * as React from "react";

import Drawer from "@material-ui/core/Drawer";
import { FormattedMessage } from "react-intl";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import SchoolIcon from "@material-ui/icons/School";
import HistoryIcon from "@material-ui/icons/ShowChart";
import UnregisterIcon from "@material-ui/icons/ExitToApp";
import LeaveSessionIcon from "@material-ui/icons/BeachAccess";
import SettingsIcon from "@material-ui/icons/Settings";
import RulesIcon from "@material-ui/icons/Assignment";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import SettingsDialog from "./SettingsDialog";
import RulesDialog from "./RulesDialog";

type PropsT = {
  open: boolean,
  studentName: string,
  changeView: string => void,
  changeLanguage: string => void,
  theme: Object,
  classes: Object,
  onUnregister: void => void,
  onLeaveSession: void => void,
  handleSidePanelOpen: void => void,
  handleSidePanelClose: void => void
};

type StateT = {
  openSettingsDialog: boolean,
  openRulesDialog: boolean
};

const sidePanelWidth = 280;

const styles = theme => ({
  sidePanelPaper: {
    position: "relative",
    width: sidePanelWidth
  },
  sidePanelHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  studentName: {
    marginLeft: theme.spacing.unit * 2
  }
});

class SidePanel extends React.Component<PropsT, StateT> {
  mainMenuListItems: React.Element<*>;
  secondaryMenuListItems: React.Element<*>;

  handleSidePanelOpen = () => {
    this.props.handleSidePanelOpen();
  };

  handleSidePanelClose = () => {
    this.props.handleSidePanelClose();
  };

  handleLeaveSession = () => {
    this.props.onLeaveSession();
  };

  handleUnregistrer = () => {
    this.props.onUnregister();
  };

  constructor(props) {
    super(props);
    this.state = {
      openSettingsDialog: false,
      openRulesDialog: false
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
                id="sidePanel.training"
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
                id="sidePanel.history"
                defaultMessage="History"
              />
            }
          />
        </ListItem>
        <ListItem
          button
          onClick={() => this.setState({ openRulesDialog: true })}
        >
          <ListItemIcon>
            <RulesIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <FormattedMessage id="sidePanel.rules" defaultMessage="Rules" />
            }
          />
        </ListItem>
      </div>
    );

    this.secondaryMenuListItems = (
      <div>
        <ListItem button onClick={this.handleLeaveSession}>
          <ListItemIcon>
            <LeaveSessionIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <FormattedMessage
                id="sidePanel.leaveSession"
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
                id="sidePanel.unregister"
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
                id="sidePanel.settings"
                defaultMessage="Settings"
              />
            }
          />
        </ListItem>
      </div>
    );
  }
  render() {
    const { classes, theme } = this.props;
    return (
      <div>
        <Drawer
          variant="persistent"
          anchor="left"
          open={this.props.open}
          classes={{
            paper: classes.sidePanelPaper
          }}
        >
          <div className={classes.sidePanelHeader}>
            <Typography variant="title" className={classes.studentName}>
              {this.props.studentName}
            </Typography>
            <IconButton onClick={this.handleSidePanelClose}>
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
        </Drawer>
        <SettingsDialog
          openSettingsDialog={this.state.openSettingsDialog}
          onCloseSettingsDialog={() =>
            this.setState({ openSettingsDialog: false })
          }
          changeLanguage={this.props.changeLanguage}
        />
        <RulesDialog
          openRulesDialog={this.state.openRulesDialog}
          onCloseRulesDialog={() => this.setState({ openRulesDialog: false })}
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SidePanel);
