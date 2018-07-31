// @flow
import React from "react";
import { FormattedMessage } from "react-intl";
import { Typography } from "@material-ui/core";

import type { VirtualStudent, ShapeFeatures } from "./types";

class GodStudent implements VirtualStudent {
  state = {};

  knowledgeParallelogram = {};
  thinkingAboutExample = (
    <Typography variant="title">
      <FormattedMessage
        id="godStudent.thinkingAboutExample"
        defaultMessage="Too easy!"
      />
    </Typography>
  );
  questionExample = (
    <Typography variant="title">
      <FormattedMessage
        id="godStudent.questionExample"
        defaultMessage="Is it a parallelogram?"
      />
    </Typography>
  );
  thinkingAboutExercice = (
    <Typography variant="title">
      <FormattedMessage
        id="godStudent.thinkingAboutExercise"
        defaultMessage="Too easy!"
      />
    </Typography>
  );
  hasRightAnswerExercise = (
    <Typography variant="title">
      <FormattedMessage
        id="godStudent.hasRightAnswerExercise"
        defaultMessage="I was sure about that!"
      />
    </Typography>
  );
  hasFalseAnswerExercise = (
    <Typography variant="title">
      <FormattedMessage
        id="godStudent.hasFalseAnswerExercise"
        defaultMessage="You're lying!"
      />
    </Typography>
  );
  feedbackLessonAlreadyKnow = (
    <Typography variant="title">
      <FormattedMessage
        id="godStudent.feedbackLessonAlreadyKnow"
        defaultMessage="I already know that (as always)"
      />
    </Typography>
  );
  feedbackLessonDidnKnow = (
    <Typography variant="title">
      <FormattedMessage
        id="godStudent.feedbackLessonDidntKnow"
        defaultMessage="Impossible!"
      />
    </Typography>
  );
  thinkingAboutExam = (
    <Typography variant="title">
      <FormattedMessage
        id="godStudent.thinkingAboutExam"
        defaultMessage="Too easy!"
      />
    </Typography>
  );
  givePositiveAnswer = (
    <Typography variant="title">
      <FormattedMessage
        id="godStudent.givePositiveAnswer"
        defaultMessage="This is a parallelogram"
      />
    </Typography>
  );
  giveNegativeAnswer = (
    <Typography variant="title">
      <FormattedMessage
        id="godStudent.giveNegativeAnswer"
        defaultMessage="This is not a parallelogram"
      />
    </Typography>
  );

  answerParallelogram(shapeFeatures: ShapeFeatures) {
    return (
      shapeFeatures.hasFourEdges &&
      shapeFeatures.hasEveryPairOppositeEdgesParallel
    );
  }

  learn() {
    // Nothing to learn, he is God
  }

  learnLesson() {
    // Nothing to learn, he is God
  }

  alreadyKnowLesson() {
    return true;
  }

  setState() {}

  getState() {
    return {};
  }
}

export default GodStudent;
