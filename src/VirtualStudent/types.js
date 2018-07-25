// @flow

export type ShapeFeatures = { [featureName: string]: boolean };

export interface VirtualStudent {
  state: any;
  answerParallelogram(shapeFeatures: ShapeFeatures): boolean;
  learn(isParallelogram: boolean, shapeFeatures: ShapeFeatures): void;
  learnLesson(shapeFeatures: ShapeFeatures): void;
  alreadyKnowLesson(shapeFeatures: ShapeFeatures): boolean;
  getState(): Object;
  setState(state: string): void;
}
