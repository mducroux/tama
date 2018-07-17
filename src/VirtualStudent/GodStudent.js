class GodStudent {
  constructor () {
    this.thinkingAboutExample = 'Trop facile'
    this.questionExample = 'Est-ce un parallélogramme ?'
    this.thinkingAboutExercice = 'Trop facile'
    this.hasRightAnswerExercice = "J'en étais sûr"
    this.hasFalseAnswerExercice = 'Tu mens !'
    this.givePositiveAnswer = "C'est un paralléĺogramme"
    this.giveNegativeAnswer = "Ce n'est pas un parallélogramme"
    this.feedbackLessonKnow = "Je le savais (comme d'habitude)"
    this.thinkingAboutExam = 'Trop facile'
    this.feedbackLessonDontKnow = ''
  }

  answerParallelogram (featuresParallelogram) {
    return (
      featuresParallelogram.isQuadrilateral &&
      featuresParallelogram.hasOppositeEdgesParallel
    )
  }

  learn (featuresParallelogram, answer) {
    // Nothing to learn, he is God
  }

  alreadyKnowLesson (featuresParallelogram) {
    return true
  }
}

export default GodStudent
