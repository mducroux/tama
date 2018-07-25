class QuickLearnerStudent {
  // At first he doesn't know what a parallelogram looks like
  // so he thinks that everything is a parallelogram
  knowledgeParallelogram = {
    hasThreeEdges: 0,
    hasFourEdges: 0,
    hasFiveEdges: 0,
    hasSixEdges: 0,
    hasSameLengthEdges: 0,
    hasSameLengthEveryPairOppositeEdges: 0,
    hasSameLengthOnePairOppositeEdges: 0,
    hasEveryPairOppositeEdgesParallel: 0,
    hasAtLeastOnePairOppositeEdgesParallel: 0,
    isRed: 0,
    isGreen: 0,
    isBlue: 0
  }
  thinkingAboutExample = '...'
  questionExample = 'Est-ce un parallélogramme ?'
  thinkingAboutExercice = '...'
  hasRightAnswerExercice = 'Super !'
  hasFalseAnswerExercice = 'Mince !'
  feedbackLessonAlreadyKnow = 'Je le savais'
  feedbackLessonDidntKnow = 'Oh je ne savais pas !'
  thinkingAboutExam = '...'
  givePositiveAnswer = "Mmm je pense que c'est un paralléĺogramme"
  giveNegativeAnswer = 'Je ne crois pas que ce soit un parallélogramme'

  // All necessary features should correspond to identify the shape as a parallelogram
  answerParallelogram (shapeFeatures) {
    let result = true
    for (let feature in this.knowledgeParallelogram) {
      result = result && (this.knowledgeParallelogram[feature] > 0 ? shapeFeatures[feature] : true)
    }
    return result
  }

  learn (isParallelogram, shapeFeatures) {
    if (!isParallelogram) {
      for (let feature in this.knowledgeParallelogram) {
        if (!shapeFeatures[feature]) {
          this.knowledgeParallelogram[feature] += 0.1
        }
        if (shapeFeatures[feature]) {
          this.knowledgeParallelogram[feature] -= 0.1
        }
      }
    }
    if (isParallelogram) {
      for (let feature in this.knowledgeParallelogram) {
        if (!shapeFeatures[feature]) {
          this.knowledgeParallelogram[feature] -= 0.1
        }
        if (shapeFeatures[feature]) {
          this.knowledgeParallelogram[feature] += 0.1
        }
      }
    }
    console.log(this.knowledgeParallelogram)
  }

  // The lesson is the truth (weight of 1 or -1)
  learnLesson (shapeFeatures) {
    for (var feature in shapeFeatures) {
      this.knowledgeParallelogram[feature] = shapeFeatures[feature] ? 1 : -1
    }
    console.log(this.knowledgeParallelogram)
  }

  // check if there is a feature he didn't know it was necessary or not
  // return true even if it increased his certainty
  alreadyKnowLesson (shapeFeatures) {
    for (var feature in shapeFeatures) {
      if (this.knowledgeParallelogram[feature] > 0 ? !shapeFeatures[feature] : shapeFeatures[feature]) {
        return false
      }
    }
    return true
  }
}

export default QuickLearnerStudent
