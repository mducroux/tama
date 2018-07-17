class QuickLearnerStudent {
  constructor () {
    // At first he thinks that everything is a parallelogram
    this.knowledgeParallelogram = {
      isQuadrilateral: 0,
      hasSameLengthEdges: 0,
      hasSameLengthOppositeEdges: 0,
      hasOppositeEdgesParallel: 0
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
      (this.knowledgeParallelogram.isQuadrilateral > 0 ? featuresParallelogram.isQuadrilateral : true) &&
      (this.knowledgeParallelogram.hasSameLengthEdges > 0 ? featuresParallelogram.hasSameLengthEdges : true) &&
      (this.knowledgeParallelogram.hasSameLengthOppositeEdges > 0 ? featuresParallelogram.hasSameLengthOppositeEdges : true) &&
      (this.knowledgeParallelogram.hasOppositeEdgesParallel > 0 ? featuresParallelogram.hasOppositeEdgesParallel : true)
    )
  }

  learn (isParallelogram, featuresParallelogram) {
    if (!isParallelogram) {
      for (let feature in this.knowledgeParallelogram) {
        if (!featuresParallelogram[feature]) {
          this.knowledgeParallelogram[feature] += 0.1
        }
        if (featuresParallelogram[feature]) {
          this.knowledgeParallelogram[feature] -= 0.1
        }
      }
    }
    if (isParallelogram) {
      for (let feature in this.knowledgeParallelogram) {
        if (!featuresParallelogram[feature]) {
          this.knowledgeParallelogram[feature] -= 0.1
        }
        if (featuresParallelogram[feature]) {
          this.knowledgeParallelogram[feature] += 0.1
        }
      }
    }
    console.log(this.knowledgeParallelogram)
  }

  // The lesson is the truth (weight of 1 or -1)
  learnLesson (featuresParallelogram) {
    for (var feature in featuresParallelogram) {
      this.knowledgeParallelogram[feature] = featuresParallelogram[feature] ? 1 : -1
    }
    console.log(this.knowledgeParallelogram)
  }

  // check if there is a feature he didn't know it was necessary or not
  // return true even if it increased his certainty
  alreadyKnowLesson (featuresParallelogram) {
    for (var feature in featuresParallelogram) {
      if (this.knowledgeParallelogram[feature] > 0 ? !featuresParallelogram[feature] : featuresParallelogram[feature]) {
        return false
      }
    }
    return true
  }
}

export default QuickLearnerStudent
