const thumbnailWidth = 300;
const thumbnailHeight = 300;

const parallelogramData = [
  {
    src: "images/examples/parallelogram_b1.png",
    thumbnail: "images/examples/parallelogram_b1.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "parallelogram",
    valid: true,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: true,
      hasFiveEdges: false,
      hasSixEdges: false,
      hasSameLengthEdges: false,
      hasSameLengthEveryPairOppositeEdges: true,
      hasSameLengthOnePairOppositeEdges: true,
      hasEveryPairOppositeEdgesParallel: true,
      hasOnePairOppositeEdgesParallel: true,
      isRed: false,
      isGreen: false,
      isBlue: true
    }
  },
  {
    src: "images/examples/parallelogram_g1.png",
    thumbnail: "images/examples/parallelogram_g1.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "parallelogram",
    valid: true,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: true,
      hasFiveEdges: false,
      hasSixEdges: false,
      hasSameLengthEdges: false,
      hasSameLengthEveryPairOppositeEdges: true,
      hasSameLengthOnePairOppositeEdges: true,
      hasEveryPairOppositeEdgesParallel: true,
      hasOnePairOppositeEdgesParallel: true,
      isRed: false,
      isGreen: true,
      isBlue: false
    }
  },
  {
    src: "images/examples/parallelogram_r1.png",
    thumbnail: "images/examples/parallelogram_r1.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "parallelogram",
    valid: true,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: true,
      hasFiveEdges: false,
      hasSixEdges: false,
      hasSameLengthEdges: false,
      hasSameLengthEveryPairOppositeEdges: true,
      hasSameLengthOnePairOppositeEdges: true,
      hasEveryPairOppositeEdgesParallel: true,
      hasOnePairOppositeEdgesParallel: true,
      isRed: true,
      isGreen: false,
      isBlue: false
    }
  },
  {
    src: "images/examples/parallelogram_r2.png",
    thumbnail: "images/examples/parallelogram_r2.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "parallelogram",
    valid: true,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: true,
      hasFiveEdges: false,
      hasSixEdges: false,
      hasSameLengthEdges: false,
      hasSameLengthEveryPairOppositeEdges: true,
      hasSameLengthOnePairOppositeEdges: true,
      hasEveryPairOppositeEdgesParallel: true,
      hasOnePairOppositeEdgesParallel: true,
      isRed: true,
      isGreen: false,
      isBlue: false
    }
  },
  {
    src: "images/examples/parallelogram_r3.png",
    thumbnail: "images/examples/parallelogram_r3.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "parallelogram",
    valid: true,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: true,
      hasFiveEdges: false,
      hasSixEdges: false,
      hasSameLengthEdges: false,
      hasSameLengthEveryPairOppositeEdges: true,
      hasSameLengthOnePairOppositeEdges: true,
      hasEveryPairOppositeEdgesParallel: true,
      hasOnePairOppositeEdgesParallel: true,
      isRed: true,
      isGreen: false,
      isBlue: false
    }
  },
  {
    src: "images/examples/parallelogram_r4.png",
    thumbnail: "images/examples/parallelogram_r4.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "parallelogram",
    valid: true,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: true,
      hasFiveEdges: false,
      hasSixEdges: false,
      hasSameLengthEdges: false,
      hasSameLengthEveryPairOppositeEdges: true,
      hasSameLengthOnePairOppositeEdges: true,
      hasEveryPairOppositeEdgesParallel: true,
      hasOnePairOppositeEdgesParallel: true,
      isRed: true,
      isGreen: false,
      isBlue: false
    }
  },
  {
    src: "images/examples/rectangle_b1.png",
    thumbnail: "images/examples/rectangle_b1.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "rectangle",
    valid: true,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: true,
      hasFiveEdges: false,
      hasSixEdges: false,
      hasSameLengthEdges: false,
      hasSameLengthEveryPairOppositeEdges: true,
      hasSameLengthOnePairOppositeEdges: true,
      hasEveryPairOppositeEdgesParallel: true,
      hasOnePairOppositeEdgesParallel: true,
      isRed: false,
      isGreen: false,
      isBlue: true
    }
  },
  {
    src: "images/examples/rectangle_b2.png",
    thumbnail: "images/examples/rectangle_b2.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "rectangle",
    valid: true,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: true,
      hasFiveEdges: false,
      hasSixEdges: false,
      hasSameLengthEdges: false,
      hasSameLengthEveryPairOppositeEdges: true,
      hasSameLengthOnePairOppositeEdges: true,
      hasEveryPairOppositeEdgesParallel: true,
      hasOnePairOppositeEdgesParallel: true,
      isRed: false,
      isGreen: false,
      isBlue: true
    }
  },
  {
    src: "images/examples/rectangle_g1.png",
    thumbnail: "images/examples/rectangle_g1.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "rectangle",
    valid: true,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: true,
      hasFiveEdges: false,
      hasSixEdges: false,
      hasSameLengthEdges: false,
      hasSameLengthEveryPairOppositeEdges: true,
      hasSameLengthOnePairOppositeEdges: true,
      hasEveryPairOppositeEdgesParallel: true,
      hasOnePairOppositeEdgesParallel: true,
      isRed: false,
      isGreen: true,
      isBlue: false
    }
  },
  {
    src: "images/examples/rectangle_r1.png",
    thumbnail: "images/examples/rectangle_r1.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "rectangle",
    valid: true,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: true,
      hasFiveEdges: false,
      hasSixEdges: false,
      hasSameLengthEdges: false,
      hasSameLengthEveryPairOppositeEdges: true,
      hasSameLengthOnePairOppositeEdges: true,
      hasEveryPairOppositeEdgesParallel: true,
      hasOnePairOppositeEdgesParallel: true,
      isRed: true,
      isGreen: false,
      isBlue: false
    }
  },
  {
    src: "images/examples/rhombus_b1.png",
    thumbnail: "images/examples/rhombus_b1.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "rhombus",
    valid: true,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: true,
      hasFiveEdges: false,
      hasSixEdges: false,
      hasSameLengthEdges: true,
      hasSameLengthEveryPairOppositeEdges: true,
      hasSameLengthOnePairOppositeEdges: true,
      hasEveryPairOppositeEdgesParallel: true,
      hasOnePairOppositeEdgesParallel: true,
      isRed: false,
      isGreen: false,
      isBlue: true
    }
  },
  {
    src: "images/examples/rhombus_r1.png",
    thumbnail: "images/examples/rhombus_r1.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "rhombus",
    valid: true,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: true,
      hasFiveEdges: false,
      hasSixEdges: false,
      hasSameLengthEdges: true,
      hasSameLengthEveryPairOppositeEdges: true,
      hasSameLengthOnePairOppositeEdges: true,
      hasEveryPairOppositeEdgesParallel: true,
      hasOnePairOppositeEdgesParallel: true,
      isRed: true,
      isGreen: false,
      isBlue: false
    }
  },
  {
    src: "images/examples/square_b1.png",
    thumbnail: "images/examples/square_b1.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "square",
    valid: true,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: true,
      hasFiveEdges: false,
      hasSixEdges: false,
      hasSameLengthEdges: true,
      hasSameLengthEveryPairOppositeEdges: true,
      hasSameLengthOnePairOppositeEdges: true,
      hasEveryPairOppositeEdgesParallel: true,
      hasOnePairOppositeEdgesParallel: true,
      isRed: false,
      isGreen: false,
      isBlue: true
    }
  },
  {
    src: "images/examples/square_g1.png",
    thumbnail: "images/examples/square_g1.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "square",
    valid: true,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: true,
      hasFiveEdges: false,
      hasSixEdges: false,
      hasSameLengthEdges: true,
      hasSameLengthEveryPairOppositeEdges: true,
      hasSameLengthOnePairOppositeEdges: true,
      hasEveryPairOppositeEdgesParallel: true,
      hasOnePairOppositeEdgesParallel: true,
      isRed: false,
      isGreen: true,
      isBlue: false
    }
  },
  {
    src: "images/examples/square_g2.png",
    thumbnail: "images/examples/square_g2.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "square",
    valid: true,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: true,
      hasFiveEdges: false,
      hasSixEdges: false,
      hasSameLengthEdges: true,
      hasSameLengthEveryPairOppositeEdges: true,
      hasSameLengthOnePairOppositeEdges: true,
      hasEveryPairOppositeEdgesParallel: true,
      hasOnePairOppositeEdgesParallel: true,
      isRed: false,
      isGreen: true,
      isBlue: false
    }
  },
  {
    src: "images/examples/square_r1.png",
    thumbnail: "images/examples/square_r1.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "square",
    valid: true,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: true,
      hasFiveEdges: false,
      hasSixEdges: false,
      hasSameLengthEdges: true,
      hasSameLengthEveryPairOppositeEdges: true,
      hasSameLengthOnePairOppositeEdges: true,
      hasEveryPairOppositeEdgesParallel: true,
      hasOnePairOppositeEdgesParallel: true,
      isRed: true,
      isGreen: false,
      isBlue: false
    }
  },
  {
    src: "images/counter_examples/antiparallelogram_b1.png",
    thumbnail: "images/counter_examples/antiparallelogram_b1.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "antiparallelogram",
    valid: false,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: true,
      hasFiveEdges: false,
      hasSixEdges: false,
      hasSameLengthEdges: false,
      hasSameLengthEveryPairOppositeEdges: true,
      hasSameLengthOnePairOppositeEdges: true,
      hasEveryPairOppositeEdgesParallel: false,
      hasOnePairOppositeEdgesParallel: false,
      isRed: false,
      isGreen: false,
      isBlue: true
    }
  },
  {
    src: "images/counter_examples/antiparallelogram_r1.png",
    thumbnail: "images/counter_examples/antiparallelogram_r1.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "antiparallelogram",
    valid: false,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: true,
      hasFiveEdges: false,
      hasSixEdges: false,
      hasSameLengthEdges: false,
      hasSameLengthEveryPairOppositeEdges: true,
      hasSameLengthOnePairOppositeEdges: true,
      hasEveryPairOppositeEdgesParallel: false,
      hasOnePairOppositeEdgesParallel: false,
      isRed: true,
      isGreen: false,
      isBlue: false
    }
  },
  {
    src: "images/counter_examples/hexagon_g1.png",
    thumbnail: "images/counter_examples/hexagon_g1.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "hexagon",
    valid: false,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: false,
      hasFiveEdges: false,
      hasSixEdges: true,
      hasSameLengthEdges: false,
      hasSameLengthEveryPairOppositeEdges: false,
      hasSameLengthOnePairOppositeEdges: false,
      hasEveryPairOppositeEdgesParallel: true,
      hasOnePairOppositeEdgesParallel: true,
      isRed: false,
      isGreen: true,
      isBlue: false
    }
  },
  {
    src: "images/counter_examples/pentagonreg_b1.png",
    thumbnail: "images/counter_examples/pentagonreg_b1.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "regular_pentagon",
    valid: false,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: false,
      hasFiveEdges: true,
      hasSixEdges: false,
      hasSameLengthEdges: true,
      hasSameLengthEveryPairOppositeEdges: true,
      hasSameLengthOnePairOppositeEdges: true,
      hasEveryPairOppositeEdgesParallel: false,
      hasOnePairOppositeEdgesParallel: false,
      isRed: false,
      isGreen: false,
      isBlue: true
    }
  },
  {
    src: "images/counter_examples/pentagonreg_r1.png",
    thumbnail: "images/counter_examples/pentagonreg_r1.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "regular_pentagon",
    valid: false,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: false,
      hasFiveEdges: true,
      hasSixEdges: false,
      hasSameLengthEdges: true,
      hasSameLengthEveryPairOppositeEdges: true,
      hasSameLengthOnePairOppositeEdges: true,
      hasEveryPairOppositeEdgesParallel: false,
      hasOnePairOppositeEdgesParallel: false,
      isRed: true,
      isGreen: false,
      isBlue: false
    }
  },
  {
    src: "images/counter_examples/quadrilateral_b1.png",
    thumbnail: "images/counter_examples/quadrilateral_b1.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "quadrilateral",
    valid: false,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: true,
      hasFiveEdges: false,
      hasSixEdges: false,
      hasSameLengthEdges: false,
      hasSameLengthEveryPairOppositeEdges: false,
      hasSameLengthOnePairOppositeEdges: false,
      hasEveryPairOppositeEdgesParallel: false,
      hasOnePairOppositeEdgesParallel: false,
      isRed: false,
      isGreen: false,
      isBlue: true
    }
  },
  {
    src: "images/counter_examples/quadrilateral_g1.png",
    thumbnail: "images/counter_examples/quadrilateral_g1.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "quadrilateral",
    valid: false,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: true,
      hasFiveEdges: false,
      hasSixEdges: false,
      hasSameLengthEdges: false,
      hasSameLengthEveryPairOppositeEdges: false,
      hasSameLengthOnePairOppositeEdges: false,
      hasEveryPairOppositeEdgesParallel: false,
      hasOnePairOppositeEdgesParallel: false,
      isRed: false,
      isGreen: true,
      isBlue: false
    }
  },
  {
    src: "images/counter_examples/quadrilateral_r1.png",
    thumbnail: "images/counter_examples/quadrilateral_r1.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "quadrilateral",
    valid: false,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: true,
      hasFiveEdges: false,
      hasSixEdges: false,
      hasSameLengthEdges: false,
      hasSameLengthEveryPairOppositeEdges: false,
      hasSameLengthOnePairOppositeEdges: false,
      hasEveryPairOppositeEdgesParallel: false,
      hasOnePairOppositeEdgesParallel: false,
      isRed: true,
      isGreen: false,
      isBlue: false
    }
  },
  {
    src: "images/counter_examples/quadrilateral_r2.png",
    thumbnail: "images/counter_examples/quadrilateral_r2.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "quadrilateral",
    valid: false,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: true,
      hasFiveEdges: false,
      hasSixEdges: false,
      hasSameLengthEdges: false,
      hasSameLengthEveryPairOppositeEdges: false,
      hasSameLengthOnePairOppositeEdges: true,
      hasEveryPairOppositeEdgesParallel: false,
      hasOnePairOppositeEdgesParallel: false,
      isRed: true,
      isGreen: false,
      isBlue: false
    }
  },
  {
    src: "images/counter_examples/trapezoid_g1.png",
    thumbnail: "images/counter_examples/trapezoid_g1.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "trapezoid",
    valid: false,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: true,
      hasFiveEdges: false,
      hasSixEdges: false,
      hasSameLengthEdges: false,
      hasSameLengthEveryPairOppositeEdges: false,
      hasSameLengthOnePairOppositeEdges: false,
      hasEveryPairOppositeEdgesParallel: false,
      hasOnePairOppositeEdgesParallel: true,
      isRed: false,
      isGreen: true,
      isBlue: false
    }
  },
  {
    src: "images/counter_examples/trapezoidiso_b1.png",
    thumbnail: "images/counter_examples/trapezoidiso_b1.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "isoscele_trapezoid",
    valid: false,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: true,
      hasFiveEdges: false,
      hasSixEdges: false,
      hasSameLengthEdges: false,
      hasSameLengthEveryPairOppositeEdges: false,
      hasSameLengthOnePairOppositeEdges: true,
      hasEveryPairOppositeEdgesParallel: false,
      hasOnePairOppositeEdgesParallel: true,
      isRed: false,
      isGreen: false,
      isBlue: true
    }
  },
  {
    src: "images/counter_examples/trapezoidiso_g1.png",
    thumbnail: "images/counter_examples/trapezoidiso_g1.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "isoscele_trapezoid",
    valid: false,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: true,
      hasFiveEdges: false,
      hasSixEdges: false,
      hasSameLengthEdges: false,
      hasSameLengthEveryPairOppositeEdges: false,
      hasSameLengthOnePairOppositeEdges: true,
      hasEveryPairOppositeEdgesParallel: false,
      hasOnePairOppositeEdgesParallel: true,
      isRed: false,
      isGreen: true,
      isBlue: false
    }
  },
  {
    src: "images/counter_examples/trapezoidiso_g2.png",
    thumbnail: "images/counter_examples/trapezoidiso_g2.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "isoscele_trapezoid",
    valid: false,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: true,
      hasFiveEdges: false,
      hasSixEdges: false,
      hasSameLengthEdges: false,
      hasSameLengthEveryPairOppositeEdges: false,
      hasSameLengthOnePairOppositeEdges: true,
      hasEveryPairOppositeEdgesParallel: false,
      hasOnePairOppositeEdgesParallel: true,
      isRed: false,
      isGreen: true,
      isBlue: false
    }
  },
  {
    src: "images/counter_examples/trapezoidiso_r1.png",
    thumbnail: "images/counter_examples/trapezoidiso_r1.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "isoscele_trapezoid",
    valid: false,
    shapeFeatures: {
      hasThreeEdges: false,
      hasFourEdges: true,
      hasFiveEdges: false,
      hasSixEdges: false,
      hasSameLengthEdges: false,
      hasSameLengthEveryPairOppositeEdges: false,
      hasSameLengthOnePairOppositeEdges: true,
      hasEveryPairOppositeEdgesParallel: false,
      hasOnePairOppositeEdgesParallel: true,
      isRed: true,
      isGreen: false,
      isBlue: false
    }
  },
  {
    src: "images/counter_examples/triangleequi_b1.png",
    thumbnail: "images/counter_examples/triangleequi_b1.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "equilateral_triangle",
    valid: false,
    shapeFeatures: {
      hasThreeEdges: true,
      hasFourEdges: false,
      hasFiveEdges: false,
      hasSixEdges: false,
      hasSameLengthEdges: true,
      hasSameLengthEveryPairOppositeEdges: true,
      hasSameLengthOnePairOppositeEdges: true,
      hasEveryPairOppositeEdgesParallel: false,
      hasOnePairOppositeEdgesParallel: false,
      isRed: false,
      isGreen: false,
      isBlue: true
    }
  },
  {
    src: "images/counter_examples/triangleequi_g1.png",
    thumbnail: "images/counter_examples/triangleequi_g1.png",
    thumbnailWidth,
    thumbnailHeight,
    isSelected: false,
    itemType: "equilateral_triangle",
    valid: false,
    shapeFeatures: {
      hasThreeEdges: true,
      hasFourEdges: false,
      hasFiveEdges: false,
      hasSixEdges: false,
      hasSameLengthEdges: true,
      hasSameLengthEveryPairOppositeEdges: true,
      hasSameLengthOnePairOppositeEdges: true,
      hasEveryPairOppositeEdgesParallel: false,
      hasOnePairOppositeEdgesParallel: false,
      isRed: false,
      isGreen: true,
      isBlue: false
    }
  }
].sort(() => 0.5 - Math.random());

export default parallelogramData;
