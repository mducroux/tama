// @flow
import React from "react";
import { FormattedMessage } from "react-intl";
import { Typography } from "@material-ui/core";

import type { VirtualStudent, ShapeFeatures } from "./types";

class QuickLearnerStudent implements VirtualStudent {
  state = {};

  // At first he doesn't know what a parallelogram looks like
  // so he thinks that everything is a parallelogram
  knowledgeParallelogram = {
    hasThreeEdges: 0,
    hasFourEdges: 0,
    hasFiveEdges: 0,
    hasSixEdges: 0,
    hasSameLengthEdges: 0,
    hasSameLengthEveryPairOppositeEdges: 0,
    hasSameLengthOnePairOppositeEdges: 0,
    hasEveryPairOppositeEdgesParallel: 0,
    hasAtLeastOnePairOppositeEdgesParallel: 0,
    isRed: 0,
    isGreen: 0,
    isBlue: 0
  };
  thinkingAboutExample = (
    <Typography variant="title">
      <FormattedMessage
        id="quickLearnerStudent.thinkingAboutExample"
        defaultMessage="..."
      />
    </Typography>
  );
  questionExample = (
    <Typography variant="title">
      <FormattedMessage
        id="quickLearnerStudent.questionExample"
        defaultMessage="Is it a parallelogram?"
      />
    </Typography>
  );
  thinkingAboutExercice = (
    <Typography variant="title">
      <FormattedMessage
        id="quickLearnerStudent.thinkingAboutExercise"
        defaultMessage="..."
      />
    </Typography>
  );
  hasRightAnswerExercise = (
    <Typography variant="title">
      <FormattedMessage
        id="quickLearnerStudent.hasRightAnswerExercise"
        defaultMessage="Super!"
      />
    </Typography>
  );
  hasFalseAnswerExercise = (
    <Typography variant="title">
      <FormattedMessage
        id="quickLearnerStudent.hasFalseAnswerExercise"
        defaultMessage="Ohh!"
      />
    </Typography>
  );
  feedbackLessonAlreadyKnow = (
    <Typography variant="title">
      <FormattedMessage
        id="quickLearnerStudent.feedbackLessonAlreadyKnow"
        defaultMessage="I already know that"
      />
    </Typography>
  );
  feedbackLessonDidntKnow = (
    <Typography variant="title">
      <FormattedMessage
        id="quickLearnerStudent.feedbackLessonDidntKnow"
        defaultMessage="Oh I didn't know that"
      />
    </Typography>
  );
  thinkingAboutExam = (
    <Typography variant="title">
      <FormattedMessage
        id="quickLearnerStudent.thinkingAboutExam"
        defaultMessage="..."
      />
    </Typography>
  );
  givePositiveAnswer = (
    <Typography variant="title">
      <FormattedMessage
        id="quickLearnerStudent.givePositiveAnswer"
        defaultMessage="Mmm I think this is a parallelogram"
      />
    </Typography>
  );
  giveNegativeAnswer = (
    <Typography variant="title">
      <FormattedMessage
        id="quickLearnerStudent.giveNegativeAnswer"
        defaultMessage="I don't think this is a parallelogram"
      />
    </Typography>
  );

  // All necessary features should correspond to identify the shape as a parallelogram
  answerParallelogram(shapeFeatures: ShapeFeatures) {
    return Object.keys(this.knowledgeParallelogram).reduce(
      (acc, feature) =>
        acc &&
        (this.knowledgeParallelogram[feature] > 0
          ? shapeFeatures[feature]
          : true),
      true
    );
  }

  learn(isParallelogram: boolean, shapeFeatures: ShapeFeatures) {
    if (!isParallelogram) {
      Object.keys(this.knowledgeParallelogram).forEach(feature => {
        this.knowledgeParallelogram[feature] += !shapeFeatures[feature]
          ? 0.1
          : -0.1;
      });
    }
    if (isParallelogram) {
      Object.keys(this.knowledgeParallelogram).forEach(feature => {
        this.knowledgeParallelogram[feature] += shapeFeatures[feature]
          ? 0.1
          : -0.1;
      });
    }
  }

  // The lesson is the truth (weight of 1 or -1)
  learnLesson(shapeFeatures: ShapeFeatures) {
    Object.keys(shapeFeatures).forEach(feature => {
      this.knowledgeParallelogram[feature] = shapeFeatures[feature] ? 1 : -1;
    });
  }

  // check if there is a feature he didn't know it was necessary or not
  // return true even if it increased his certainty
  alreadyKnowLesson(shapeFeatures: ShapeFeatures) {
    return Object.keys(shapeFeatures).reduce(
      (acc, feature) =>
        acc &&
        !(this.knowledgeParallelogram[feature] > 0
          ? !shapeFeatures[feature]
          : shapeFeatures[feature]),
      true
    );
  }

  setState() {}

  getState() {
    return this.knowledgeParallelogram;
  }
}

export default QuickLearnerStudent;
