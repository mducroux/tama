import React from "react";
import { FormattedMessage } from "react-intl";

class GodStudent {
  knowledgeParallelogram = {};
  thinkingAboutExample = (
    <FormattedMessage
      id="godStudent.thinkingAboutExample"
      defaultMessage="Too easy!"
    />
  );
  questionExample = (
    <FormattedMessage
      id="godStudent.questionExample"
      defaultMessage="Is it a parallelogram?"
    />
  );
  thinkingAboutExercice = (
    <FormattedMessage
      id="godStudent.thinkingAboutExercise"
      defaultMessage="Too easy!"
    />
  );
  hasRightAnswerExercise = (
    <FormattedMessage
      id="godStudent.hasRightAnswerExercise"
      defaultMessage="I was sure about that!"
    />
  );
  hasFalseAnswerExercise = (
    <FormattedMessage
      id="godStudent.hasFalseAnswerExercise"
      defaultMessage="You're lying!"
    />
  );
  feedbackLessonAlreadyKnow = (
    <FormattedMessage
      id="godStudent.feedbackLessonAlreadyKnow"
      defaultMessage="I already know that (as always)"
    />
  );
  feedbackLessonDidnKnow = (
    <FormattedMessage
      id="godStudent.feedbackLessonDidntKnow"
      defaultMessage="Impossible!"
    />
  );
  thinkingAboutExam = (
    <FormattedMessage
      id="godStudent.thinkingAboutExam"
      defaultMessage="Too easy!"
    />
  );
  givePositiveAnswer = (
    <FormattedMessage
      id="godStudent.givePositiveAnswer"
      defaultMessage="This is a parallelogram"
    />
  );
  giveNegativeAnswer = (
    <FormattedMessage
      id="godStudent.giveNegativeAnswer"
      defaultMessage="This is not a parallelogram"
    />
  );

  answerParallelogram(shapeFeatures) {
    return (
      shapeFeatures.hasFourEdges &&
      shapeFeatures.hasEveryPairOppositeEdgesParallel
    );
  }

  learn(isParallelogram, shapeFeatures) {
    // Nothing to learn, he is God
  }

  learnLesson(shapeFeatures) {
    // Nothing to learn, he is God
  }

  alreadyKnowLesson(shapeFeatures) {
    return true;
  }
}

export default GodStudent;
