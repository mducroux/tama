// @flow

import { VirtualStudent } from "./types";
import DumbStudent from "./DumbStudent";
import GodStudent from "./GodStudent";
import NoMemory from "./NoMemory";
import WeightModel from "./WeightModel";

export const featureList = [
  "hasThreeEdges",
  "hasFourEdges",
  "hasFiveEdges",
  "hasSixEdges",
  "hasSameLengthEdges",
  "hasSameLengthEveryPairOppositeEdges",
  "hasSameLengthOnePairOppositeEdges",
  "hasEveryPairOppositeEdgesParallel",
  "hasAtLeastOnePairOppositeEdgesParallel",
  "isRed",
  "isGreen",
  "isBlue",
  "isRotated",
  "isThin",
  "hasEveryRightAngles",
  "hasAtLeastOneRightAngle"
];

const getVirtualStudent = (name: string): VirtualStudent => {
  let RandModel = DumbStudent;
  const studentModels = [
    [DumbStudent, 0.1],
    [GodStudent, 0.05],
    [NoMemory, 0.45],
    [WeightModel, 1]
  ];

  studentModels.reduce((x, [studentModel, p]) => {
    RandModel = x > 0 && x - p < 0 ? studentModel : RandModel;
    return x - p;
  }, Math.random());

  return new RandModel(name);
};

export default getVirtualStudent;
