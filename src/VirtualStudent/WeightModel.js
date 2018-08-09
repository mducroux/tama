// @flow
import React from "react";
import { FormattedMessage } from "react-intl";

import type { VirtualStudent, ShapeFeatures } from "./types";

class QuickLearnerStudent implements VirtualStudent {
  name: string;
  state: Object;

  knowledgeParallelogram = [
    [
      ["hasThreeEdges", 0],
      ["hasFourEdges", 0],
      ["hasFiveEdges", 0],
      ["hasSixEdges", 0]
    ],
    [["hasSameLengthEdges", 0]],
    [["hasSameLengthEveryPairOppositeEdges", 0]],
    [["hasSameLengthOnePairOppositeEdges", 0]],
    [["hasEveryPairOppositeEdgesParallel", 0]],
    [["hasAtLeastOnePairOppositeEdgesParallel", 0]],
    [["isRed", 0], ["isGreen", 0], ["isBlue", 0]],
    [["isRotated", 0]],
    [["isThin", 0]],
    [["hasEveryRightAngles", 0]],
    [["hasAtLeastOneRightAngle", 0]]
  ];
  thinkingAboutExample = (
    <FormattedMessage
      id="quickLearnerStudent.thinkingAboutExample"
      defaultMessage="..."
    />
  );
  questionExample = (
    <FormattedMessage
      id="quickLearnerStudent.questionExample"
      defaultMessage="Is it a parallelogram?"
    />
  );
  thinkingAboutExercice = (
    <FormattedMessage
      id="quickLearnerStudent.thinkingAboutExercise"
      defaultMessage="..."
    />
  );
  hasRightAnswerExercise = (
    <FormattedMessage
      id="quickLearnerStudent.hasRightAnswerExercise"
      defaultMessage="Super!"
    />
  );
  hasFalseAnswerExercise = (
    <FormattedMessage
      id="quickLearnerStudent.hasFalseAnswerExercise"
      defaultMessage="Ohh!"
    />
  );
  feedbackLessonAlreadyKnow = (
    <FormattedMessage
      id="quickLearnerStudent.feedbackLessonAlreadyKnow"
      defaultMessage="I already know that"
    />
  );
  feedbackLessonDidntKnow = (
    <FormattedMessage
      id="quickLearnerStudent.feedbackLessonDidntKnow"
      defaultMessage="Oh I didn't know that"
    />
  );
  thinkingAboutExam = (
    <FormattedMessage
      id="quickLearnerStudent.thinkingAboutExam"
      defaultMessage="..."
    />
  );
  givePositiveAnswer = (
    <FormattedMessage
      id="quickLearnerStudent.givePositiveAnswer"
      defaultMessage="Mmm I think this is a parallelogram"
    />
  );
  giveNegativeAnswer = (
    <FormattedMessage
      id="quickLearnerStudent.giveNegativeAnswer"
      defaultMessage="I don't think this is a parallelogram"
    />
  );

  constructor(name: string) {
    this.name = name;
  }

  answerParallelogram(shapeFeatures: ShapeFeatures) {
    const res = this.knowledgeParallelogram.reduce(
      (acc, feature) =>
        acc +
        feature.reduce(
          (acc2, [subfeature, weight]) =>
            acc2 + (shapeFeatures[subfeature] ? weight : -weight),
          0
        ),
      0
    );
    console.log(res);
    return res > 0;
  }

  learn(isParallelogram: boolean, shapeFeatures: ShapeFeatures) {
    if (!isParallelogram) {
      this.knowledgeParallelogram.forEach(feature => {
        feature.forEach(subfeature => {
          subfeature[1] +=
            Math.abs(subfeature[1]) !== 1 &&
            (!shapeFeatures[subfeature[0]]
              ? 0.1 / feature.length // minimize importance of long subarrays
              : -0.1 / feature.length);
        });
      });
    }
    if (isParallelogram) {
      this.knowledgeParallelogram.forEach(feature => {
        feature.forEach(subfeature => {
          subfeature[1] +=
            Math.abs(subfeature[1]) !== 1 &&
            (shapeFeatures[subfeature[0]]
              ? 0.1 / feature.length // minimize importance of long subarrays
              : -0.1 / feature.length);
        });
      });
    }
    console.log(this.getState());
  }

  // The lesson is the truth (weight of 1 or -1)
  learnLesson(shapeFeatures: ShapeFeatures) {
    this.knowledgeParallelogram.forEach(feature => {
      feature.forEach(subfeature => {
        if (Object.keys(shapeFeatures).includes(subfeature[0])) {
          subfeature[1] = shapeFeatures[subfeature[0]] ? 1 : -1;
        }
      });
    });
    console.log(this.getState());
  }

  // check if there is a feature he didn't know it was necessary or not
  // return true even if it increased his certainty
  alreadyKnowLesson(shapeFeatures: ShapeFeatures) {
    return this.knowledgeParallelogram.reduce(
      (acc, feature) =>
        acc &&
        feature.reduce(
          (acc2, [subfeature, weight]) =>
            acc2 &&
            !(weight > 0
              ? !shapeFeatures[subfeature]
              : shapeFeatures[subfeature]),
          true
        ),
      true
    );
  }

  setState() {}

  getState() {
    return this.knowledgeParallelogram;
  }
}

export default QuickLearnerStudent;
