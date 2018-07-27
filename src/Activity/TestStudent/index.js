// @flow
import React from "react";

import Result from "./Result";
import ShowQuestions from "./ShowQuestions";
import parallelogramData from "../ParallelogramData";

type PropsT = {
  startNewGame: () => void,
  updateScore: () => void,
  student: Object,
  score: number,
  sessionRef: Object,
  studentName: string
};

type StateT = {
  tookTest: boolean,
  grade: number
};

class TestStudent extends React.Component<PropsT, StateT> {
  numberOfQuestions: number;
  examQuestions: Object[];
  correctAnswers: Array<boolean>;
  testRef: Object;

  constructor(props: PropsT) {
    super(props);
    this.numberOfQuestions = 5;
    try {
      if (this.numberOfQuestions > parallelogramData.length) {
        throw new Error(
          "there are more questions than available parallelograms"
        );
      }
    } catch (e) {
      throw e;
    }
    this.examQuestions = parallelogramData.slice();
    this.examQuestions.sort(() => 0.5 - Math.random()); // shuffle array
    this.examQuestions = this.examQuestions.slice(0, this.numberOfQuestions);
    this.correctAnswers = Array(this.numberOfQuestions).fill(false);
    this.testRef = this.props.sessionRef.child("test");
    this.state = {
      tookTest: false,
      grade: 0
    };
  }

  handleAnswerQuestion = (index: number, isCorrect: boolean) => {
    this.correctAnswers[index] = isCorrect;
  };

  recordTest = (indexQuestion: number, isCorrect: boolean) => {
    const newQuestionRef = this.testRef.child(`/question_${indexQuestion}`);
    const questions = this.examQuestions[indexQuestion].src.split("/");
    newQuestionRef.child("item").set(questions[questions.length - 1]);
    newQuestionRef.child("is_correct").set(isCorrect);
  };

  render() {
    if (!this.state.tookTest) {
      return (
        <ShowQuestions
          displayResultTest={() => this.setState({ tookTest: true })}
          numberOfQuestions={this.numberOfQuestions}
          examQuestions={this.examQuestions}
          onAnswerQuestion={(index, isCorrect) =>
            this.handleAnswerQuestion(index, isCorrect)
          }
          updateScore={this.props.updateScore}
          student={this.props.student}
          increaseGrade={() => this.setState({ grade: this.state.grade + 1 })}
          recordTest={(indexQuestion, grade) =>
            this.recordTest(indexQuestion, grade)
          }
        />
      );
    }
    return (
      <Result
        grade={this.state.grade}
        numberOfQuestions={this.numberOfQuestions}
        examQuestions={this.examQuestions}
        correctAnswers={this.correctAnswers}
        startNewGame={this.props.startNewGame}
        score={this.props.score}
        studentName={this.props.studentName}
      />
    );
  }
}

export default TestStudent;
