class QuickLearnerStudent {
  constructor () {
    // At first he thinks that everything is a parallelogram
    this.knowledgeParallelogram = {
      isQuadrilateral: {
        necessaryCondition: 0
      },
      hasSameLengthEdges: {
        necessaryCondition: 0
      },
      hasSameLengthOppositeEdges: {
        necessaryCondition: 0
      },
      hasOppositeEdgesParallel: {
        necessaryCondition: 0
      }
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

  // All necessary features should correspond to identify the figure as a parallelogram
  answerParallelogram (featuresParallelogram) {
    return (
      (this.knowledgeParallelogram.isQuadrilateral.necessaryCondition > 0 ? featuresParallelogram.isQuadrilateral : true) &&
      (this.knowledgeParallelogram.hasSameLengthEdges.necessaryCondition > 0 ? featuresParallelogram.hasSameLengthEdges : true) &&
      (this.knowledgeParallelogram.hasSameLengthOppositeEdges.necessaryCondition > 0 ? featuresParallelogram.hasSameLengthOppositeEdges : true) &&
      (this.knowledgeParallelogram.hasOppositeEdgesParallel.necessaryCondition > 0 ? featuresParallelogram.hasOppositeEdgesParallel : true)
    )
  }

  learn (isParallelogram, featuresParallelogram) {
    if (!isParallelogram) {
      for (let feature in this.knowledgeParallelogram) {
        if (!featuresParallelogram[feature]) {
          this.knowledgeParallelogram[feature].necessaryCondition += 0.1
        }
        if (featuresParallelogram[feature]) {
          this.knowledgeParallelogram[feature].necessaryCondition -= 0.1
        }
      }
    }
    if (isParallelogram) {
      for (let feature in this.knowledgeParallelogram) {
        if (!featuresParallelogram[feature]) {
          this.knowledgeParallelogram[feature].necessaryCondition -= 0.1
        }
        if (featuresParallelogram[feature]) {
          this.knowledgeParallelogram[feature].necessaryCondition += 0.1
        }
      }
    }
    console.log(this.knowledgeParallelogram)
  }

  // The lesson is the truth (weight of 1 or -1)
  learnLesson (featuresParallelogram) {
    for (var feature in featuresParallelogram) {
      this.knowledgeParallelogram[feature].necessaryCondition = featuresParallelogram[feature] ? 1 : -1
    }
    console.log(this.knowledgeParallelogram)
  }

  // check if there is a feature he didn't know it was necessary or not
  // return true even if it increased his certainty
  alreadyKnowLesson (featuresParallelogram) {
    for (var feature in featuresParallelogram) {
      if (this.knowledgeParallelogram[feature].necessaryCondition > 0 ? !featuresParallelogram[feature] : featuresParallelogram[feature]) {
        return false
      }
    }
    return true
  }
}

export default QuickLearnerStudent
