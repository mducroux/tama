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
import HistoryIcon from "@material-ui/icons/Timeline";
import StatisticsIcon from "@material-ui/icons/InsertChart";
import LeaderboardIcon from "@material-ui/icons/FormatListNumbered";
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

const LI = ({
  Icon,
  onClick,
  id,
  title
}: {
  Icon: Object,
  onClick: void => void,
    id: string,
      title: string
}) => (
  <ListItem button onClick={onClick}>
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    <ListItemText
      primary={
        <FormattedMessage id={`sidePanel.${id}`} defaultMessage={title} />
      }
    />
  </ListItem>
);

class SidePanel extends React.Component<PropsT, StateT> {
  mainMenuListItems: React.Element<*>;
  secondaryMenuListItems: React.Element<*>;
  tertiaryMenuListItems: React.Element<*>;

  constructor(props) {
    super(props);
    this.state = {
      openSettingsDialog: false,
      openRulesDialog: false
    };
    this.mainMenuListItems = (
      <div>
        <LI
          Icon={SchoolIcon}
          onClick={() => this.props.changeView("training")}
          id="training"
          title="Training"
        />
        <LI
          Icon={HistoryIcon}
          onClick={() => this.props.changeView("history")}
          id="history"
          title="History"
        />
        <LI
          Icon={RulesIcon}
          onClick={() => this.setState({ openRulesDialog: true })}
          id="rules"
          title="Rules"
        />
      </div>
    );

    this.secondaryMenuListItems = (
      <div>
        <LI
          Icon={StatisticsIcon}
          onClick={() => this.props.changeView("stats")}
          id="stats"
          title="My statistics"
        />
        <LI
          Icon={LeaderboardIcon}
          onClick={() => this.props.changeView("leaderboard")}
          id="leaderboard"
          title="Leaderboard"
        />
      </div>
    );

    this.tertiaryMenuListItems = (
      <div>
        <LI
          Icon={LeaveSessionIcon}
          onClick={() => {
            this.props.onLeaveSession();
            this.props.handleSidePanelClose();
          }}
          id="leaveSession"
          title="Leave session"
        />
        <LI
          Icon={UnregisterIcon}
          onClick={() => {
            this.props.onUnregister();
            this.props.handleSidePanelClose();
          }}
          id="unregister"
          title="Unregister"
        />
        <LI
          Icon={SettingsIcon}
          onClick={() => this.setState({ openSettingsDialog: true })}
          id="settings"
          title="Settings"
        />
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
            <IconButton onClick={this.props.handleSidePanelClose}>
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
