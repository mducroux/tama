class DumbStudent {
  constructor () {
    this.featureOfParallelogram = {
      isQuadrilateral: false,
      hasSameLengthEdges: false,
      hasSameLengthOppositeEdges: false,
      hasOppositeEdgesParallel: false
    }
  }

  thinkAboutAnswer (featureOfPara) {
    return (Math.random() > 0.5)
  }

  studentLearn (featureOfPara, answer) {
  }

  studentKnowledge (featureOfPara) {
    return (Math.random() > 0.5)
  }
}
