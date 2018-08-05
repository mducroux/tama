// @flow

import * as React from "react";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  VictoryChart,
  VictoryAxis,
  VictoryLine,
  VictoryLabel,
  VictoryBar
} from "victory";

import firebase from "./firebase";

const styles = () => ({
  root: {
    width: "500px",
    maxWidth: "100%",
    margin: "auto",
    overflowX: "auto"
  },
  table: {
    width: "100%"
  }
});

const GradeHistogram = ({ data }: any) => (
  <VictoryChart>
    <VictoryBar
      cornerRadius={2}
      style={{ data: { fill: "#313ac4" }, labels: { fill: "white" } }}
      data={data}
      labels={d => (d.y > 0 ? `${d.y}` : "")}
      labelComponent={<VictoryLabel dy={30} />}
      barRatio={0.9}
    />
    <VictoryAxis
      crossAxis={false}
      domain={[-0.5, 10.5]}
      tickValues={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
      label="Student's Grades"
    />
  </VictoryChart>
);

const GradeLine = ({ data }: any) => (
  <VictoryChart>
    <VictoryLine
      data={data}
      style={{ data: { stroke: "#c43a31" } }}
      labels={d => (d.y > 0 ? `${d.y}` : "")}
      domain={{ y: [0, 10] }}
      animate
    />
    <VictoryAxis
      crossAxis={false}
      label="Sequence of students"
      tickValues={data.map(item => item.x)}
    />
  </VictoryChart>
);

const SessionTable = ({ classes, data }: { classes: Object, data: any[] }) => (
  <Table className={classes.table}>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Score</TableCell>
        <TableCell>Grade</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data
        .sort((a, b) => b.finalScore - a.finalScore)
        .map(({ student_name: name, finalScore, test: { grade } }, rank) => (
          <TableRow key={rank}>
            <TableCell component="th" scope="row">
              {name}
            </TableCell>
            <TableCell>{finalScore}</TableCell>
            <TableCell>{grade}</TableCell>
          </TableRow>
        ))}
    </TableBody>
  </Table>
);

type PropsT = { classes: Object };

type StateT = {
  tableData: any[],
  histogramData: any[],
  lineData: any[]
};

class StatsView extends React.Component<PropsT, StateT> {
  state = { tableData: [], histogramData: [], lineData: [] };

  constructor(props: PropsT) {
    super(props);
    const userId = localStorage.getItem("user_id");
    if (userId) {
      firebase
        .database()
        .ref(`sessions/${userId}`)
        .once("value")
        .then(d => {
          const val = d.val();

          const tableData = Object.keys(val)
            .map(k => val[k])
            .filter(s => s.finalScore !== undefined);

          const histogramData = tableData.reduce((acc, session) => {
            acc[session.test.grade].y += 1;
            return acc;
          }, new Array(11).fill().map((_, x) => ({ x, y: 0 })));

          const lineData = tableData.map((session, idx) => ({
            x: idx + 1,
            y: session.test.grade
          }));

          this.setState({ tableData, histogramData, lineData });
        });
    }
  }

  render() {
    const { tableData, histogramData, lineData } = this.state;
    console.log(lineData.map(item => Math.trunc(item.x)));
    return (
      <Paper className={this.props.classes.root}>
        <GradeHistogram data={histogramData} />
        <GradeLine data={lineData} />
        <SessionTable data={tableData} classes={this.props.classes} />
      </Paper>
    );
  }
}

export default withStyles(styles)(StatsView);
