// @flow

import * as React from "react";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { FormattedMessage } from "react-intl";

import firebase from "../firebase";

const styles = () => ({
  root: {
    width: "500px",
    maxWidth: "100%",
    margin: "auto",
    marginTop: "0px",
    overflowX: "auto"
  },
  table: {
    width: "100%"
  }
});

const getCurrentWeek = (): number => {
  const MON01JAN2018 = new Date("Mon Jan 01 2018 00:00:00 GMT+0100 (CET)");
  return Math.ceil((new Date() - MON01JAN2018) / 604800000);
};

const getCurrentDay = (): number => {
  const MON01JAN2018 = new Date("Mon Jan 01 2018 00:00:00 GMT+0100 (CET)");
  return Math.ceil((new Date() - MON01JAN2018) / 86400000);
};

export const updateLeaderboard = (
  userId: string,
  name: string,
  score: number
) => {
  const dailyRef = `daily/${getCurrentDay()}`;
  const weeklyRef = `weekly/${getCurrentWeek()}`;
  const alltimeRef = "alltime";
  const refs = [dailyRef, weeklyRef, alltimeRef];
  refs.map(ref => firebase.database().ref(`leaderboard/${ref}/${userId}`))
    .forEach(fire => {
      fire.transaction(
        current => current
          ? { score: current.score + score, count: current.count + 1, name }
          : { score, count: 1, name }
      );
    });
};

const Leaderboard = ({ classes, data }: { classes: Object, data: any[][] }) => (
  <Table className={classes.table}>
    <TableHead>
      <TableRow>
        <TableCell>
          <FormattedMessage id="leaderboard.name" defaultMessage="Name" />
        </TableCell>
        <TableCell numeric>
          <FormattedMessage id="leaderboard.score" defaultMessage="Score" />
        </TableCell>
        <TableCell numeric>
          <FormattedMessage id="leaderboard.rank" defaultMessage="Rank" />
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map(([name, score, rank]) => (
        <TableRow key={rank}>
          <TableCell component="th" scope="row">
            {name}
          </TableCell>
          <TableCell numeric>{score}</TableCell>
          <TableCell numeric>{rank}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

type PropsT = { classes: Object };

type StateT = {
  alltime: any[][],
  weekly: any[][],
  daily: any[][],
  tab: number
};

class LeaderboardView extends React.Component<PropsT, StateT> {
  state = { alltime: [], weekly: [], daily: [], tab: 1 };

  constructor(props: PropsT) {
    super(props);
    const dailyRef = `daily/${getCurrentDay()}`;
    const weeklyRef = `weekly/${getCurrentWeek()}`;
    const alltimeRef = "alltime";
    const refs = [dailyRef, weeklyRef, alltimeRef];
    refs.forEach(ref => {
      firebase
        .database()
        .ref(`leaderboard/${ref}`)
        .once("value", d => {
          const val = d.val();
          const tabsData = val
            ? Object.keys(val)
              .map(x => val[x])
              .map(({ score, count, name }) => ({ score: Math.ceil(score / (count + 1)), name }))
              .sort((a, b) => b.score - a.score)
              .map(({ score, name }, i) => [name, score, i + 1])
            : [];
          this.setState({ [ref.split("/")[0]]: tabsData });
        });
    });
  }

  render() {
    const { daily, weekly, alltime, tab } = this.state;
    return (
      <Paper className={this.props.classes.root}>
        <Tabs
          value={tab}
          indicatorColor="primary"
          textColor="primary"
          onChange={(_, value) => this.setState({ tab: value })}
          centered
        >
          <Tab
            label={
              <FormattedMessage
                id="leaderboard.categoryDaily"
                defaultMessage="Daily"
              />
            }
          />
          <Tab
            label={
              <FormattedMessage
                id="leaderboard.categoryWeekly"
                defaultMessage="Weekly"
              />
            }
          />
          <Tab
            label={
              <FormattedMessage
                id="leaderboard.categoryAlltime"
                defaultMessage="All time"
              />
            }
          />
        </Tabs>
        <Leaderboard
          data={[daily, weekly, alltime][tab]}
          classes={this.props.classes}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(LeaderboardView);
