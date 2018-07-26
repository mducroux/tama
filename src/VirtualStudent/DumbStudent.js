import React from "react";
import { FormattedMessage } from "react-intl";

class DumbStudent {
  knowledgeParallelogram = {};
  thinkingAboutExample = (
    <FormattedMessage
      id="dumbStudent.thinkingAboutExample"
      defaultMessage="..."
    />
  );
  questionExample = (
    <FormattedMessage
      id="dumbStudent.questionExample"
      defaultMessage="Is it a parallelogram?"
    />
  );
  thinkingAboutExercice = (
    <FormattedMessage
      id="dumbStudent.thinkingAboutExercise"
      defaultMessage="..."
    />
  );
  hasRightAnswerExercise = (
    <FormattedMessage
      id="dumbStudent.hasRightAnswerExercise"
      defaultMessage="Super!"
    />
  );
  hasFalseAnswerExercise = (
    <FormattedMessage
      id="dumbStudent.hasFalseAnswerExercise"
      defaultMessage="Ohh!"
    />
  );
  feedbackLessonAlreadyKnow = (
    <FormattedMessage
      id="dumbStudent.feedbackLessonAlreadyKnow"
      defaultMessage="I already know that"
    />
  );
  feedbackLessonDidntKnow = (
    <FormattedMessage
      id="dumbStudent.feedbackLessonDidntKnow"
      defaultMessage="Oh I didn't know that!"
    />
  );
  thinkingAboutExam = (
    <FormattedMessage id="dumbStudent.thinkingAboutExam" defaultMessage="..." />
  );
  givePositiveAnswer = (
    <FormattedMessage
      id="dumbStudent.givePositiveAnswer"
      defaultMessage="Mmm I think this is a parallelogram"
    />
  );
  giveNegativeAnswer = (
    <FormattedMessage
      id="dumbStudent.giveNegativeAnswer"
      defaultMessage="I don't think this is a parallelogram"
    />
  );

  answerParallelogram(shapeFeatures) {
    return Math.random() > 0.5;
  }

  learn(isParallelogram, shapeFeatures) {}

  learnLesson(shapeFeatures) {}

  alreadyKnowLesson(shapeFeatures) {
    return Math.random() > 0.5;
  }
}

export default DumbStudent;
