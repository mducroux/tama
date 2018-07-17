class QuickLearnerStudent {
  constructor () {
    this.knowledgeParallelogram = {
      isQuadrilateral: Math.random() > 0.5,
      hasSameLengthEdges: Math.random() > 0.5,
      hasSameLengthOppositeEdges: Math.random() > 0.5,
      hasOppositeEdgesParallel: Math.random() > 0.5
    }
    this.thinkingAboutExample = '...'
    this.questionExample = 'Est-ce un parallélogramme ?'
    this.thinkingAboutExercice = '...'
    this.hasRightAnswerExercice = 'Super !'
    this.hasFalseAnswerExercice = 'Mince !'
    this.givePositiveAnswer = "Mmm je pense que c'est un paralléĺogramme"
    this.giveNegativeAnswer = 'Je ne crois pas que ce soit un parallélogramme'
    this.thinkingAboutExam = '...'
    this.feedbackLessonKnow = 'Je le savais'
    this.feedbackLessonDontKnow = 'Oh je ne savais pas !'
  }

  answerParallelogram (featuresParallelogram) {
    return (Math.random() > 0.5)
  }

  learn (featuresParallelogram, answer) {
  }

  alreadyKnowLesson (featuresParallelogram) {
    return (Math.random() > 0.5)
  }
}

export default QuickLearnerStudent
