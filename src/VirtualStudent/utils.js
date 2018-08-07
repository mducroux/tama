// @flow

import { VirtualStudent } from "./types";
import DumbStudent from './DumbStudent';
import GodStudent from './GodStudent';
import NoMemory from './NoMemory';
import QuickLearnerStudent from "./QuickLearnerStudent";

export const featureList = [
  'hasThreeEdges',
  'hasFourEdges',
  'hasFiveEdges',
  'hasSixEdges',
  'hasSameLengthEdges',
  'hasSameLengthEveryPairOppositeEdges',
  'hasSameLengthOnePairOppositeEdges',
  'hasEveryPairOppositeEdgesParallel',
  'hasAtLeastOnePairOppositeEdgesParallel',
  'isRed',
  'isGreen',
  'isBlue',
  'isRotated',
  'isThin',
  'hasEveryRightAngles',
  'hasAtLeastOneRightAngle'
]

const getVirtualStudent = (name: string): VirtualStudent => {
  const studentModels = [DumbStudent, GodStudent, NoMemory, QuickLearnerStudent]
  const randIdx = Math.floor(studentModels.length * Math.random())
  return (new studentModels[randIdx](name))
}

export default getVirtualStudent