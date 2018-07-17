class GodStudent {
  constructor () {
    this.thinkingAboutExample = 'Trop facile'
    this.questionExample = 'Est-ce un parallélogramme ?'
    this.thinkingAboutExercice = 'Trop facile'
    this.hasRightAnswerExercice = "J'en étais sûr"
    this.hasFalseAnswerExercice = 'Tu mens !'
    this.feedbackLessonKnow = 'Je le savais (comme toujours)'
    this.feedbackLessonDontKnow = ''
    this.thinkingAboutExam = 'Trop facile'
    this.givePositiveAnswer = "C'est un paralléĺogramme"
    this.giveNegativeAnswer = "Ce n'est pas un parallélogramme"
  }

  answerParallelogram (featuresParallelogram) {
    return (
      featuresParallelogram.isQuadrilateral &&
      featuresParallelogram.hasOppositeEdgesParallel
    )
  }

  learn (isParallelogram, featuresParallelogram) {
    // Nothing to learn, he is God
  }

  learnLesson (featuresParallelogram) {
    // Nothing to learn, he is God
  }

  alreadyKnowLesson (featuresParallelogram) {
    return true
  }
}

export default GodStudent
