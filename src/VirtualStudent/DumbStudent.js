class DumbStudent {
  constructor () {
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

  answerParallelogram (featuresParallelogram) {
    return (Math.random() > 0.5)
  }

  learn (isParallelogram, featuresParallelogram) {
  }

  learnLesson (featuresParallelogram) {
  }

  alreadyKnowLesson (featuresParallelogram) {
    return (Math.random() > 0.5)
  }
}

export default DumbStudent
