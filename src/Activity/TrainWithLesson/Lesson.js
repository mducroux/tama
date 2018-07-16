const lesson = [
  {
    title: 'Un parallélogramme est un quadrilatère',
    featuresParallelogram: {
      isQuadrilateral: true,
      hasSameLengthEdges: false,
      hasSameLengthOppositeEdges: false,
      hasOppositeEdgesParallel: false
    }
  },
  {
    title: 'Un parallélogramme a ses côtés opposés deux à deux parallèles',
    featuresParallelogram: {
      isQuadrilateral: false,
      hasSameLengthEdges: false,
      hasSameLengthOppositeEdges: false,
      hasOppositeEdgesParallel: true
    }
  },
  {
    title: 'Un parallélogramme a ses diagonales qui se coupent en leur milieu',
    featuresParallelogram: {
      isQuadrilateral: false,
      hasSameLengthEdges: false,
      hasSameLengthOppositeEdges: false,
      hasOppositeEdgesParallel: false
    }
  }
]

export default lesson
