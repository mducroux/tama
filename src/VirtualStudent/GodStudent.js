// @flow

import type { VirtualStudent, ShapeFeatures } from "./types";

class GodStudent implements VirtualStudent {
  state = {};

  knowledgeParallelogram = {};
  thinkingAboutExample = "Trop facile";
  questionExample = "Est-ce un parallélogramme ?";
  thinkingAboutExercice = "Trop facile";
  hasRightAnswerExercice = "J'en étais sûr";
  hasFalseAnswerExercice = "Tu mens !";
  feedbackLessonKnow = "Je le savais (comme toujours)";
  feedbackLessonDontKnow = "";
  thinkingAboutExam = "Trop facile";
  givePositiveAnswer = "C'est un paralléĺogramme";
  giveNegativeAnswer = "Ce n'est pas un parallélogramme";

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
