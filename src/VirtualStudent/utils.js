// @flow

import { VirtualStudent } from "./types";
import DumbStudent from "./DumbStudent";
import GodStudent from "./GodStudent";
import NoMemory from "./NoMemory";
import WeightModel from "./WeightModel";
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
    [WeightModel, 0.25],
    [NoMemory, 0.25],
    [FixedMemory, 0.25],
    [FullMemory, 1],
  ];

  studentModels.reduce((x, [studentModel, p]) => {
    RandModel = x > 0 && x - p < 0 ? studentModel : RandModel;
    return x - p;
  }, Math.random());

  return new RandModel(name);
};

export default getVirtualStudent;
