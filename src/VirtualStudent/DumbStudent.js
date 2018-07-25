// @flow

import type { VirtualStudent } from "./types";

class DumbStudent implements VirtualStudent {
  knowledgeParallelogram = {};
  thinkingAboutExample = "...";
  questionExample = "Est-ce un parallélogramme ?";
  thinkingAboutExercice = "...";
  hasRightAnswerExercice = "Super !";
  hasFalseAnswerExercice = "Mince !";
  feedbackLessonAlreadyKnow = "Je le savais";
  feedbackLessonDidntKnow = "Oh je ne savais pas !";
  thinkingAboutExam = "...";
  givePositiveAnswer = "Mmm je pense que c'est un paralléĺogramme";
  giveNegativeAnswer = "Je ne crois pas que ce soit un parallélogramme";

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
