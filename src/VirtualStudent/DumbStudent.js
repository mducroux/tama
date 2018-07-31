// @flow
import React from "react";
import { FormattedMessage } from "react-intl";
import { Typography } from "@material-ui/core";

import type { VirtualStudent } from "./types";

class DumbStudent implements VirtualStudent {
  knowledgeParallelogram = {};
  thinkingAboutExample = (
    <Typography variant="title">
      <FormattedMessage
        id="dumbStudent.thinkingAboutExample"
        defaultMessage="..."
      />
    </Typography>
  );
  questionExample = (
    <Typography variant="title">
      <FormattedMessage
        id="dumbStudent.questionExample"
        defaultMessage="Is it a parallelogram?"
      />
    </Typography>
  );
  thinkingAboutExercice = (
    <Typography variant="title">
      <FormattedMessage
        id="dumbStudent.thinkingAboutExercise"
        defaultMessage="..."
      />
    </Typography>
  );
  hasRightAnswerExercise = (
    <Typography variant="title">
      <FormattedMessage
        id="dumbStudent.hasRightAnswerExercise"
        defaultMessage="Super!"
      />
    </Typography>
  );
  hasFalseAnswerExercise = (
    <Typography variant="title">
      <FormattedMessage
        id="dumbStudent.hasFalseAnswerExercise"
        defaultMessage="Ohh!"
      />
    </Typography>
  );
  feedbackLessonAlreadyKnow = (
    <Typography variant="title">
      <FormattedMessage
        id="dumbStudent.feedbackLessonAlreadyKnow"
        defaultMessage="I already know that"
      />
    </Typography>
  );
  feedbackLessonDidntKnow = (
    <Typography variant="title">
      <FormattedMessage
        id="dumbStudent.feedbackLessonDidntKnow"
        defaultMessage="Oh I didn't know that!"
      />
    </Typography>
  );
  thinkingAboutExam = (
    <Typography variant="title">
      <FormattedMessage
        id="dumbStudent.thinkingAboutExam"
        defaultMessage="..."
      />
    </Typography>
  );
  givePositiveAnswer = (
    <Typography variant="title">
      <FormattedMessage
        id="dumbStudent.givePositiveAnswer"
        defaultMessage="Mmm I think this is a parallelogram"
      />
    </Typography>
  );
  giveNegativeAnswer = (
    <Typography variant="title">
      <FormattedMessage
        id="dumbStudent.giveNegativeAnswer"
        defaultMessage="I don't think this is a parallelogram"
      />
    </Typography>
  );

  state = {};

  answerParallelogram() {
    return Math.random() > 0.5;
  }

  learnLesson() {}

  learn() {}

  alreadyKnowLesson() {
    return Math.random() > 0.5;
  }

  setState() {}

  getState() {
    return {};
  }
}

export default DumbStudent;
