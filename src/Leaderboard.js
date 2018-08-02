// @flow

import * as React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import firebase from './firebase'

const styles = () => ({
  root: {
    width: '500px',
    maxWidth: '100%',
    margin: 'auto',
    overflowX: 'auto',
  },
  table: {
    width: '100%'
  },
});

const Leaderboard = withStyles(styles)(({ classes, data }) => (
  <Paper className={classes.root}>
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell numeric>Score</TableCell>
          <TableCell numeric>Rank</TableCell>
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
  </Paper>
))

class LeaderboardView extends React.Component<{}, { data: Object[] }> {
  state = { data: null }

  constructor(props: {}) {
    super(props)

    firebase.database().ref('leaderboard').once('value', d => {
      const val = d.val().alltime
      const leaderboardData = Object.keys(val).sort(x => val[x]).map((name, i) => [name, val[name], i + 1])
      console.log(val)
      console.log(leaderboardData)

      this.setState({ data: leaderboardData })
    })

  }

  render() {
    if (!this.state.data) {
      return <p>loading...</p>
    }
    return <Leaderboard data={this.state.data} />
  }
}

export default LeaderboardView

