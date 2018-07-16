class GodStudent {
  constructor () {
    this.featuresParallelogram = {
      isQuadrilateral: true,
      hasSameLengthEdges: false,
      hasSameLengthOppositeEdges: true,
      hasOppositeEdgesParallel: true
    }
  }

  thinkAboutAnswer (featuresParallelogram) {
    return (
      featuresParallelogram.isQuadrilateral === this.featuresParallelogram.isQuadrilateral &&
      featuresParallelogram.hasOppositeEdgesParallel === this.featuresParallelogram.hasOppositeEdgesParallel
    )
  }

  studentLearn (featuresParallelogram, answer) {
    // Nothing to learn, he is God
  }

  studentKnowledge (featuresParallelogram) {
    return true
  }
}

export default GodStudent
