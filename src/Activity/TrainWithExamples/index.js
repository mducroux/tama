import React from "react";

import PropTypes from "prop-types";

import ChooseExamples from "./ChooseExamples";
import ShowExamples from "./ShowExamples";
import parallelogramData from "../ParallelogramData";

class TrainWithExamples extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasChosenExample: false
    };
    this.newActivityRef = this.props.sessionRef.child("activities").push();
  }

  handleSelectExample = index => {
    this.setState({ hasChosenExample: true, index });
  };

  recordExampleActivity = (userAnswer) => {
    this.newActivityRef.child("/activity_type").set("example");
    const parallelogramTitle = parallelogramData[this.state.index].src.split("/");
    this.newActivityRef
      .child("/item")
      .set(parallelogramTitle[parallelogramTitle.length - 1]);
    this.newActivityRef
      .child("/knowledge")
      .set(this.props.student.knowledgeParallelogram);
    this.newActivityRef.child("/user_answer").set(userAnswer);
  };

  render() {
    if (!this.state.hasChosenExample) {
      return (
        <ChooseExamples
          onSelectExample={this.handleSelectExample}
          onNavigationBackToMenu={this.props.getBackToMenu}
        />
      );
    }
    const parallelogram = parallelogramData[this.state.index]
    return (
      <ShowExamples
        parallelogram={parallelogram}
        getBackToMenu={this.props.getBackToMenu}
        updateScore={this.props.updateScore}
<<<<<<< HEAD
        updateHistory={() => this.props.updateHistory(parallelogram)}
=======
        updateHistory={() =>
          this.props.updateHistory(this.getSelectedParallelograms())
        }
>>>>>>> master
        student={this.props.student}
        recordExampleActivity={(userAnswer, indexExample) =>
          this.recordExampleActivity(userAnswer, indexExample)
        }
      />
    );
  }
}

TrainWithExamples.propTypes = {
  getBackToMenu: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired,
  updateHistory: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
  sessionRef: PropTypes.object.isRequired
};

export default TrainWithExamples;
