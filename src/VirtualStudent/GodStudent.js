class GodStudent {
  thinkingAboutExample = 'Trop facile'
  questionExample = 'Est-ce un parallélogramme ?'
  thinkingAboutExercice = 'Trop facile'
  hasRightAnswerExercice = "J'en étais sûr"
  hasFalseAnswerExercice = 'Tu mens !'
  feedbackLessonKnow = 'Je le savais (comme toujours)'
  feedbackLessonDontKnow = ''
  thinkingAboutExam = 'Trop facile'
  givePositiveAnswer = "C'est un paralléĺogramme"
  giveNegativeAnswer = "Ce n'est pas un parallélogramme"

  answerParallelogram (shapeFeatures) {
    return (
      shapeFeatures.hasFourEdges &&
      shapeFeatures.hasEveryPairOppositeEdgesParallel
    )
  }

  learn (isParallelogram, shapeFeatures) {
    // Nothing to learn, he is God
  }

  learnLesson (shapeFeatures) {
    // Nothing to learn, he is God
  }

  alreadyKnowLesson (shapeFeatures) {
    return true
  }
}

export default GodStudent
