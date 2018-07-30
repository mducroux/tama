import React from "react";

import PropTypes from "prop-types";

import ChooseExercise from "./ChooseExercise";
import ShowExercise from "./ShowExercise";
import parallelogramData from "../ParallelogramData";

class TrainWithExercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      hasChosenExercise: false
    };
    this.newActivityRef = this.props.sessionRef.child("activities").push();
  }

  handleSelectExercise = index => {
    this.setState({ hasChosenExercise: true, index });
  };

  recordExerciseActivity = (userAnswer, studentAnswer) => {
    const image = parallelogramData[this.state.index].src
    this.newActivityRef
      .child("item")
      .set(image);
    this.newActivityRef.child("activity_type").set("exercise");
    this.newActivityRef
      .child("knowledge")
      .set(this.props.student.knowledgeParallelogram);
    this.newActivityRef.child("student_answer").set(studentAnswer);
    this.newActivityRef.child("user_answer").set(userAnswer);
    this.newActivityRef.child("time").set(new Date().getTime());
  };

  render() {
    if (!this.state.hasChosenExercise) {
      return (
        <ChooseExercise
          onSelectExercise={this.handleSelectExercise}
          onNavigationBackToMenu={this.props.getBackToMenu}
        />
      );
    }
    return (
      <ShowExercise
        parallelogram={parallelogramData[this.state.index]}
        getBackToMenu={this.props.getBackToMenu}
        updateScore={this.props.updateScore}
        student={this.props.student}
        recordExerciseActivity={this.recordExerciseActivity}
      />
    );
  }
}

TrainWithExercise.propTypes = {
  getBackToMenu: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
  sessionRef: PropTypes.object.isRequired
};

export default TrainWithExercise;
