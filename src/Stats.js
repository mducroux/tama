// @flow

import * as React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { VictoryChart, VictoryLabel, VictoryBar, VictoryTheme } from 'victory'

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

const GradeHistogram = ({ data }: any) =>
  <VictoryChart
    theme={VictoryTheme.material}
    domainPadding={25}
    domain={{ x: [-0.5, 10.5] }}
    x
  >
    <VictoryLabel text="Grades" x={5} y={10} textAnchor="middle" />
    <VictoryBar
      cornerRadius={8}
      style={{ data: { fill: "#313ac4" } }}
      data={data}
    />
  </VictoryChart>



const SessionTable = ({ classes, data }: { classes: Object, data: any[][] }) => (
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
)

type PropsT = { classes: Object }

type StateT = { data: any }

class StatsView extends React.Component<PropsT, StateT> {
  state = { data: [] }

  constructor(props: PropsT) {
    super(props)

    const userRef = firebase.database().ref(`leaderboard/`)
  }

  render() {
    const { data } = this.state
    return (
      <Paper className={this.props.classes.root}>
        <GradeHistogram data={[{ x: 1, y: 200 }, { x: 2, y: 204 }, { x: 3, y: 206 }, { x: 4, y: 200 }, { x: 5, y: 204 }, { x: 6, y: 206 }]} />
        <SessionTable data={data} classes={this.props.classes} />
      </Paper>
    )
  }
}

export default withStyles(styles)(StatsView)

