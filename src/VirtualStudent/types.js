// @flow

export type ShapeFeatures = { [featureName: string]: boolean };

export interface VirtualStudent {
  name: string;
  state: any;
  feedbackLessonAlreadyKnow: Object;
  questionExample: Object;
  thinkingAboutExercice: Object;
  hasRightAnswerExercise: Object;
  hasFalseAnswerExercise: Object;
  feedbackLessonAlreadyKnow: Object;
  feedbackLessonDidntKnow: Object;
  thinkingAboutExam: Object;
  givePositiveAnswer: Object;
  giveNegativeAnswer: Object;
  answerParallelogram(shapeFeatures: ShapeFeatures): boolean;
  learn(isParallelogram: boolean, shapeFeatures: ShapeFeatures): void;
  learnLesson(shapeFeatures: ShapeFeatures): void;
  alreadyKnowLesson(shapeFeatures: ShapeFeatures): boolean;
  getState(): string | Object;
  setState(state: string): void;
}
