class QuickLearnerStudent {
  constructor () {
    // At first he thinks that everything is a parallelogram
    this.knowledgeParallelogram = {
      hasThreeEdges: 0,
      hasFourEdges: 0,
      hasFiveEdges: 0,
      hasSixEdges: 0,
      hasSameLengthEdges: 0,
      hasSameLengthEveryPairOppositeEdges: 0,
      hasSameLengthOnePairOppositeEdges: 0,
      hasEveryPairOppositeEdgesParallel: 0,
      hasOnePairOppositeEdgesParallel: 0,
      isRed: 0,
      isGreen: 0,
      isBlue: 0
    }
    this.thinkingAboutExample = '...'
    this.questionExample = 'Est-ce un parallélogramme ?'
    this.thinkingAboutExercice = '...'
    this.hasRightAnswerExercice = 'Super !'
    this.hasFalseAnswerExercice = 'Mince !'
    this.feedbackLessonAlreadyKnow = 'Je le savais'
    this.feedbackLessonDidntKnow = 'Oh je ne savais pas !'
    this.thinkingAboutExam = '...'
    this.givePositiveAnswer = "Mmm je pense que c'est un paralléĺogramme"
    this.giveNegativeAnswer = 'Je ne crois pas que ce soit un parallélogramme'
  }

  // All necessary features should correspond to identify the shape as a parallelogram
  answerParallelogram (featuresShape) {
    let result = true
    for (let feature in this.knowledgeParallelogram) {
      result = result && (this.knowledgeParallelogram[feature] > 0 ? featuresShape[feature] : true)
    }
    return result
  }

  learn (isParallelogram, featuresShape) {
    if (!isParallelogram) {
      for (let feature in this.knowledgeParallelogram) {
        if (!featuresShape[feature]) {
          this.knowledgeParallelogram[feature] += 0.1
        }
        if (featuresShape[feature]) {
          this.knowledgeParallelogram[feature] -= 0.1
        }
      }
    }
    if (isParallelogram) {
      for (let feature in this.knowledgeParallelogram) {
        if (!featuresShape[feature]) {
          this.knowledgeParallelogram[feature] -= 0.1
        }
        if (featuresShape[feature]) {
          this.knowledgeParallelogram[feature] += 0.1
        }
      }
    }
    console.log(this.knowledgeParallelogram)
  }

  // The lesson is the truth (weight of 1 or -1)
  learnLesson (featuresShape) {
    for (var feature in featuresShape) {
      this.knowledgeParallelogram[feature] = featuresShape[feature] ? 1 : -1
    }
    console.log(this.knowledgeParallelogram)
  }

  // check if there is a feature he didn't know it was necessary or not
  // return true even if it increased his certainty
  alreadyKnowLesson (featuresShape) {
    for (var feature in featuresShape) {
      if (this.knowledgeParallelogram[feature] > 0 ? !featuresShape[feature] : featuresShape[feature]) {
        return false
      }
    }
    return true
  }
}

export default QuickLearnerStudent
