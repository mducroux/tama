// @flow

import React from "react";

import Result from "./Result";
import ShowQuestions from "./ShowQuestions";

type PropsT = {
  startNewGame: () => void,
  student: Object,
  finalScore: number,
  activityScore: number,
  studentName: string,
  test: Object,
  gridScores: Array<number>,
  updateScore: void => void
};

type StateT = {
  tookTest: boolean,
  indexScore: number
};

class TestStudent extends React.Component<PropsT, StateT> {
  numberOfQuestions: number;
  examQuestions: Object[];

  constructor(props: PropsT) {
    super(props);
    this.state = {
      tookTest: false,
      indexScore: 0
    };
  }

  render() {
    if (!this.state.tookTest) {
      return (
        <ShowQuestions
          {...this.props.test}
          displayResultTest={() => this.setState({ tookTest: true })}
          student={this.props.student}
          gridScores={this.props.gridScores}
          indexScore={this.state.indexScore}
          incrementIndexScore={() =>
            this.setState({ indexScore: this.state.indexScore + 1 })
          }
        />
      );
    }
    return (
      <Result
        {...this.props.test}
        startNewGame={this.props.startNewGame}
        studentName={this.props.studentName}
        finalScore={this.props.finalScore}
        activityScore={this.props.activityScore}
        updateScore={() => this.props.updateScore()}
        gridScores={this.props.gridScores}
        indexScore={this.state.indexScore}
      />
    );
  }
}

export default TestStudent;
