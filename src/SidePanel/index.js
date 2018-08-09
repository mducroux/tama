// @flow

import * as React from "react";
import { FormattedMessage } from "react-intl";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import SchoolIcon from "@material-ui/icons/School";
import HistoryIcon from "@material-ui/icons/Timeline";
import StatisticsIcon from "@material-ui/icons/InsertChart";
import LeaderboardIcon from "@material-ui/icons/FormatListNumbered";
import LanguageIcon from "@material-ui/icons/Language";
import RulesIcon from "@material-ui/icons/Assignment";
import NewGameIcon from "@material-ui/icons/Refresh";

import SettingsDialog from "./SettingsDialog";
import RulesDialog from "./RulesDialog";

type PropsT = {
  open: boolean,
  studentName: string,
  changeView: string => void,
  changeLanguage: string => void,
  theme: Object,
  classes: Object,
  handleSidePanelClose: void => void,
  hasBeenWelcomed: boolean,
  isRegistered: boolean,
  testStarted: boolean,
  startNewGame: Function
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
  constructor(props) {
    super(props);
    this.state = {
      openSettingsDialog: false,
      openRulesDialog: false
    };
  }

  render() {
    const {
      isRegistered,
      hasBeenWelcomed,
      testStarted,
      startNewGame,
      handleSidePanelClose
    } = this.props;
    const isPlaying = hasBeenWelcomed;
    const mainMenuListItems = (
      <React.Fragment>
        {isPlaying && (
          <LI
            Icon={SchoolIcon}
            onClick={() => this.props.changeView("training")}
            id={testStarted ? "testresult" : "training"}
            title={testStarted ? "See results" : "Teaching"}
          />
        )}
        {!isPlaying &&
          isRegistered && (
            <LI
              Icon={SchoolIcon}
              onClick={() => this.props.changeView("game_start")}
              id="welcome"
              title="Start game"
            />
          )}
        {isPlaying && (
          <LI
            Icon={HistoryIcon}
            onClick={() => this.props.changeView("history")}
            id="history"
            title="History"
          />
        )}
        <LI
          Icon={RulesIcon}
          onClick={() => this.setState({ openRulesDialog: true })}
          id="rules"
          title="Rules"
        />
      </React.Fragment>
    );

    const secondaryMenuListItems = (
      <React.Fragment>
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
      </React.Fragment>
    );

    const tertiaryMenuListItems = (
      <React.Fragment>
        {testStarted && (
          <LI
            Icon={NewGameIcon}
            onClick={() => {
              handleSidePanelClose();
              startNewGame();
            }}
            id="newgame"
            title="New game"
          />
        )}
        <LI
          Icon={LanguageIcon}
          onClick={() => this.setState({ openSettingsDialog: true })}
          id="settings"
          title="Language"
        />
      </React.Fragment>
    );

    const { classes, theme } = this.props;
    return (
      <React.Fragment>
        <Drawer
          variant="persistent"
          anchor="left"
          open={this.props.open}
          classes={{
            paper: classes.sidePanelPaper
          }}
        >
          <List>
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
            {mainMenuListItems}
            {isRegistered && <Divider />}
            {isRegistered && secondaryMenuListItems}
            <Divider />
            {tertiaryMenuListItems}
          </List>
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
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SidePanel);
