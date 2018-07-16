class QuickLearnerStudent {
  constructor () {
    this.featuresParallelogram = {
      isQuadrilateral: false,
      hasSameLengthEdges: false,
      hasSameLengthOppositeEdges: false,
      hasOppositeEdgesParallel: false
    }
  }

  answerParallelogram (featuresParallelogram) {
    return (Math.random() > 0.5)
  }

  learn (featuresParallelogram, answer) {
  }

  alreadyKnowLesson (featuresParallelogram) {
    return (Math.random() > 0.5)
  }
}

export default QuickLearnerStudent
