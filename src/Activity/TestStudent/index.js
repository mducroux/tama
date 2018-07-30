// @flow

import React from "react";

import Result from "./Result";
import ShowQuestions from "./ShowQuestions";

type PropsT = {
  startNewGame: () => void,
  student: Object,
  score: number,
  studentName: string,
  test: Object
};

type StateT = {
  tookTest: boolean
};

class TestStudent extends React.Component<PropsT, StateT> {
  numberOfQuestions: number;
  examQuestions: Object[];
  correctAnswers: Array<boolean>;

  constructor(props: PropsT) {
    super(props);
    this.state = {
      tookTest: false
    };
  }

  render() {
    if (!this.state.tookTest) {
      return (
        <ShowQuestions
          {...this.props.test}
          displayResultTest={() => this.setState({ tookTest: true })}
          student={this.props.student}
        />
      );
    }
    return (
      <Result
        {...this.props.test}
        startNewGame={this.props.startNewGame}
        studentName={this.props.studentName}
        activityScore={this.props.score}
      />
    );
  }
}

export default TestStudent;
