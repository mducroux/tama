// @flow

import { VirtualStudent } from "./types";
import DumbStudent from "./DumbStudent";
import GodStudent from "./GodStudent";
import NoMemory from "./NoMemory";
import QuickLearnerStudent from "./QuickLearnerStudent";
import FullMemory from './FullMemory'
import FixedMemory from './FixedMemory'

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
    [FixedMemory, 1],
    [DumbStudent, 0.1],
    [GodStudent, 0.05],
    [NoMemory, 0.2],
    [QuickLearnerStudent, 0.2],
    [FixedMemory, 0.2],
    [FullMemory, 1],
  ];
  studentModels.reduce((x, [studentModel, p]) => {
    RandModel = x > 0 && x - p < 0 ? studentModel : RandModel;
    return x - p;
  }, Math.random());

  return new RandModel(name);
};

export default getVirtualStudent;
